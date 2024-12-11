import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import {
  createForm,
  deleteForm,
  publishForm,
  updateForm,
} from "../controllers/forms.controller";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateFormValidationSchema } from "../validation/forms/create-form.validation";
import { DeleteFormValidationSchema } from "../validation/forms/delete-form.validation";
import { UpdateFormValidationSchema } from "../validation/forms/update-form.validation";
import { PublishFormValidationSchema } from "../validation/forms/publish-form.validation";

const formsRouter = Router();

formsRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateFormValidationSchema),
  createForm
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
