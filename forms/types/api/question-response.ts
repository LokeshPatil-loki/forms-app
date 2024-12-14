import { Question } from "../question";

export interface QuestionResponse {
  question: Question;
}

export interface QuestionDeletedResponse {
  deleteId: string;
}
