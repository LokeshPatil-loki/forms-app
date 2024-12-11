import { createFormProvider } from "../providers/form/create-form.provider";
import { UserPayload } from "../types/user-payload";
import { asyncHanlder } from "../utils/AsyncHandler";
import { Request, Response } from "express";

export const createForm = asyncHanlder(async (req: Request, res: Response) => {
  const { title, description, headerImageUrl } = req.body;
  const loggedInUser = req.user as UserPayload;
  const form = await createFormProvider(
    { title, description, headerImageUrl },
    loggedInUser
  );
  return res.status(201).json({ form, message: "form created successfully" });
});
