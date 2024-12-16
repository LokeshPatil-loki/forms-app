import { QuestionType } from "@/types/question.type";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";

interface QuestionTypeButtonProps {
  icon: ReactNode;
  type: QuestionType;
  onPress: () => void;
}

export const QuestionTypeButton = ({
  icon,
  type,
  onPress,
}: QuestionTypeButtonProps) => (
  <View className="flex flex-row justify-between p-4 py-3 bg-white">
    <View className="flex flex-row items-center gap-3">
      {icon}
      <Text className="text-lg text-text-base">{type} Question</Text>
    </View>
    <Pressable
      onPress={onPress}
      className="px-2 rounded-md bg-muted active:bg-gray-500/25"
    >
      <Text className="p-2 text-base font-bold rounded-lg font-roboto text-text-base">
        Add
      </Text>
    </Pressable>
  </View>
);
