import { z } from "zod";
import { QuestionBaseSchema } from "./question-base.validation";

export const UpdateQuestionSchema = z.object({
  body: QuestionBaseSchema.shape.body.strict().partial(),
  params: z.object({
    questionId: z
      .string({ required_error: "questionId is required" })
      .length(24, "Invalid questionId"),
  }),
});
