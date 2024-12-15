import { CreateFormData, Form, UpdateFormData } from "@/types/form.type";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  FormListResponse,
  SingleFormResponse,
} from "@/types/api/form-response.type";

export const formApi = {
  createForm: async (data: CreateFormData) => {
    const response = await apiClient.post<ApiResponse<SingleFormResponse>>(
      "/form",
      data
    );
    return response.data;
  },
  updateForm: async (formId: string, data: UpdateFormData) => {
    const response = await apiClient.patch<ApiResponse<SingleFormResponse>>(
      `/form/${formId}`,
      data
    );
    return response.data;
  },
  deleteForm: async (formId: string) => {
    const response = await apiClient.delete<ApiResponse<SingleFormResponse>>(
      `/form/${formId}`
    );
    return response.data;
  },
  getForm: async (formId: string) => {
    const response = await apiClient.get<ApiResponse<SingleFormResponse>>(
      `/form/${formId}`
    );
    return response.data;
  },
  getMyForms: async () => {
    const response = await apiClient.get<ApiResponse<FormListResponse>>(
      "/form"
    );
    return response.data;
  },
};
