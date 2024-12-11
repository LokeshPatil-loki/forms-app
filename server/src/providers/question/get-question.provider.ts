import { z } from "zod";
import { GetQuestionSchema } from "../../validation/question/get-question.validation";
import { UserPayload } from "../../types/user-payload";
import { QuestionModel } from "../../models/question.model";
import { NotFoundError } from "../../errors/NotFoundError";

type Params = z.infer<typeof GetQuestionSchema.shape.params>;
export const getQuestionProvider = async (questionId: string) => {
  const question = await QuestionModel.findById(questionId);
  if (!question) {
    throw new NotFoundError("Question not found");
  }
  return question;
};
