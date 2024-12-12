import { Request, Response } from "express";
import { asyncHanlder } from "../utils/AsyncHandler";
import { createResponseProvider } from "../providers/response/create-response.provider";
import { UserPayload } from "../types/user-payload";

export const submitResponse = asyncHanlder(
  async (req: Request, res: Response) => {
    const responseId = await createResponseProvider(
      req.body,
      req.user as UserPayload
    );
    return res.json({
      message: "Form response submitted successfully",
      responseId,
    });
  }
);
