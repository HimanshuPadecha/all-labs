import { questions } from "@/db/schema";
import { db } from "@/index";
import { ai } from "@/lib/gemini";
import { utapi } from "@/lib/utapi";
import { generateQuestionInput } from "@/types/form-type";
import { ApiError } from "@google/genai";
import { serve } from "@upstash/workflow/nextjs";
import { InferInsertModel } from "drizzle-orm";
import sharp from "sharp";
import z from "zod";

export const { POST } = serve(async (context) => {
  const { imageUrl, labId, subjectId, fileKey } =
    context.requestPayload as z.infer<typeof generateQuestionInput>;

  const buffer = await context.run("get-input", async () => {
    try {
      const response = await fetch(imageUrl);

      const arrBuffer = await response.arrayBuffer();

      const buffer = Buffer.from(arrBuffer);

      const compressedBuffer = await sharp(buffer)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      return compressedBuffer.toString("base64");
    } catch (error) {
      console.log("Error while making buffer", error);
      await utapi.deleteFiles(fileKey);
      throw new Error("Error while getting buffer !!");
    }
  });

  const mimeType = "image/webp";

  const PROMPT = `
Act as a precise data extraction engine. Analyze the provided image and extract questions into a strict JSON format.

### CONTEXT
- labId: "${labId}"
- subjectId: "${subjectId}"

### SCHEMA RULES
For each question found, create an object with:
1. "labId": String (use provided value).
2. "subjectId": String (use provided value).
3. "questionNo": Integer (sequential starting from 1).
4. "questionText": String (exact text from image).

### OUTPUT GUARANTEE
- Return ONLY a raw JSON array.
- Do NOT include markdown formatting like \`\`\`json.
- Do NOT include introductory or concluding text.
- Ensure all special characters in "questionText" (like newlines or quotes) are properly escaped for valid JSON.
- Don't include question number in "questionText" just add raw question in the questionText
  example : "1.what is the weather today ? " wrong 
            "What is the weather today ? " right
- make sure to give exact question no in the questionNo field
- If there is the flowchart. Convert that flowchart into text. Means convert that flow chart into the text and then add that into questionText.
  example :
        ┌─────────┐
        │  Start  │
        └────┬────┘
             │
        ┌────▼────┐
        │ Read n  │
        └────┬────┘
             │
        ┌────▼──────────┐
        │ Read guess    │
        │   number      │
        └────┬──────────┘
             │
        ┌────▼──────────┐
        │ Guess = input │
        └────┬──────────┘
             │
        ┌────▼──────────┐
        │   Guess > n ? │
        └────┬─────┬── ─┘
             │Yes  │No
             │     │
┌────────────▼───┐ ┌───── ──────────┐
│ Your guess is  │ │  Guess < n ?   │
│   too high     │ └────┬─────┬─────┘
└────────────┬───┘      │Yes  │No
             │          │     │
             │  ┌───────▼───┐ ┌───────────────┐
             │  │ Your guess│ │  Guess = n    │
             │  │ is too low│ │     ?         │
             │  └───────┬───┘ └────┬──────────┘
             │          │          │Yes
             │          │      ┌────▼────┐
             │          │      │ Good job│
             │          │      └────┬────┘
             │          │           │
             └──────────┴───────────┴───────┐
                                            │
                                        ┌────▼────┐
                                        │  Stop   │
                                        └─────────┘
### EXAMPLE
[{"labId":"${labId}","subjectId":"${subjectId}","questionNo":1,"questionText":"Sample?"}]
`;

  const seedData: InferInsertModel<typeof questions>[] = await context.run(
    "req-to-gemini",
    async () => {
      try {
        const geminiResponse = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: [
            {
              parts: [
                {
                  text: PROMPT,
                },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: buffer,
                  },
                },
              ],
            },
          ],
        });

        if (!geminiResponse) {
          throw new Error("Gemini gave empty response !!");
        }

        console.log(geminiResponse.text);

        try {
          return JSON.parse(geminiResponse.text as string);
        } catch (error) {
          throw new Error("Invalid json from gemini !!");
        }
      } catch (error) {
        console.log("Error while requesting to gemini !!", error);
        utapi.deleteFiles(fileKey);
        if (error instanceof ApiError) {
          throw new Error(error.message);
        }
        throw new Error("Something went wrong !!");
      }
    },
  );

  await context.run("seed-data", async () => {
    try {
      const doneSeeding = await db
        .insert(questions)
        .values(seedData)
        .returning();

      console.log("Questions seeded successfully");
      utapi.deleteFiles(fileKey);
      console.log("Image deleted !!");

    } catch (error) {
      utapi.deleteFiles(fileKey);
      console.log("Error seeding data into database : ", error);
    }
  });
});
