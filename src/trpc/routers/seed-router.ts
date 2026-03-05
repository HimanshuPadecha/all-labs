import z from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import { db } from "@/index";
import { answers, labs, questions, subjects } from "@/db/schema";
import { asc, eq, getTableColumns } from "drizzle-orm";
import { client } from "@/utils/upstash";
import { SubjectWithLabs } from "@/trpc-procedures-types/types";

export const seedRouter = createTRPCRouter({
  getLabId: protectedProcedure
    .input(
      z.object({
        subjectName: z.string(),
        labNo: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { labNo, subjectName } = input;

      const subject = db
        .$with("subject")
        .as(
          db
            .select({ id: subjects.id })
            .from(subjects)
            .where(eq(subjects.name, subjectName))
        );

      const [info] = await db
        .with(subject)
        .select({ labId: labs.id })
        .from(labs)
        .innerJoin(subject, eq(subject.id, labs.subjectId))
        .where(eq(labs.labNo, labNo))
        .limit(1);

      return { labId: info.labId };
    }),
  subjects: baseProcedure.query(async () => {
    const allSubs = await db.select().from(subjects);
    return allSubs;
  }),

  getValidLabIds: protectedProcedure
    .input(
      z.object({
        subjectId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const { subjectId } = input;

      const allLabs = await db
        .select({
          id: labs.id,
          no: labs.labNo,
          name: labs.name,
          questionsCount: db.$count(questions, eq(questions.labId, labs.id)),
        })
        .from(labs)
        .where(eq(labs.subjectId, subjectId))
        .orderBy(asc(labs.labNo));

      return allLabs;
    }),

  answersSeed: protectedProcedure
    .input(
      z.object({
        labId: z.string().uuid(),
      })
    )
    .mutation(async ({ input }) => {
      const { labId } = input;

      await client.trigger({
        url: `${process.env.UPSTASH_WORKFLOW_URL}/api/workflow/generate-answers`,
        retries: 2,
        body: {
          labId,
        },
      });

      return { success: true };
    }),

  getQuestionsAnswers: protectedProcedure
    .input(
      z.object({
        labId: z.string().uuid(),
      })
    )
    .query(async ({ input }) => {
      const { labId } = input;

      const allQuestionsAnswers = await db
        .select({
          question: {
            ...getTableColumns(questions),
          },
          answer: {
            ...getTableColumns(answers),
          },
          lab: {
            labNo: labs.labNo,
            name: labs.name,
            id: labs.id,
          },
          subject: {
            name: subjects.name,
          },
        })
        .from(questions)
        .where(eq(questions.labId, labId))
        .leftJoin(answers, eq(questions.id, answers.questionId))
        .innerJoin(labs, eq(questions.labId, labs.id))
        .innerJoin(subjects, eq(subjects.id, labs.subjectId))
        .orderBy(asc(questions.questionNo));

      return allQuestionsAnswers;
    }),
  getAllSubjectsAndLabs: baseProcedure.query(async ({ ctx }) => {
    const subs = await db
      .select()
      .from(subjects)
      .leftJoin(labs, eq(subjects.id, labs.subjectId));

    const result: Record<string, SubjectWithLabs> = {};

    subs.forEach((item) => {
      if (!result[item.subjects.name]) {
        result[item.subjects.name] = {
          ...item.subjects,
          labs: item.labs ? [item.labs] : [],
        };
      } else if (item.labs) {
        result[item.subjects.name].labs.push(item.labs);
      }
    });

    const arr = Object.values(result);

    for (let i = 0; i < arr.length; i++) {
      arr[i].labs.sort((a, b) => a.labNo - b.labNo);
    }

    return arr;
  }),
});
