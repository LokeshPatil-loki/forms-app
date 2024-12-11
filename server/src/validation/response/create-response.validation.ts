import { z } from "zod";
import { BaseResponseSchema } from "./base-response.validation";

export const CreateResponseValidation = z.object({
  body: BaseResponseSchema.strict(),
  params: z.object({
    formId: z
      .string({ required_error: "formId is required" })
      .length(24, "Invalid formId"),
  }),
});
