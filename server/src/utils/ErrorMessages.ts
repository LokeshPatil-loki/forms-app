export enum ErrorMessages {
  // Auth Errors
  UNAUTHORIZED = "You are not authorized to perform this action",
  INVALID_CREDENTIALS = "Invalid email or password",
  EMAIL_EXISTS = "Email already exists",
  USER_NOT_FOUND = "User not found",
  USER_CREATE_FAILED = "Cannot create user",
  // Form Errors
  FORM_NOT_FOUND = "Form not found",
  FORM_CREATE_FAILED = "Unable to create form",
  FORM_UPDATE_FAILED = "Unable to update form",
  FORM_DELETE_FAILED = "Unable to delete form",
  FORM_NOT_PUBLISHED = "This form is not published",
  FORM_PUBLISH_FAILED = "Unable to publish form",
  // Question Errors
  QUESTION_NOT_FOUND = "Question not found",
  QUESTION_CREATE_FAILED = "Unable to create question",
  QUESTION_UPDATE_FAILED = "Unable to update question",
  QUESTION_DELETE_FAILED = "Unable to delete question",
  POPULATE_QUESTIONS_FAILED = "Unable to populate questions",
  // Permission Errors
  FORM_PERMISSION_DENIED = "You don't have permission to access this form",
  QUESTION_PERMISSION_DENIED = "You don't have permission to modify this question",
  RESPONSE_PERMISSION_DENIED = "You don't have permission to access these responses",

  // Response Errors
  RESPONSE_SUBMIT_FAILED = "Unable to submit form response",
  INCOMPLETE_RESPONSE = "Please complete all required questions",
  RESPONSE_NOT_FOUND = "Response not found",

  // Validation Errors
  INVALID_FORM_ID = "Invalid form ID",
  INVALID_QUESTION_ID = "Invalid question ID",
  INVALID_INPUT = "Invalid input provided",

  // Generic Errors
  INTERNAL_SERVER_ERROR = "An internal server error occurred",
  BAD_REQUEST = "Bad request",
  UNAUTHORIZED_ACCESS = "Unauthorized access",
  FORBIDDEN = "Forbidden access",
}
