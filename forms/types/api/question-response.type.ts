import { Question } from "../question.type";

export interface QuestionResponse {
  question: Question;
}

export interface QuestionDeletedResponse {
  deleteId: string;
}
