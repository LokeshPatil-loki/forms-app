import { Router } from "express";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { SignUpValidationSchema } from "../validation/sign-up.validation";
import {
  loginController,
  signUpController,
} from "../controllers/users.controller";
import { LoginValidationSchema } from "../validation/login.validation";

const userRouter = Router();

userRouter.post(
  "/sign-up",
  RequestValidation(SignUpValidationSchema),
  signUpController
);

userRouter.post(
  "/login",
  RequestValidation(LoginValidationSchema),
  loginController
);

export { userRouter };
