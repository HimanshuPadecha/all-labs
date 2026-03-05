import { answers, questions } from "@/db/schema";
import { db } from "@/index";
import { ai } from "@/lib/gemini";
import { ApiError } from "@google/genai";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";

interface input {
  labId: string;
}

export const { POST } = serve(async (context) => {
  const { labId } = context.requestPayload as input;

  const seededQuestions = await context.run("get-questions", async () => {
    const labQuestions = await db
      .select({
        questionId: questions.id,
        questionText: questions.questionText,
      })
      .from(questions)
      .where(eq(questions.labId, labId));

    if (labQuestions.length === 0) {
      throw new Error("No lab questions found !!");
    }

    return labQuestions;
  });

  const geminiAnswers = await context.run("answer-req", async () => {
    try {
      const ANS_PROMPT = `
Act as a Senior Full-Stack Developer and Technical Instructor. Your task is to generate precise, production-ready solutions for technical questions.

CONTEXT
You will receive an array of objects containing questionId and questionText.
You must provide a high-quality, technically accurate response for each.

SCHEMA RULES
Return an array of objects in this structure:
- questionId: string (must exactly match the input)
- answerText: string

TECHNICAL CONTENT RULES
SQL:
- Use optimized queries
- SQL keywords in UPPERCASE (SELECT, JOIN, WHERE, etc)

Python:
- Clean, idiomatic code
- 4-space indentation
- Brief comments

HTML / Frontend:
- Provide a complete, self-contained HTML5 document
- CSS inside <style>
- JS inside <script>
- Use semantic tags and responsive layout

Flowcharts:
- Convert logic into step-by-step textual algorithm or pseudo-code

OUTPUT FORMAT RULES (STRICT)
1. Return ONLY a raw JSON array
2. Do NOT wrap output in markdown or code blocks
3. No conversational text
4. Ensure valid JSON
5. In answerText:
   - Escape newlines as \\n
   - Escape double quotes as \\\"
   - Escape backslashes as \\\\
   - No triple backticks

Here is the questions array:
${JSON.stringify(seededQuestions, null, 2)}
`;

      const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            parts: [
              {
                text: ANS_PROMPT,
              },
            ],
          },
        ],
      });

      if (!geminiResponse) {
        throw new Error("Gemini gave empty response !!");
      }

      const geminiAnswers = JSON.parse(geminiResponse.text as string);

      if (!geminiAnswers) {
        throw new Error("Cannot parse answers from gemini !!");
      }

      return geminiAnswers;
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        throw new Error(error.message);
      }
      throw new Error("Something went wrong !!");
    }
  });

  await context.run("seed-answers", async () => {
    try {
      await db.insert(answers).values(geminiAnswers);

      console.log("Answers Seeded successfully !!");
    } catch (error) {
      console.log("Error while entering answers !");
    }
  });
});

// FREE GEMINI MODELS

// gemini-3-flash-preview
// gemini-2.5-pro
// gemini-2.5-flash
// gemini-2.5-flash-lite
