import { formApi } from "@/lib/api/endpoints/form";
import { queryClient } from "@/lib/api/query-client";
import { useFormStore } from "@/stores/form-state";
import { ApiResponse } from "@/types/api/api-response";
import {
  FormListResponse,
  SingleFormResponse,
} from "@/types/api/form-response";
import { ValidationErrorResponse } from "@/types/error/validation-error-response";
import { CreateFormData } from "@/types/form";
import { handleApiError } from "@/utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateForm() {
  const { setCurrentForm } = useFormStore();
  return useMutation<
    ApiResponse<SingleFormResponse>,
    ValidationErrorResponse,
    CreateFormData
  >({
    mutationFn: async (data: CreateFormData) =>
      handleApiError(() => formApi.createForm(data)),
    onSuccess: (response: ApiResponse<SingleFormResponse>) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
      setCurrentForm(response.data.form);
    },
  });
}

export function useGetMyForms() {
  return useQuery<ApiResponse<FormListResponse>>({
    queryFn: async () => handleApiError(() => formApi.getMyForms()),
    queryKey: ["forms"],
  });
}
