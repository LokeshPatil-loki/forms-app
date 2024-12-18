import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Label } from "@/components/common";
import { colors } from "@/utils/colors";

interface CheckboxQuestionProps {
  question: Question;
  control: Control<any>;
  error: string;
}

export const CheckboxQuestion = ({
  question,
  control,
  error,
}: CheckboxQuestionProps) => {
  if (question.type !== "CheckBox") return null;

  return (
    <View className="mb-4">
      <Label required={question.isRequired}>{question.title}</Label>

      <Controller
        control={control}
        name={`responses.${question.id}.answer`}
        defaultValue={{}} // Default value for checkboxes as an object
        rules={{
          required: {
            value: question.isRequired,
            message: "Please select at least one option",
          },
          validate: (value: Record<string, boolean>) => {
            // Custom validation: at least one checkbox should be checked
            if (!question.isRequired) return true;
            return (
              Object.values(value || {}).some((v) => v) ||
              "Please select at least one option"
            );
          },
        }}
        render={({
          field: { onChange, value = {} },
          fieldState: { error },
        }) => (
          <>
            {question.checkboxConfig?.options.map((option, index) => (
              <View key={index} className="flex-row items-center gap-2 mt-2">
                <Checkbox
                  value={value[option] || false}
                  color={
                    value[option] ? colors.accent.rgb : colors.textMuted.rgb
                  }
                  onValueChange={(checked) => {
                    // Update value for this checkbox
                    onChange({
                      ...value,
                      [option]: checked,
                    });
                  }}
                />
                <Text className="text-base text-text-base">{option}</Text>
              </View>
            ))}
            {error && (
              <Text className="mt-1 text-sm text-error">{error.message}</Text>
            )}
          </>
        )}
      />
    </View>
  );
};
