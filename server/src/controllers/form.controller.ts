import { json } from "stream/consumers";
import { BadRequestError } from "../errors/BadRequestError";
import { createFormProvider } from "../providers/form/create-form.provider";
import { deleteFormProvider } from "../providers/form/delete-form.provider";
import { getFormProvider } from "../providers/form/get-form.provider";
import { publishFormProvider } from "../providers/form/publish-form.provider";
import { updateFormProvider } from "../providers/form/update-form.provider";
import { UserPayload } from "../types/user-payload";
import { asyncHanlder } from "../utils/AsyncHandler";
import { Request, Response } from "express";
import { getMyFormsProvider } from "../providers/form/get-my-froms.provider";

export const createForm = asyncHanlder(async (req: Request, res: Response) => {
  const { title, description, headerImageUrl } = req.body;
  const loggedInUser = req.user as UserPayload;
  const form = await createFormProvider(
    { title, description, headerImageUrl },
    loggedInUser
  );
  return res.status(201).json({ form, message: "form created successfully" });
});

export const deleteForm = asyncHanlder(async (req: Request, res: Response) => {
  const { formId } = req.params;
  const loggedInUser = req.user as UserPayload;
  const form = await deleteFormProvider(formId, loggedInUser);
  return res.status(200).send({ message: "form deleted successfully", form });
});

export const updateForm = asyncHanlder(async (req: Request, res: Response) => {
  const isUpdated = await updateFormProvider(
    req.body,
    req.params.formId,
    req.user as UserPayload
  );
  if (!isUpdated) {
    throw new BadRequestError("Unable to update form");
  }
  return res.status(200).json({ message: "form updated successfully" });
});

export const publishForm = asyncHanlder(async (req: Request, res: Response) => {
  const shareableLink = await publishFormProvider(
    req.params.formId,
    req.user as UserPayload
  );
  return res
    .status(200)
    .json({ message: "form published successfully", shareableLink });
});

export const getForm = asyncHanlder(async (req: Request, res: Response) => {
  const form = await getFormProvider(
    req.params.formId,
    req.user as UserPayload
  );
  return res.status(200).json(form);
});

export const getMyForms = asyncHanlder(async (req: Request, res: Response) => {
  const forms = await getMyFormsProvider(req.user as UserPayload);
  return res.status(200).json(forms);
});