import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { TextInput } from "../../common";

interface TextQuestionProps {
  question: Question;
  control: Control<any>;
  index: number;
}

export const TextQuestion = ({
  question,
  control,
  index,
}: TextQuestionProps) => {
  return (
    <Controller
      control={control}
      name={question.id}
      rules={{ required: question.isRequired }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextInput
            label={question.title}
            value={value}
            onChangeText={onChange}
            error={error?.message}
            placeholder="Enter your answer"
            required={question.isRequired}
          />
        );
      }}
    />
  );
};
