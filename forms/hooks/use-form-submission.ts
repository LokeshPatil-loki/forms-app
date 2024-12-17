import { formApi } from "@/lib/api/endpoints/form.api";
import { FormSubmissionApi } from "@/lib/api/endpoints/form-submission.api";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  FormSubmissionResponse,
  FormSubmissionResponseList,
} from "@/types/api/form-submission-response.type";
import { ValidationErrorResponse } from "@/types/error/validation-error-response.type";
import {
  CreateFormSubmissionData,
  FormSubmission,
} from "@/types/form-submission.type";
import { handleApiError } from "@/utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useSubmitForm = () => {
  return useMutation<
    ApiResponse<FormSubmissionResponse>,
    ValidationErrorResponse,
    CreateFormSubmissionData
  >({
    mutationFn: async (data) =>
      handleApiError(() => FormSubmissionApi.submitResponse(data)),
  });
};

export const useGetResponses = (formId: string) => {
  return useQuery<ApiResponse<FormSubmissionResponseList>>({
    queryFn: async () =>
      handleApiError(() => FormSubmissionApi.getSubmissionResponses(formId)),
    queryKey: ["form-submission"],
  });
};
