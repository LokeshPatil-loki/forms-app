import { z } from "zod";

const ReponseItemSchema = z.object({
  question: z.string().min(1, "Question ID is required"), // MongoDB ObjectId as string
  answer: z
    .union([
      z.string(),
      z.number(),
      z.boolean(),
      z.array(z.any()),
      z.record(z.any()),
    ])
    .optional()
    .refine((value) => value !== undefined, { message: "Answer is required" }),
});

const ResponseItemsSchema = z.array(ReponseItemSchema);
export type ResponseItemsType = z.infer<typeof ResponseItemsSchema>;
export type ResponseItemType = z.infer<typeof ReponseItemSchema>;
export const BaseResponseSchema = z.object({
  form: z
    .string({ required_error: "Form ID is requried" })
    .length(24, "Invalid Form ID"),
  // respondent: z
  //   .string({ required_error: "Respondent ID is requried" })
  //   .length(24, "Invalid Respondent ID"),
  responses: z.array(ReponseItemSchema),
  submittedAt: z.date().default(new Date()),
});
