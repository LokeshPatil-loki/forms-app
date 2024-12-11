import { z } from "zod";
import { CreateFormValidationSchema } from "./create-form.validation";

export const UpdateFormValidationSchema = z.object({
  body: CreateFormValidationSchema.pick({ body: true }).partial(),
  params: z.object({
    formId: z
      .string({
        required_error: "formId param is required",
      })
      .length(24, "Invalid formId"),
  }),
});
