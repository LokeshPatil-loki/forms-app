import { Router } from "express";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { SignUpSchema } from "../validation/user/sign-up.validation";
import {
  loginController,
  signUpController,
} from "../controllers/user.controller";
import { LoginSchema } from "../validation/user/login.validation";

const userRouter = Router();

userRouter.post("/sign-up", RequestValidation(SignUpSchema), signUpController);

userRouter.post("/login", RequestValidation(LoginSchema), loginController);

export { userRouter };
