import { z } from "zod";
import { CreateQuestionSchema } from "../../validation/question/create-question.validation";
import { UserPayload } from "../../types/user-payload";
import { getFormProvider } from "../form/get-form.provider";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { QuestionModel } from "../../models/question.model";
import { BadRequestError } from "../../errors/BadRequestError";
import { ErrorMessages } from "../../utils/ErrorMessages";
type CreateQuestionBody = z.infer<typeof CreateQuestionSchema.shape.body>;
export const createQuestionProvider = async (
  body: CreateQuestionBody,
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await getFormProvider(formId, loggedInUser);
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }
  const question = await QuestionModel.create({ ...body, form });
  if (!question) {
    throw new BadRequestError(ErrorMessages.QUESTION_CREATE_FAILED);
  }
  form.questions.push(question._id);
  await form.save();
  return question;
};
