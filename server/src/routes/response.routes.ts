import { Router } from "express";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { CreateResponseSchema } from "../validation/response/create-response.validation";
import { submitResponse } from "../controllers/response.controller";

const responseRouter = Router();

responseRouter.post(
  "/",
  requireAuth,
  RequestValidation(CreateResponseSchema),
  submitResponse
);

export { responseRouter };
