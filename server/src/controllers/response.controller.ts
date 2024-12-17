import { Request, Response } from "express";
import { asyncHanlder } from "../utils/AsyncHandler";
import { createResponseProvider } from "../providers/response/create-response.provider";
import { UserPayload } from "../types/user-payload";
import { getFormResponsesProvider } from "../providers/response/get-form-responses.provider";
import { createApiResponse } from "../utils/ApiResponse";
import { ObjectId } from "mongodb";

const convertObjectIdToString = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map(convertObjectIdToString);
  } else if (data && typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value instanceof ObjectId
          ? value.toString()
          : convertObjectIdToString(value),
      ])
    );
  }
  return data;
};

export const submitResponse = asyncHanlder(
  async (req: Request, res: Response) => {
    const formResponse = await createResponseProvider(
      req.body,
      req.user as UserPayload
    );
    // const formatedResponse = convertObjectIdToString(formResponse);
    return res.status(201).json(
      createApiResponse(true, "Form response submitted successfully", {
        response: formResponse,
      })
    );
  }
);

export const getFormResponses = asyncHanlder(
  async (req: Request, res: Response) => {
    const formResponses = await getFormResponsesProvider(
      req.params.formId,
      req.user as UserPayload
    );
    return res.status(200).json(
      createApiResponse(true, "Form responses retrieved successfully", {
        responses: formResponses,
      })
    );
  }
);
