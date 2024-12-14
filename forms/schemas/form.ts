import { z } from "zod";
import { questionSchema } from "./question";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  headerImgUrl: z.string().optional(),
  // questions: z.array(questionSchema),
});
