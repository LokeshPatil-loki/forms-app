import {
  checkboxQuestionSchema,
  questionSchema,
  textQuestionSchema,
} from "@/schemas/question.schema";
import { z } from "zod";

export type QuestionType = "Text" | "Grid" | "Checkbox";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  isRequired: boolean;
  imageUrl?: string;
}

export interface TextQuestion extends BaseQuestion {
  type: "Text";
  validation?: {
    minLength?: number;
    maxLength?: number;
    regex?: string;
  };
}

export interface GridQuestion extends BaseQuestion {
  type: "Grid";
  gridConfig: {
    rows: string[];
    columns: string[];
  };
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "Checkbox";
  checkboxConfig: {
    options: string[];
    selectMultiple: boolean;
  };
}

export type Question = TextQuestion | GridQuestion | CheckboxQuestion;

export type CreateQuestionData = z.infer<typeof questionSchema>;

export type CreateTextQuestionData = z.infer<typeof textQuestionSchema>;
export type UpdateTextQuestionData = Partial<CreateTextQuestionData>;

export type CreateCheckboxQuestionData = z.infer<typeof checkboxQuestionSchema>;
export type UpdateCheckboxQuestionData = Partial<CreateCheckboxQuestionData>;

export type UpdateQuestionData = Partial<CreateQuestionData>;
