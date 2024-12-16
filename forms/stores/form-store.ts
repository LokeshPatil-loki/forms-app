import { Form } from "@/types/form.type";
import { Question } from "@/types/question.type";
import { create, createStore } from "zustand";

interface FormState {
  currentForm: Form | null;
  setCurrentForm: (form: Form) => void;
  addQuestion: (quetion: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (questionid: string) => void;
  updateFormDetails: (details: Partial<Form>) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>()((set) => ({
  currentForm: null,
  setCurrentForm: (form: Form) => set({ currentForm: form }),
  addQuestion: (question: Question) => {
    set((state) => {
      if (!state.currentForm) return { currentForm: state.currentForm };

      return {
        currentForm: {
          ...state.currentForm,
          questions: [...(state.currentForm.questions || []), question],
        },
      };
    });
  },
  updateQuestion: (index: number, question: Question) => {
    set((state) => {
      if (!state.currentForm) return { currentForm: state.currentForm };
      const updatedQuestion = [...(state.currentForm.questions || [])];
      if (index > 0 && index < updatedQuestion.length) {
        updatedQuestion[index] = question;
      }
      return {
        currentForm: {
          ...state.currentForm,
          questions: updatedQuestion,
        },
      };
    });
  },
  removeQuestion: (questionid: string) => {
    set((state) => {
      if (!state.currentForm) return { currentForm: state.currentForm };

      const updatedQuestions = [...(state.currentForm.questions || [])].filter(
        (item) => item.id !== questionid
      );
      // if (index > 0 && index < updatedQuestions.length) {
      //   updatedQuestions.splice(index, 1);
      // }
      return {
        currentForm: {
          ...state.currentForm,
          questions: updatedQuestions,
        },
      };
    });
  },
  updateFormDetails: (details: Partial<Form>) => {
    set((state) => {
      if (!state.currentForm) return { currentForm: state.currentForm };

      return {
        currentForm: { ...state.currentForm, ...details },
      };
    });
  },
  reset: () => set({ currentForm: null }),
}));
