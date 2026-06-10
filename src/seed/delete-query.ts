import dotenv from "dotenv";
import { db } from "..";
import { answers, questions } from "@/db/schema";
import { eq } from "drizzle-orm";

dotenv.config();

const deleteOutputs = async () => {
  try {
    const labId = "0ac7d1c4-13f0-43f1-ba7b-6713ac777fc3";

    const labAnswers = await db
      .select({
        id: answers.id,
      })
      .from(questions)
      .where(eq(questions.labId, labId))
      .innerJoin(answers, eq(answers.questionId, questions.id));
    // await db.update(answers).set({outputText : ""}).where(eq(answers.))

    await Promise.all(
      labAnswers.map((ans) =>
        db
          .update(answers)
          .set({ outputText: "" })
          .where(eq(answers.id, ans.id)),
      ),
    );

    console.log("output cleared ");
    
  } catch (error) {
    console.log(error);
  }
};

deleteOutputs()