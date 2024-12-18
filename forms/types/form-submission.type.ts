import { z } from "zod";
import { User } from "./auth.type";
import { formSubmissionSchema } from "@/schemas/form-submission.schema";
import { Question } from "./question.type";

export interface FormSubmission {
  id: string;
  form: string;
  respondent: User;
  responses: {
    question: Question;
    answer: any;
  }[];
  submittedAt: string;
}

export type CreateFormSubmissionData = z.infer<typeof formSubmissionSchema>;
