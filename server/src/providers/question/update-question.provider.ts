import { z } from "zod";
import { UpdateQuestionSchema } from "../../validation/question/update-question.validation";
import { UserPayload } from "../../types/user-payload";
import { QuestionModel } from "../../models/question.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { BadRequestError } from "../../errors/BadRequestError";
import { getFormProvider } from "../form/get-form.provider";
import { ForbiddenError } from "../../errors/ForbiddenError";

type Body = z.infer<typeof UpdateQuestionSchema.shape.body>;
type Params = z.infer<typeof UpdateQuestionSchema.shape.params>;
import { ErrorMessages } from "../../utils/ErrorMessages";
export const updateQuestionProvider = async (
  body: Body,
  questionId: string,
  loggedInUser: UserPayload
) => {
  const question = await QuestionModel.findById(questionId);
  if (!question) {
    throw new NotFoundError(ErrorMessages.QUESTION_NOT_FOUND);
  }

  const form = await getFormProvider(
    question.form.toString("hex"),
    loggedInUser
  );

  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }

  const updatedQuestion = await QuestionModel.findByIdAndUpdate(
    { _id: question._id },
    { ...body },
    { new: true }
  );
  if (!updatedQuestion) {
    throw new BadRequestError(ErrorMessages.QUESTION_UPDATE_FAILED);
  }
  return updatedQuestion;
};
