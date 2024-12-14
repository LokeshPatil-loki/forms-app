import { User } from "./auth";

export interface FormSubmission {
  id: string;
  form: string;
  respondent: User;
  responses: {
    question: string;
    answer: any;
  }[];
  submittedAt: string;
}
