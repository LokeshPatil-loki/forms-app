import { View } from "react-native";
import { Button } from "../common";

export const GridQuestionForm = () => {
  return (
    <View className="flex gap-4 p-4 rounded-lg shadow-md bg-fill shadow-black/40">
      <View className="flex flex-row justify-end mt-2">
        <Button
          // isDisabled={isPending}
          variant="ghost"
          // onPress={() => router.back()}
        >
          Cancel
        </Button>
        <Button
        // isDisabled={isPending}
        // onPress={handleSubmit(onSubmit)}
        >
          Add Question
        </Button>
      </View>
    </View>
  );
};
