import { Request, Response } from "express";
import { asyncHanlder } from "../utils/AsyncHandler";
import { createResponseProvider } from "../providers/response/create-response.provider";
import { UserPayload } from "../types/user-payload";
import { getFormResponsesProvider } from "../providers/response/get-form-responses.provider";

export const submitResponse = asyncHanlder(
  async (req: Request, res: Response) => {
    const responseId = await createResponseProvider(
      req.body,
      req.user as UserPayload
    );
    return res.status(201).json({
      message: "Form response submitted successfully",
      responseId,
    });
  }
);

export const getFormResponses = asyncHanlder(
  async (req: Request, res: Response) => {
    const formResponses = await getFormResponsesProvider(
      req.params.formId,
      req.user as UserPayload
    );
    return res.status(200).json({ formResponses });
  }
);
