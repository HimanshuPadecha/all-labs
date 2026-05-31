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
      const ANS_PROMPT = [
        "Act as a Senior Full-Stack Developer and Technical Instructor. Your task is to generate precise, production-ready solutions for an array of technical questions.",
        "",
        "CONTEXT:",
        "You will receive a JSON array containing `questionId` and `questionText`. You must process every single question in the array.",
        "",
        "OUTPUT SCHEMA:",
        "Return ONLY a raw JSON array. Do not include markdown formatting, backticks (```), or conversational text. Each object in the array must strictly adhere to this structure:",
        "",
        "[",
        "  {",
        '    "questionId": "string (Must exactly match the input questionId)",',
        '    "answerText": "string (The actual code solution, SQL query, HTML document, or technical explanation)",',
        '    "outputText": "string (The simulated execution output, console logs, query results, or visual description of the rendered code. If not applicable, return an empty string)"',
        "  }",
        "]",
        "",
        "TECHNICAL CONTENT RULES:",
        "- SQL: Write optimized queries. Keywords MUST be in UPPERCASE. `outputText` should simulate the returned table/rows.",
        "- Python: Write clean, idiomatic code with 4-space indentation and brief comments. `outputText` must represent the exact console output/stdout.",
        "- HTML/JS/CSS: Provide a complete, self-contained HTML5 document. `outputText` should be a brief description of what the user would see rendered on the screen.",
        "- Flowcharts/Algorithms: Convert logic into step-by-step pseudo-code in `answerText`. Leave `outputText` empty.",
        "",
        "JSON ESCAPING RULES (CRITICAL):",
        "- All strings must be strictly valid for JSON parsing.",
        "- Escape all newlines as \\n",
        '- Escape all double quotes as \\"',
        "- Escape all backslashes as \\\\",
        "",
        "INPUT DATA:",
        JSON.stringify(seededQuestions, null, 2),
      ].join("\n");

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

//     try {
//       await db.insert(answers).values(geminiAnswers);

//       console.log("Answers Seeded successfully !!");
//     } catch (error) {
//       console.log("Error while entering answers !");
//     }
//   });
// });

// FREE GEMINI MODELS

// gemini-3-flash-preview
// gemini-2.5-pro
// gemini-2.5-flash
// gemini-2.5-flash-lite
