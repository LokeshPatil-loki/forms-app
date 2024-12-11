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

export const updateQuestionProvider = async (
  body: Body,
  questionId: string,
  loggedInUser: UserPayload
) => {
  const question = await QuestionModel.findById(questionId);
  if (!question) {
    throw new NotFoundError("Question does not exist");
  }

  const form = await getFormProvider(
    question.form.toString("hex"),
    loggedInUser
  );

  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(
      "You don't have permission to update this question"
    );
  }

  const isUpdated = await QuestionModel.updateOne(
    { _id: question._id },
    { ...body }
  );
  if (!isUpdated.acknowledged) {
    throw new BadRequestError("Unable to update question");
  }
  return true;
};
