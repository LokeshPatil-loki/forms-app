export interface ValidationErrorResponse {
  message: string;
  errors: {
    message: string;
    field: string;
  }[];
}
