import { QuestionType } from "@/types/question.type";
import { colors } from "@/utils/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Pressable, Text } from "react-native";
import { View } from "react-native";

interface QuestionTypeButtonProps {
  icon: "text" | "checkbox-marked-outline" | "grid";
  type: QuestionType;
  onPress: () => void;
}

export const QuestionTypeButton = ({
  icon,
  type,
  onPress,
}: QuestionTypeButtonProps) => (
  <View className="flex flex-row justify-between p-4 py-3 bg-white rounded-lg shadow-md ">
    <View className="flex flex-row items-center gap-3">
      <MaterialCommunityIcons name={icon} size={24} color={colors.accent.rgb} />
      <Text className="text-lg font-semibold text-accent">{type} Question</Text>
    </View>
    <Pressable
      onPress={onPress}
      className="px-2 border rounded-md bg-fill border-accent active:bg-gray-500/25"
    >
      <Text className="p-2 text-base font-bold rounded-lg font-roboto text-accent">
        Add
      </Text>
    </Pressable>
  </View>
);
