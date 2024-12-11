import { z } from "zod";

export const CreateFormSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Title is required" }),
      description: z.string().min(1, "minimum length should 1").optional(),
      headerImageUrl: z.string().url("invalid url").optional(),
      questions: z.array(z.string().length(24)).optional(),
    })
    .strict(),
});
