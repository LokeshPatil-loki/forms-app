import { Router } from "express";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { SignUpValidationSchema } from "../validation/sign-up.validation";
import { signUpController } from "../controllers/users.controller";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  RequestValidation(SignUpValidationSchema),
  signUpController
);

export { userRouter };
