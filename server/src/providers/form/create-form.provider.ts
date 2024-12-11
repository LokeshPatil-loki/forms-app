import { hash, hashSync } from "bcrypt";
import { BadRequestError } from "../../errors/BadRequestError";
import { FormModel } from "../../models/form.model";
import { UserPayload } from "../../types/user-payload";

interface CreateFormProviderBody {
  title: string;
  description?: string;
  headerImageUrl?: string;
}
export const createFormProvider = async (
  body: CreateFormProviderBody,
  loggedInUser: UserPayload
) => {
  const shareableLink = await generateUniqueShareableLink(body.title);
  const form = await FormModel.create({
    ...body,
    createdBy: loggedInUser._id,
    shareableLink,
  });
  if (!form) {
    throw new BadRequestError("Unable to create form");
  }

  console.log(form);

  return form;
};

async function generateUniqueShareableLink(title: string) {
  return `form_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
}