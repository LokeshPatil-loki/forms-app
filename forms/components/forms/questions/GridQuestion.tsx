import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";
import { Label } from "@/components/common";
import { colors } from "@/utils/colors";

interface GridQuestionProps {
  question: Question;
  control: Control<any>;
  error?: string;
}

export const GridQuestion = ({
  question,
  control,
  error,
}: GridQuestionProps) => {
  if (question.type !== "Grid") return null;

  return (
    <View className="mb-4">
      <Label required={question.isRequired}>{question.title}</Label>
      {question.description && (
        <Text className="font-mono text-sm text-text-base">
          {question.description}
        </Text>
      )}
      {error && <Text className="mt-1 text-sm text-error">{error}</Text>}
      <View className="mt-4">
        <View className="flex-row ml-32">
          {question.gridConfig?.columns.map((col, colIndex) => (
            <Text
              key={colIndex}
              className="flex-1 text-sm font-bold text-center text-text-base"
            >
              {col}
            </Text>
          ))}
        </View>

        <Controller
          control={control}
          name={`responses.${question.id}.answer`}
          rules={{
            required: {
              value: question.isRequired,
              message: "Please complete all rows",
            },
            validate: (value: Record<string, string>) => {
              if (!question.isRequired) return true;
              const hasAllRows = question.gridConfig?.rows.every(
                (_, index) => value?.[index]
              );
              return hasAllRows || "Please complete all rows";
            },
          }}
          defaultValue={{}}
          render={({ field: { onChange, value = {} } }) => (
            <>
              {question.gridConfig?.rows.map((row, rowIndex) => (
                <View key={rowIndex} className="flex-row items-center mt-4">
                  <Text className="w-32 text-sm font-bold text-text-base">
                    {row}
                  </Text>
                  <View className="flex-row flex-1">
                    {question.gridConfig?.columns.map((col, colIndex) => (
                      <View key={colIndex} className="items-center flex-1">
                        <Checkbox
                          color={
                            value[rowIndex] === col
                              ? colors.accent.rgb
                              : colors.textMuted.rgb
                          }
                          value={value[rowIndex] === col}
                          onValueChange={() => {
                            onChange({
                              ...value,
                              [rowIndex]: col,
                            });
                          }}
                        />
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </>
          )}
        />
      </View>
    </View>
  );
};
