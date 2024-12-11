import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";

export const publishFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!formId) {
    throw new NotFoundError(`Form with id: ${formId} does not exist`);
  }
  if (!form?.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError("You don't have access to publish this form");
  }

  const { acknowledged } = await FormModel.updateOne(
    { _id: form._id },
    { isPublished: true }
  );
  if (!acknowledged) {
    throw new BadRequestError("Unable to publish form");
  }
  return form.shareableLink;
};
