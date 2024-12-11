import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { createForm } from "../controllers/forms.controller";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateFormValidationSchema } from "../validation/forms/create-form.validation";

const formsRouter = Router();

formsRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateFormValidationSchema),
  createForm
);

export { formsRouter };
