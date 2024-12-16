import { Text, View } from "react-native";
import { Button, Label, TextInput } from "../common";
import { useLocalSearchParams } from "expo-router";
import { CreateCheckboxQuestionData } from "@/types/question.type";
import { Controller, useForm } from "react-hook-form";
import { checkboxQuestionSchema } from "@/schemas/question.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { colors } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const CheckboxForm = () => {
  const { formId } = useLocalSearchParams();
  const [count, setCount] = useState(0);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCheckboxQuestionData>({
    resolver: zodResolver(checkboxQuestionSchema),
    defaultValues: {
      title: "",
      type: "Checkbox",
      description: "",
      imageUrl: undefined,
      isRequired: false,
      checkboxConfig: {
        options: [],
        selectMultiple: false,
      },
    },
  });
  return (
    <View className="flex gap-4 p-4 rounded-lg shadow-md bg-fill shadow-black/40">
      <Controller
        control={control}
        name="title"
        render={({ field: { value, onChange } }) => (
          <TextInput
            multiline
            numberOfLines={5}
            label="Question Text"
            placeholder="Write the question"
            value={value}
            onChangeText={onChange}
            error={errors.title?.message}
            required
          />
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            multiline
            onChangeText={onChange}
            placeholder="Write the description for question (Optional)"
            numberOfLines={5}
            error={errors.description?.message}
            label="Description"
          />
        )}
      />
      <Controller
        control={control}
        name="isRequired"
        render={({ field: { value, onChange } }) => (
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              onValueChange={onChange}
              color={value ? colors.accent.rgb : colors.textBase.rgb}
              value={value}
            />
            <Label>Required</Label>
          </View>
        )}
      />
      <View>
        <Label className="mb-3">Options:</Label>
        {Array.from(Array(count).keys()).map((_) => (
          <View
            className="flex flex-row items-center justify-start gap-3 mb-3"
            key={_}
          >
            <TextInput className="w-[87%]" placeholder={`Option ${_ + 1}`} />
            <MaterialCommunityIcons
              onPress={() => {
                setCount(count - 1);
              }}
              name="delete-forever"
              size={30}
              color={colors.textMuted.rgb}
            />
          </View>
        ))}
        <Button onPress={() => setCount(count + 1)} variant="ghost">
          Add an Option
        </Button>
      </View>
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
