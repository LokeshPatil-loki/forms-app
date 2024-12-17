import { Question } from "@/types/question.type";
import { Controller, Control } from "react-hook-form";
import { Text, View } from "react-native";
import { Checkbox } from "expo-checkbox";

interface GridQuestionProps {
  question: Question;
  control: Control<any>;
}

export const GridQuestion = ({ question, control }: GridQuestionProps) => {
  if (question.type !== "Grid") return null;

  return (
    <View className="mb-4">
      <Text className="mb-2 text-base font-medium text-text-base">
        {question.title}
      </Text>
      <View className="mt-4">
        <View className="flex-row ml-32">
          {question.gridConfig?.columns.map((col, colIndex) => (
            <Text
              key={colIndex}
              className="flex-1 text-sm text-center text-text-base"
            >
              {col}
            </Text>
          ))}
        </View>

        {question.gridConfig?.rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row items-center mt-4">
            <Text className="w-32 text-sm text-text-base">{row}</Text>

            <View className="flex-row flex-1">
              {question.gridConfig?.columns.map((col, colIndex) => (
                <Controller
                  key={`${rowIndex}-${colIndex}`}
                  control={control}
                  name={`${question.id}.${rowIndex}`}
                  render={({ field: { onChange, value } }) => (
                    <View className="items-center flex-1">
                      <Checkbox
                        value={value === col}
                        onValueChange={() => onChange(col)}
                      />
                    </View>
                  )}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
