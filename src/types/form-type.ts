import z from "zod";

export const formSchema = z.object({
  questionNo: z.string().nonempty("INVALID QUESTION NUMBER"),
  questionText: z.string().nonempty("QUESTION TOO SHORT"),
  answerText: z.string().nonempty("ANSWER TOO SHORT"),
  labId: z.string().uuid(),
});

export const generateQuestionInput = z.object({
  imageUrl: z.string(),
  subjectId: z.string().uuid(),
  labId: z.string().uuid(),
  fileKey: z.string(),
});
