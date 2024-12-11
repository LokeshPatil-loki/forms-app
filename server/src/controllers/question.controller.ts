import { Request, Response } from "express";
import { asyncHanlder } from "../utils/AsyncHandler";
import { createQuestionProvider } from "../providers/question/create-question.provider";
import { UserPayload } from "../types/user-payload";
import { updateQuestionProvider } from "../providers/question/update-question.provider";
import { getQuestionProvider } from "../providers/question/get-question.provider";
import { deleteQuestionProvider } from "../providers/question/delete-question.provider";

export const createQuestion = asyncHanlder(
  async (req: Request, res: Response) => {
    const question = await createQuestionProvider(
      req.body,
      req.params.formId,
      req.user as UserPayload
    );
    console.log(question);
    return res
      .status(201)
      .json({ question, message: "added question to form" });
  }
);

export const updateQuestion = asyncHanlder(
  async (req: Request, res: Response) => {
    await updateQuestionProvider(
      req.body,
      req.params.questionId,
      req.user as UserPayload
    );
    return res.status(200).json({ message: "updated question" });
  }
);

export const getQuestion = asyncHanlder(async (req: Request, res: Response) => {
  const question = await getQuestionProvider(req.params.questionId);
  return res.status(200).json({ question });
});

export const deleteQuestion = asyncHanlder(
  async (req: Request, res: Response) => {
    const deletedId = await deleteQuestionProvider(
      req.params.questionId,
      req.user as UserPayload
    );
    return res.status(200).json({ message: `deleted question ${deletedId}` });
  }
);
