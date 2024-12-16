import { QuestionApi } from "@/lib/api/endpoints/question.api";
import { useFormStore } from "@/stores/form-store";
import { ApiResponse } from "@/types/api/api-response.type";
import { QuestionResponse } from "@/types/api/question-response.type";
import { ValidationErrorResponse } from "@/types/error/validation-error-response.type";
import { CreateQuestionData } from "@/types/question.type";
import { handleApiError } from "@/utils/handle-api-error";
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
      addQuestion(response.data.question);
    },
  });
};
