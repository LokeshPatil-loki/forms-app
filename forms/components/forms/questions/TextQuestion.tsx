import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { TextInput } from "../../common";

interface TextQuestionProps {
  question: Question;
  control: Control<any>;
  index: number;
  error?: string;
}

export const TextQuestion = ({
  question,
  control,
  index,
  error,
}: TextQuestionProps) => {
  return (
    <Controller
      control={control}
      name={`responses.${question.id}.answer`}
      rules={{
        required: {
          value: question.isRequired,
          message: "This field is required",
        },
        ...(question.type === "Text" &&
          question.validation && {
            minLength: {
              value: question.validation.minLength || 0,
              message: `Minimum ${question.validation.minLength} characters required`,
            },
            maxLength: {
              value: question.validation.maxLength || 255,
              message: `Maximum ${question.validation.maxLength} characters allowed`,
            },
            pattern: question.validation.regex
              ? {
                  value: new RegExp(question.validation.regex),
                  message: "Invalid format",
                }
              : undefined,
          }),
      }}
      render={({ field: { onChange, value } }) => {
        return (
          <TextInput
            label={question.title}
            value={value}
            onChangeText={onChange}
            error={error}
            placeholder="Enter your answer"
            required={question.isRequired}
            multiline={true}
            numberOfLines={3}
          />
        );
      }}
    />
  );
};
