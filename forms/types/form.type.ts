import { z } from "zod";
import { Question } from "./question.type";
import { formSchema } from "@/schemas/form.schema";
export interface Form {
  id: string;
  title: string;
  description?: string;
  headerImgUrl?: string;
  questions: Question[];
  shareableLink: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateFormData = z.infer<typeof formSchema>;
export type UpdateFormData = Partial<CreateFormData>;
