import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateResponseSchema } from "../validation/response/create-response.validation";
import {
  getFormResponses,
  submitResponse,
} from "../controllers/response.controller";
import { GetFormSchema } from "../validation/form/get-form.validation";
import { GetResponseSchema } from "../validation/response/get-responses.validation";

const responseRouter = Router();

responseRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateResponseSchema),
  submitResponse
);

responseRouter.get(
  "/form/:formId",
  requireAuth,
  RequestValidation(GetResponseSchema),
  getFormResponses
);

export { responseRouter };
