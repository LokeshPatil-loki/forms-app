import { z } from "zod";
import { UpdateFormValidationSchema } from "../../validation/forms/update-form.validation";
import { UserPayload } from "../../types/user-payload";
import { FormModel } from "../../models/form.model";
import { NotFoundError } from "../../errors/NotFoundError";
import { ForbiddenError } from "../../errors/ForbiddenError";
type UpdateFormBody = z.infer<typeof UpdateFormValidationSchema.shape.body>;
export const updateFormProvider = async (
  body: UpdateFormBody,
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!form) {
    throw new NotFoundError(`Form with id: ${formId} does not exist`);
  }
  if (!form.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(`You are not allowd to update this form`);
  }
  // return title;
  const updatedForm = await FormModel.updateOne(
    { _id: form._id },
    { ...body, updatedAt: new Date() }
  );

  return updatedForm.acknowledged;
};
