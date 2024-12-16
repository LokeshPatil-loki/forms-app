import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { QuestionModel } from "../../models/question.model";
import { UserPayload } from "../../types/user-payload";
import { getFormProvider } from "../form/get-form.provider";
import { getQuestionProvider } from "./get-question.provider";
import { ErrorMessages } from "../../utils/ErrorMessages";
export const deleteQuestionProvider = async (
  questionId: string,
  loggedInUser: UserPayload
) => {
  const question = await QuestionModel.findById(questionId);
  if (!question) {
    throw new NotFoundError(ErrorMessages.QUESTION_NOT_FOUND);
  }
  const form = await FormModel.findById(question.form.toHexString());
  if (!form?.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }
  const questionIndex = form.questions.indexOf(question._id);
  if (questionIndex != -1) {
    form.questions.splice(questionIndex, 1);
  }
  await form.save();
  const isDeleted = await QuestionModel.deleteOne({ _id: question._id });
  if (!isDeleted.acknowledged) {
    throw new BadRequestError(ErrorMessages.QUESTION_DELETE_FAILED);
  }
  return questionId;
};
