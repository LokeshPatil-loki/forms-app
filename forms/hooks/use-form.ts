import { formApi } from "@/lib/api/endpoints/form.api";
import { queryClient } from "@/lib/api/query-client";
import { useFormStore } from "@/stores/form-store";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  FormListResponse,
  SingleFormResponse,
} from "@/types/api/form-response.type";
import { ValidationErrorResponse } from "@/types/error/validation-error-response.type";
import { CreateFormData, UpdateFormData } from "@/types/form.type";
import { handleApiError } from "@/utils/handle-api-error";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetMyForms() {
  return useQuery<ApiResponse<FormListResponse>>({
    queryFn: async () => handleApiError(() => formApi.getMyForms()),
    queryKey: ["forms2"],
    // enabled: false,
  });
}

export function useGetForm(formId: string) {
  return useQuery<ApiResponse<SingleFormResponse>>({
    queryFn: async () => handleApiError(() => formApi.getForm(formId)),
    queryKey: ["forms", formId],
  });
}

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

export function useUpdateForm() {
  const { updateFormDetails } = useFormStore();
  return useMutation<
    ApiResponse<SingleFormResponse>,
    ValidationErrorResponse,
    { formId: string; data: UpdateFormData }
  >({
    mutationFn: async ({ formId, data }) =>
      handleApiError(() => formApi.updateForm(formId, data)),
    onSuccess: (response: ApiResponse<SingleFormResponse>) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
      updateFormDetails(response.data.form);
    },
  });
}

export function useDeleteForm() {
  return useMutation<
    ApiResponse<SingleFormResponse>,
    ValidationErrorResponse,
    string
  >({
    mutationFn: async (formId: string) =>
      handleApiError(() => formApi.deleteForm(formId)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
    },
  });
}
