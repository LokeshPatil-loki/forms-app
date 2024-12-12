import { BadRequestError } from "../../errors/BadRequestError";
import { ForbiddenError } from "../../errors/ForbiddenError";
import { NotFoundError } from "../../errors/NotFoundError";
import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";
import { ErrorMessages } from "../../utils/ErrorMessages";
export const publishFormProvider = async (
  formId: string,
  loggedInUser: UserPayload
) => {
  const form = await FormModel.findById(formId);
  if (!formId) {
    throw new NotFoundError(ErrorMessages.FORM_NOT_FOUND);
  }
  if (!form?.createdBy?.equals(loggedInUser._id)) {
    throw new ForbiddenError(ErrorMessages.FORM_PERMISSION_DENIED);
  }

  const { acknowledged } = await FormModel.updateOne(
    { _id: form._id },
    { isPublished: true }
  );
  if (!acknowledged) {
    throw new BadRequestError(ErrorMessages.FORM_PUBLISH_FAILED);
  }
  return form.shareableLink;
};
