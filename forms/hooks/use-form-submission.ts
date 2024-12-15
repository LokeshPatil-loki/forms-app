import { formApi } from "@/lib/api/endpoints/form";
import { FormSubmissionApi } from "@/lib/api/endpoints/form-submission";
import { ApiResponse } from "@/types/api/api-response";
import {
  FormSubmissionResponse,
  FormSubmissionResponseList,
} from "@/types/api/form-submission-response";
import { ValidationErrorResponse } from "@/types/error/validation-error-response";
import {
  CreateFormSubmissionData,
  FormSubmission,
} from "@/types/form-submission";
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
  useQuery<ApiResponse<FormSubmissionResponseList>>({
    queryFn: async () =>
      handleApiError(() => FormSubmissionApi.getSubmissionResponses(formId)),
    queryKey: ["form-submission"],
  });
};
