import { z } from "zod";

export const DeleteQuestionSchema = z.object({
  params: z.object({
    questionId: z
      .string({ required_error: "questionId is required" })
      .length(24, "Invalid questionId"),
    formId: z
      .string({ required_error: "formId is required" })
      .length(24, "Invalid formId"),
  }),
});
