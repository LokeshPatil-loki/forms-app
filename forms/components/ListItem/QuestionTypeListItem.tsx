import { Question, QuestionType } from "@/types/question.type";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";
import { Text, View } from "react-native";
import { colors } from "@/utils/colors";
import { useDeleteQuestion } from "@/hooks/use-question";

const questionTypeIcon: Record<
  QuestionType,
  "text" | "checkbox-marked-outline" | "grid"
> = {
  Text: "text",
  CheckBox: "checkbox-marked-outline",
  Grid: "grid",
};

interface QuestionTypeListItemProps {
  question: Question;
}

function trimString(str: string) {
  if (str?.length > 35) {
    return str.slice(0, 32) + "...";
  }
  return str;
}

export const QuestionTypeListItem = ({
  question,
}: QuestionTypeListItemProps) => {
  const { mutate: deleteQuestion, isPending } = useDeleteQuestion(question.id);
  return (
    // <View className="flex-row items-center justify-between p-4 bg-white rounded-lg">
    <View className="flex-row items-center justify-between flex-1 p-4 rounded-lg shadow bg-text-inverted">
      <View className="flex-row items-center gap-3">
        <MaterialCommunityIcons
          name={questionTypeIcon[question.type]}
          size={24}
          color={colors.textBase.rgb}
        />
        <View>
          <Text className="text-lg text-text-base max-w-80">
            {trimString(question.title)}
          </Text>
          <Text className="text-sm text-text-muted">
            {question.type} Question
          </Text>
        </View>
      </View>
      {isPending ? (
        <Octicons
          className="animate-spin"
          name="x-circle"
          size={24}
          color={colors.error.rgb}
        />
      ) : (
        <MaterialIcons
          onPress={async () => {
            deleteQuestion();
          }}
          name="delete-outline"
          size={24}
          color={colors.error.rgb}
        />
      )}
    </View>
  );
};
