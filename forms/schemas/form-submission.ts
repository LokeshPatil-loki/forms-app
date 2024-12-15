import { z } from "zod";

export const TextAnswer = z.union([z.string(), z.number()]);
export const CheckBoxAnswer = z.array(
  z.union([z.string(), z.number(), z.boolean()])
);
export const GridAnswer = z.record(
  z.string(),
  z.union([z.string(), z.number()])
);

const ReponseItemSchema = z.object({
  question: z.string().min(1, "Question ID is required"), // MongoDB ObjectId as string
  answer: z
    .union([TextAnswer, CheckBoxAnswer, GridAnswer])
    .optional()
    .refine((value) => value !== undefined, { message: "Answer is required" }),
});

export const formSubmissionSchema = z.object({
  form: z
    .string({ required_error: "form id is required" })
    .length(24, "Invalid form id"),
  responses: z.array(ReponseItemSchema),
});
