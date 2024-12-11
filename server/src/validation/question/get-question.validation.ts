import { z } from "zod";

export const GetQuestionSchema = z.object({
  params: z.object({
    questionId: z
      .string({ required_error: "questionId is required" })
      .length(24, "Invalid questionId"),
  }),
});
