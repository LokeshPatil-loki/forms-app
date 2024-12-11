import { Router } from "express";
import { RequestValidation } from "../middlewares/request-validation.middleware";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { GetQuestionSchema } from "../validation/question/get-question.validation";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
  updateQuestion,
} from "../controllers/question.controller";
import { CreateQuestionSchema } from "../validation/question/create-question.validation";
import { UpdateQuestionSchema } from "../validation/question/update-question.validation";
import { DeleteQuestionSchema } from "../validation/question/delete-question.validation";

const questionRouter = Router();

questionRouter.get(
  "/:questionId",
  requireAuth,
  RequestValidation(GetQuestionSchema),
  getQuestion
);
questionRouter.delete(
  "/:questionId",
  requireAuth,
  RequestValidation(DeleteQuestionSchema),
  deleteQuestion
);
questionRouter.post(
  "/form/:formId",
  requireAuth,
  RequestValidation(CreateQuestionSchema),
  createQuestion
);
questionRouter.patch(
  "/:questionId",
  requireAuth,
  RequestValidation(UpdateQuestionSchema),
  updateQuestion
);

export { questionRouter };
