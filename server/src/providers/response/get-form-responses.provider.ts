import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { ResponseModel } from "../../models/response.model";
import { UserPayload } from "../../types/user-payload";
import { ErrorMessages } from "../../utils/ErrorMessages";
export const getFormResponsesProvider = async (
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
  const responses = await ResponseModel.find({ form: form._id }).populate(
    "respondent"
  );
  return responses;
};
