export type QuestionType = "Text" | "Grid" | "Checkbox";

export interface BaseQuestion {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  isRequired: boolean;
  imgUrl?: string;
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
