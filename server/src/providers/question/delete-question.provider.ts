import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { QuestionModel } from "../../models/question.model";
import { UserPayload } from "../../types/user-payload";
import { getFormProvider } from "../form/get-form.provider";
import { getQuestionProvider } from "./get-question.provider";

export const deleteQuestionProvider = async (
  questionId: string,
  loggedInUser: UserPayload
) => {
  const question = await QuestionModel.findById(questionId);
  if (!question) {
    throw new NotFoundError("Question does not exist");
  }
  const form = await getFormProvider(question.form.toHexString(), loggedInUser);
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError("You don't have access to delete this question");
  }
  const questionIndex = form.questions.indexOf(question._id);
  if (questionIndex != -1) {
    form.questions.splice(questionIndex, 1);
  }
  await form.save();
  const isDeleted = await QuestionModel.deleteOne({ _id: question._id });
  if (!isDeleted.acknowledged) {
    throw new BadRequestError("Unable to delete question");
  }
  return questionId;
};
