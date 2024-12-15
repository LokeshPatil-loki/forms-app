import {
  CreateFormSubmissionData,
  FormSubmission,
} from "@/types/form-submission.type";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  FormSubmissionResponse,
  FormSubmissionResponseList,
} from "@/types/api/form-submission-response.type";

export const FormSubmissionApi = {
  submitResponse: async (formSubmission: CreateFormSubmissionData) => {
    const response = await apiClient.post<ApiResponse<FormSubmissionResponse>>(
      "/response",
      formSubmission
    );
    return response.data;
  },
  getSubmissionResponses: async (formId: string) => {
    const response = await apiClient.post<
      ApiResponse<FormSubmissionResponseList>
    >(`/response/form/${formId}`);
    return response.data;
  },
};
