import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "../init";
import { answers, questions } from "@/db/schema";
import { db } from "@/index";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { formSchema } from "@/types/form-type";

export const adminRouter = createTRPCRouter({
  deleteQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { questionId } = input;

      const [deletedQuestion] = await db
        .delete(questions)
        .where(eq(questions.id, questionId))
        .returning();

      return deletedQuestion;
    }),

  EditQuestion: protectedProcedure
    .input(
      z.object({
        questionId: z.string().uuid(),
        questionText: z.string(),
        questionNo: z.number(),
      }),
    )
    .mutation(async ({ input }) => {
      const { questionId, questionText, questionNo } = input;

      const [editedQuestion] = await db
        .update(questions)
        .set({
          questionText,
          questionNo,
        })
        .where(eq(questions.id, questionId))
        .returning();

      return editedQuestion;
    }),
  EditAnswer: protectedProcedure
    .input(
      z.object({
        answerId: z.string().uuid().optional(),
        answerText: z.string(),
        questionId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { answerId, answerText, questionId } = input;

      if (!answerId) {
        const [newAnswer] = await db
          .insert(answers)
          .values({
            answerText,
            questionId,
          })
          .returning();

        return newAnswer;
      }

      const [editedAnswer] = await db
        .update(answers)
        .set({
          answerText,
        })
        .where(eq(answers.id, answerId))
        .returning();

      return editedAnswer;
    }),
  addQuestion: protectedProcedure
    .input(formSchema)
    .mutation(async ({ input }) => {
      const { answerText, questionNo, questionText, labId } = input;

      const [newQuestion] = await db
        .insert(questions)
        .values({
          questionNo: Number(questionNo),
          questionText,
          labId,
        })
        .returning();

      if (!newQuestion) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }

      const [newAnswer] = await db
        .insert(answers)
        .values({ questionId: newQuestion.id, answerText })
        .returning();

      return newAnswer;
    }),
  deleteAllLabQuestion: protectedProcedure
    .input(
      z.object({
        labId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input }) => {
      const { labId } = input;

      const [deletedQuestions] = await db
        .delete(questions)
        .where(eq(questions.labId, labId))
        .returning();

      return deletedQuestions;
    }),

  editOutput: protectedProcedure
    .input(
      z.object({
        answerId: z.string().uuid(),
        newOutputText: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { answerId, newOutputText } = input;

      const [answer] = await db
        .select()
        .from(answers)
        .where(eq(answers.id, answerId));

      if (!answer) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const [updated] = await db
        .update(answers)
        .set({ outputText: newOutputText })
        .where(eq(answers.id, answerId))
        .returning();

      return updated;
    }),
});
