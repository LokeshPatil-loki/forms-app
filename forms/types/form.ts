import { Question } from "./question";
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
