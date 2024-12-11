import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import {
  createForm,
  deleteForm,
  getForm,
  getMyForms,
  publishForm,
  updateForm,
} from "../controllers/form.controller";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateFormSchema } from "../validation/form/create-form.validation";
import { DeleteFormSchema } from "../validation/form/delete-form.validation";
import { UpdateFormSchema } from "../validation/form/update-form.validation";
import { PublishFormSchema } from "../validation/form/publish-form.validation";
import { GetFormSchema } from "../validation/form/get-form.validation";

const formsRouter = Router();

formsRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateFormSchema),
  createForm
);

formsRouter.get("/", requireAuth, getMyForms);

formsRouter.get(
  "/:formId",
  requireAuth,
  RequestValidation(GetFormSchema),
  getForm
);

formsRouter.delete(
  "/:formId",
  requireAuth,
  RequestValidation(DeleteFormSchema),
  deleteForm
);

formsRouter.patch(
  "/:formId",
  requireAuth,
  RequestValidation(UpdateFormSchema),
  updateForm
);

formsRouter.patch(
  "/:formId/publish",
  requireAuth,
  RequestValidation(PublishFormSchema),
  publishForm
);

export { formsRouter };
