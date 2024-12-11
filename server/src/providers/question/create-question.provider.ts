import { z } from "zod";
import { CreateQuestionSchema } from "../../validation/question/create-question.validation";
import { UserPayload } from "../../types/user-payload";
import { getFormProvider } from "../form/get-form.provider";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { QuestionModel } from "../../models/question.model";
import { BadRequestError } from "../../errors/BadRequestError";

type CreateQuestionBody = z.infer<typeof CreateQuestionSchema.shape.body>;
export const createQuestionProvider = async (
  body: CreateQuestionBody,
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await getFormProvider(formId, loggedInUser);
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(
      `You don't have permission to add question to the form ${formId}`
    );
  }
  const question = await QuestionModel.create({ ...body, form });
  if (!question) {
    throw new BadRequestError("Database Error: Unable to create question");
  }
  form.questions.push(question._id);
  await form.save();
  return question;
};
