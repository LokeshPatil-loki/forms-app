import { z } from "zod";

export const GetFormValidationSchema = z.object({
  params: z.object({
    formId: z
      .string({ required_error: "formId param is required" })
      .length(24, "Invalid formId"),
  }),
});
