import { Router } from "express";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { SignUpValidationSchema } from "../validation/user/sign-up.validation";
import {
  loginController,
  signUpController,
} from "../controllers/user.controller";
import { LoginValidationSchema } from "../validation/user/login.validation";

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
