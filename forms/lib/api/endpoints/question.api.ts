import { questionSchema } from "@/schemas/question.schema";
import { z } from "zod";
import { apiClient } from "../client";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  QuestionDeletedResponse,
  QuestionResponse,
} from "@/types/api/question-response.type";

export const QuestionApi = {
  addQuestionToFrom: async (
    formId: string,
    question: z.infer<typeof questionSchema>
  ) => {
    const response = await apiClient.post<ApiResponse<QuestionResponse>>(
      `/question/form/${formId}`
    );
    return response.data;
  },
  getQuestion: async (questionId: string) => {
    const response = await apiClient.get<ApiResponse<QuestionResponse>>(
      `/question/${questionId}`
    );
    return response.data;
  },
  updateQuestion: async (questionId: string) => {
    const response = await apiClient.patch<ApiResponse<QuestionResponse>>(
      `/question/${questionId}`
    );
    return response.data;
  },
  deleteQuestion: async (questionId: string) => {
    const response = await apiClient.delete<
      ApiResponse<QuestionDeletedResponse>
    >(`/question/${questionId}`);
    return response.data;
  },
};
