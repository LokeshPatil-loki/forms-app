import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import {
  createForm,
  deleteForm,
  getForm,
  getMyForms,
  publishForm,
  updateForm,
} from "../controllers/forms.controller";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateFormValidationSchema } from "../validation/form/create-form.validation";
import { DeleteFormValidationSchema } from "../validation/form/delete-form.validation";
import { UpdateFormValidationSchema } from "../validation/form/update-form.validation";
import { PublishFormValidationSchema } from "../validation/form/publish-form.validation";
import { GetFormValidationSchema } from "../validation/form/get-form.validation";

const formsRouter = Router();

formsRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateFormValidationSchema),
  createForm
);

formsRouter.get("/", requireAuth, getMyForms);

formsRouter.get(
  "/:formId",
  requireAuth,
  RequestValidation(GetFormValidationSchema),
  getForm
);

formsRouter.delete(
  "/:formId",
  requireAuth,
  RequestValidation(DeleteFormValidationSchema),
  deleteForm
);

formsRouter.patch(
  "/:formId",
  requireAuth,
  RequestValidation(UpdateFormValidationSchema),
  updateForm
);

formsRouter.patch(
  "/:formId/publish",
  requireAuth,
  RequestValidation(PublishFormValidationSchema),
  publishForm
);

export { formsRouter };
