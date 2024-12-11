import { Types } from "mongoose";
import { UserPayload } from "../../types/user-payload";
import { FormModel } from "../../models/form.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { BadRequestError } from "../../errors/BadRequestError";

export const deleteFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!form) {
    throw new NotFoundError("Form not found");
  }
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError("You are not allowed to delete this form");
  }
  const result = await FormModel.deleteOne({ _id: form._id });
  if (result.acknowledged) {
    return form;
  } else {
    throw new BadRequestError("Unable to delete form");
  }
};
