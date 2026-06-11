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

  const labAnswers = await context.run("get-answers", async () => {
    const alreadyPresentAnswers = await db
      .select({
        id: answers.id,
        answerText: answers.answerText,
      })
      .from(questions)
      .where(eq(questions.labId, labId))
      .innerJoin(answers, eq(answers.questionId, questions.id));

    if (!alreadyPresentAnswers) {
      throw new Error("No Answers for this lab is seeded yet !!");
    }

    return alreadyPresentAnswers;
  });

  const geminiOutput: { id: string; outputText: string }[] = await context.run(
    "get-gemini-response",
    async () => {
      try {
        const PROMPT = [
          "You are a strict, automated code execution simulator. Your sole function is to receive a JSON array containing objects with an `id` and `answerText` (which contains code), and return a new JSON array of objects containing the same `id` and an `outputText`.",
          "",
          "YOUR TASK:",
          "Read the code provided in the `answerText` and simulate its execution. Your `outputText` must be the exact console output (stdout) that would be produced by running this code.",
          "- If the code requires user input (e.g., Python's `input()`), you must invent plausible, realistic mock data to complete the simulation and include both the prompts and the mock answers in the output.",
          "- Preserve all line breaks, spacing, and formatting exactly as it would appear in a terminal.",
          "",
          "THE EMPTY STRING RULE (CRITICAL):",
          'Not every `answerText` will contain executable code. If the text is just an explanation, irrelevant, empty, gibberish, or lacks enough context to simulate an output, you MUST set the `outputText` to an empty string ("").',
          "- DO NOT force an output.",
          '- DO NOT write explanations or say "Cannot execute". Just return "".',
          "",
          "OUTPUT CONSTRAINTS:",
          "- You must output ONLY valid JSON.",
          "- Every `id` from the input must be present in the output.",
          "- Do not wrap the JSON in markdown code blocks (e.g., do not use ```json).",
          "- Do not include any conversational text.",
          "",
          "INPUT DATA:",
          JSON.stringify(labAnswers, null, 2),
        ].join("\n");

        const geminiResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            {
              parts: [
                {
                  text: PROMPT,
                },
              ],
            },
          ],
        });

        if (!geminiResponse) {
          throw new Error("Gemini sends an empty response");
        }

        const parsedGeminiResponse = JSON.parse(geminiResponse.text as string);

        if (!parsedGeminiResponse) {
          throw new Error("Cannot parse gemini response");
        }

        return parsedGeminiResponse;
      } catch (error) {
        console.log(error);
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw new Error("Something went wrong !!");
      }
    },
  );

  await context.run("seed-ouput", async () => {
    await Promise.all(
      geminiOutput.map((output) =>
        db
          .update(answers)
          .set({ outputText: output.outputText })
          .where(eq(answers.id, output.id)),
      ),
    );

    console.log("output text generated successfully !!");
  });
});
