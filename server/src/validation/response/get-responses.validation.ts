import { z } from "zod";

export const GetResponseSchema = z.object({
  params: z.object({
    formId: z
      .string({ required_error: "formId param is required" })
      .length(24, "Invalid formId"),
  }),
});
