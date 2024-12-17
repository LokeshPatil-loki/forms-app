import { Button, ScreenView, TextInput } from "@/components/common";
import { CheckboxForm, GridQuestionForm } from "@/components/forms";
import { TextQuestionForm } from "@/components/forms/TextQuestionForm";
import { router, useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const AddQuestionScreen = () => {
  const { formId } = useLocalSearchParams();
  console.log({ formId });
  return (
    <ScreenView className="p-4 mt-2">
      <View className="flex flex-row items-center justify-between mb-4">
        <Text className="text-2xl font-bold font-display text-text-base">
          Add a Question
        </Text>
      </View>
      {/* <CheckboxForm /> */}
      <GridQuestionForm />
    </ScreenView>
  );
};

export default AddQuestionScreen;
