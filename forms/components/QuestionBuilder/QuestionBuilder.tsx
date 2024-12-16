import { useFormStore } from "@/stores/form-store";
import { colors } from "@/utils/colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  Pressable,
  Text,
  Touchable,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../common";
import { ReactNode, useState } from "react";
import { QuestionType } from "@/types/question.type";
import { QuestionTypeButton } from "./QuestionTypeButton";

type QuestionButtonConfig = {
  type: QuestionType;
  icon: "text" | "checkbox-marked-outline" | "grid";
};

const config: QuestionButtonConfig[] = [
  { type: "Text", icon: "text" },
  { type: "CheckBox", icon: "checkbox-marked-outline" },
  { type: "Grid", icon: "grid" },
];

export const QuestionBuilder = () => {
  const { currentForm } = useFormStore();
  const questions = currentForm?.questions;
  const [selectedQuestionType, setSelectedQuestionType] =
    useState<QuestionType>();
  return (
    <View>
      <View className="flex gap-3">
        {config.map((item, i) => (
          <QuestionTypeButton
            key={i}
            type={item.type}
            icon={
              <MaterialCommunityIcons
                name={item.icon}
                size={24}
                color={colors.textBase.rgb}
              />
            }
            onPress={() => setSelectedQuestionType(item.type)}
          />
        ))}
      </View>

      {/* {questions?.map((item) => (
        <View
          key={item.id}
          className="flex flex-row items-center justify-between w-full px-4 py-2 bg-muted"
        >
          <View>
            <Text>{item.title}</Text>
            <Text>{item.type} Question</Text>
          </View>
          <MaterialCommunityIcons name="delete-forever" size={24} />
        </View>
      ))} */}
    </View>
  );
};
