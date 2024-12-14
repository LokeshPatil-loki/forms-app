import { FormSubmission } from "@/types/form-submission";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api/api-response";
import {
  FormSubmissionResponse,
  FormSubmissionResponseList,
} from "@/types/api/form-submission-response";

export const FormSubmissionApi = {
  submitResponse: async (formSubmission: FormSubmission) => {
    const response = await apiClient.post<ApiResponse<FormSubmissionResponse>>(
      "/response",
      formSubmission
    );
    return response;
  },
  getSubmissionResponses: async (formId: string) => {
    const response = await apiClient.post<
      ApiResponse<FormSubmissionResponseList>
    >(`/response/form/${formId}`);
    return response;
  },
};
