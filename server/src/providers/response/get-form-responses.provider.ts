import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { ResponseModel } from "../../models/response.model";
import { UserPayload } from "../../types/user-payload";

export const getFormResponsesProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!form) {
    throw new NotFoundError("Form does not exist");
  }
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(
      "You are not allowd to view responses of this form"
    );
  }
  const responses = await ResponseModel.find({ form: form._id });
  return responses;
};