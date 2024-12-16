import { Text, View } from "react-native";
import { Button, Label, TextInput } from "../common";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  CreateQuestionData,
  CreateTextQuestionData,
} from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { questionSchema, textQuestionSchema } from "@/schemas/question.schema";
import { Checkbox } from "expo-checkbox";
import { colors } from "@/utils/colors";
import { useEffect, useState } from "react";
import { useAddQuestionToFrom } from "@/hooks/use-question";
import { showAlert } from "@/utils/notify";

export const TextQuestionForm = () => {
  const { formId } = useLocalSearchParams();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTextQuestionData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: "",
      type: "Text",
      description: "",
      imageUrl: undefined,
      isRequired: false,
      validation: {
        minLength: 0,
        maxLength: 255,
      },
    },
  });

  const {
    mutate: addQuestionToForm,
    isPending,
    error,
    isError,
    isSuccess,
  } = useAddQuestionToFrom();

  const onSubmit = (data: CreateQuestionData) => {
    const id = formId as string;
    addQuestionToForm({ formId: id, data });
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      showAlert({ type: "success", title: "Successfully added question" });
      router.back();
    } else if (!isPending && isError) {
      showAlert({
        type: "error",
        title: "Unable to add question",
        description: error.message,
      });
      console.error(error);
    }
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
      <View className="flex flex-row items-center justify-between gap-2">
        <Controller
          control={control}
          name="validation.minLength"
          render={({ field: { value, onChange } }) => (
            <TextInput
              className="w-[43%]"
              keyboardType="number-pad"
              value={value?.toString()}
              error={errors.validation?.minLength?.message}
              onChangeText={(text) => onChange(Number(text))}
              label="Min Length"
            />
          )}
        />
        <Controller
          control={control}
          name="validation.maxLength"
          render={({ field: { value, onChange } }) => (
            <TextInput
              className="w-[43%]"
              keyboardType="number-pad"
              value={value?.toString()}
              error={errors.validation?.maxLength?.message}
              onChangeText={(text) => onChange(Number(text))}
              label="Max Length"
            />
          )}
        />
      </View>
      <View className="flex flex-row justify-end mt-2">
        <Button
          isDisabled={isPending}
          variant="ghost"
          onPress={() => router.back()}
        >
          Cancel
        </Button>
        <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
          Add Question
        </Button>
      </View>
    </View>
  );
};
