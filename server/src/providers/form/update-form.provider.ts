import { z } from "zod";
import { UpdateFormSchema } from "../../validation/form/update-form.validation";
import { UserPayload } from "../../types/user-payload";
import { FormModel } from "../../models/form.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { BadRequestError } from "../../errors/BadRequestError";
import { ErrorMessages } from "../../utils/ErrorMessages";
type UpdateFormBody = z.infer<typeof UpdateFormSchema.shape.body>;
export const updateFormProvider = async (
  body: UpdateFormBody,
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
  // return title;
  const updatedForm = await FormModel.findByIdAndUpdate(
    { _id: form._id },
    { ...body, updatedAt: new Date() },
    { new: true }
  );
  if (!updatedForm) {
    throw new BadRequestError(ErrorMessages.FORM_UPDATE_FAILED);
  }
  return updatedForm;
};
