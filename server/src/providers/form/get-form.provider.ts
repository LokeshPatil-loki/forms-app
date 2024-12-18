import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";
import { ErrorMessages } from "../../utils/ErrorMessages";

export const getFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId).populate({
    path: "questions",
    transform: (doc) => {
      const questionObject = doc.toObject();
      questionObject.id = questionObject._id;
      delete questionObject._id;
      return questionObject;
    },
  });
  if (!form) {
    throw new NotFoundError(ErrorMessages.FORM_NOT_FOUND);
  }
  if (!form.isPublished && !form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }
  return form;
};
