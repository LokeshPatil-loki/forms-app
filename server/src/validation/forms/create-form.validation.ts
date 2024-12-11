import { z } from "zod";

export const CreateFormValidationSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
    descripiton: z.string().min(1, "minimum length should 1").optional(),
    headerImageUrl: z.string().url("invalid url").optional(),
  }),
});
