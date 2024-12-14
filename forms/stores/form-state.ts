import { Form } from "@/types/form";
import { Question } from "@/types/question";

interface FormState {
  currentForm: Form | null;
  setCurrentForm: (form: Form) => void;
  addQuestion: (quetion: Question) => void;
  updateQuestion: (index: number, question: Question) => void;
  removeQuestion: (index: number) => void;
  updateFormDetails: (details: Partial<Form>) => void;
  reset: () => void;
}
