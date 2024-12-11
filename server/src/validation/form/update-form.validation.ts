import { z } from "zod";
import { CreateFormSchema } from "./create-form.validation";

export const UpdateFormSchema = z.object({
  body: CreateFormSchema.shape.body.partial().strict(),
  params: z.object({
    formId: z
      .string({
        required_error: "formId param is required",
      })
      .length(24, "Invalid formId"),
  }),
});
