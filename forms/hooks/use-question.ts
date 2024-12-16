import { QuestionApi } from "@/lib/api/endpoints/question.api";
import { queryClient } from "@/lib/api/query-client";
import { useFormStore } from "@/stores/form-store";
import { ApiResponse } from "@/types/api/api-response.type";
import {
  QuestionDeletedResponse,
  QuestionResponse,
} from "@/types/api/question-response.type";
import { ValidationErrorResponse } from "@/types/error/validation-error-response.type";
import { CreateQuestionData } from "@/types/question.type";
import { handleApiError } from "@/utils/handle-api-error";
import { showAlert } from "@/utils/notify";
import { useMutation } from "@tanstack/react-query";

export const useAddQuestionToFrom = () => {
  const { addQuestion } = useFormStore();
  return useMutation<
    ApiResponse<QuestionResponse>,
    ValidationErrorResponse,
    { formId: string; data: CreateQuestionData }
  >({
    mutationFn: async ({ formId, data }) =>
      handleApiError(() => QuestionApi.addQuestionToFrom(formId, data)),
    onSuccess: (response: ApiResponse<QuestionResponse>) => {
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
      addQuestion(response.data.question);
    },
  });
};

export const useDeleteQuestion = (questionId: string) => {
  const { removeQuestion } = useFormStore();
  return useMutation<ApiResponse<QuestionDeletedResponse>, string>({
    mutationFn: () =>
      handleApiError(() => QuestionApi.deleteQuestion(questionId)),
    onSuccess: (response: ApiResponse<QuestionDeletedResponse>) => {
      const questionId = response.data.deletedId;
      removeQuestion(questionId);
      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });
      showAlert({ type: "success", title: "Question Deleted" });
    },
  });
};
