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
import { createApiResponse } from "../utils/ApiResponse";

export const createForm = asyncHanlder(async (req: Request, res: Response) => {
  const { title, description, headerImageUrl } = req.body;
  const loggedInUser = req.user as UserPayload;
  const form = await createFormProvider(
    { title, description, headerImageUrl },
    loggedInUser
  );
  return res
    .status(201)
    .json(createApiResponse(true, "Form created successfully", { form }));
});

export const deleteForm = asyncHanlder(async (req: Request, res: Response) => {
  const { formId } = req.params;
  const loggedInUser = req.user as UserPayload;
  const form = await deleteFormProvider(formId, loggedInUser);
  return res
    .status(200)
    .json(createApiResponse(true, "Form deleted successfully", { form }));
});

export const updateForm = asyncHanlder(async (req: Request, res: Response) => {
  const updatedForm = await updateFormProvider(
    req.body,
    req.params.formId,
    req.user as UserPayload
  );
  return res
    .status(200)
    .json(
      createApiResponse(true, "Form updated successfully", {
        form: updatedForm,
      })
    );
});

export const publishForm = asyncHanlder(async (req: Request, res: Response) => {
  const shareableLink = await publishFormProvider(
    req.params.formId,
    req.user as UserPayload
  );
  return res
    .status(200)
    .json(
      createApiResponse(true, "Form published successfully", { shareableLink })
    );
});

export const getForm = asyncHanlder(async (req: Request, res: Response) => {
  const form = await getFormProvider(
    req.params.formId,
    req.user as UserPayload
  );
  return res
    .status(200)
    .json(createApiResponse(true, "Form retrieved successfully", { form }));
});

export const getMyForms = asyncHanlder(async (req: Request, res: Response) => {
  const forms = await getMyFormsProvider(req.user as UserPayload);
  return res
    .status(200)
    .json(createApiResponse(true, "Forms retrieved successfully", { forms }));
});
