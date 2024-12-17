import { Form } from "../form.type";

export interface FormListResponse {
  forms: Form[];
}

export interface SingleFormResponse {
  form: Form;
}

export interface FormPublishResponse {
  shareableLink: string;
}
