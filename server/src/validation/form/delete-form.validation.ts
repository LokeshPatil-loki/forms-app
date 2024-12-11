import { z } from "zod";

export const DeleteFormSchema = z.object({
  params: z.object({
    formId: z
      .string({
        required_error: "formId param is required to delete a from",
      })
      .length(24, "Invalid formId"),
  }),
});
