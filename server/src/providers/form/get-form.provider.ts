import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";

export const getFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId).populate("questions");
  if (!form) {
    throw new NotFoundError("form doest not exist");
  }
  if (!form.isPublished && !form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError("This form is not published");
  }
  return form;
};
