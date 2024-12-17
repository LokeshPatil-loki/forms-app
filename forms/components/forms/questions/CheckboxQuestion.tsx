import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Label } from "@/components/common";

interface CheckboxQuestionProps {
  question: Question;
  control: Control<any>;
}

export const CheckboxQuestion = ({
  question,
  control,
}: CheckboxQuestionProps) => {
  if (question.type !== "CheckBox") return null;

  return (
    <View className="mb-4">
      <Label>{question.title}</Label>
      {question.checkboxConfig?.options.map((option, index) => (
        <Controller
          key={index}
          control={control}
          name={`responses.${index}.answer.${option}`} // Dynamic path
          render={({ field: { onChange, value } }) => (
            <View className="flex-row items-center gap-2 mt-2">
              <Checkbox value={value} onValueChange={onChange} />
              <Text>{option}</Text>
            </View>
          )}
        />
      ))}
    </View>
  );
};
