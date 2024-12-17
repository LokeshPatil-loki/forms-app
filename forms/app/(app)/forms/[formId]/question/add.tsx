import { Button, ScreenView, TextInput } from "@/components/common";
import { CheckboxForm, GridQuestionForm } from "@/components/forms";
import { TextQuestionForm } from "@/components/forms/TextQuestionForm";
import { QuestionTypeButton } from "@/components/QuestionBuilder/QuestionTypeButton";
import { QuestionType } from "@/types/question.type";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";

const AddQuestionScreen = () => {
  const { formId } = useLocalSearchParams();

  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);

  const onCancel = () => {
    setSelectedType(null);
  };

  const SelectedForm = () => {
    switch (selectedType) {
      case "Text":
        return <TextQuestionForm onCancel={onCancel} />;
      case "CheckBox":
        return <CheckboxForm onCancel={onCancel} />;
      case "Grid":
        return <GridQuestionForm onCancel={onCancel} />;
    }
  };

  return (
    <ScreenView className="p-4 mt-2">
      <View className="flex flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold font-display text-text-base">
          Add a Question
        </Text>
      </View>
      {/* <CheckboxForm /> */}
      {/* <GridQuestionForm /> */}
      {!selectedType ? (
        <View>
          <Text className="mb-2 text-xl font-bold text-text-base">
            Select a Question Type
          </Text>
          <View className="flex justify-center gap-3 mt-2">
            <QuestionTypeButton
              type="Text"
              icon="text"
              onPress={() => setSelectedType("Text")}
            />
            <QuestionTypeButton
              type="CheckBox"
              icon="checkbox-marked-outline"
              onPress={() => setSelectedType("CheckBox")}
            />
            <QuestionTypeButton
              type="Grid"
              icon="grid"
              onPress={() => setSelectedType("Grid")}
            />
          </View>
        </View>
      ) : (
        <SelectedForm />
      )}
    </ScreenView>
  );
};

export default AddQuestionScreen;
