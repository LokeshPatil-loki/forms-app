import { UserPayload } from "../../types/user-payload";
import { FormModel } from "../../models/form.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { BadRequestError } from "../../errors/BadRequestError";
import { ErrorMessages } from "../../utils/ErrorMessages";

export const deleteFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!form) {
    throw new NotFoundError(ErrorMessages.FORM_NOT_FOUND);
  }
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }
  const result = await FormModel.deleteOne({ _id: form._id });
  if (result.acknowledged) {
    return form;
  } else {
    throw new BadRequestError(ErrorMessages.FORM_DELETE_FAILED);
  }
};
