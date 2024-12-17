import { Text, View } from "react-native";
import { Button, Label, TextInput } from "../common";
import { router, useLocalSearchParams } from "expo-router";
import { CreateCheckboxQuestionData } from "@/types/question.type";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { checkboxQuestionSchema } from "@/schemas/question.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Checkbox from "expo-checkbox";
import { colors } from "@/utils/colors";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAddQuestionToFrom } from "@/hooks/use-question";
import { showAlert } from "@/utils/notify";

interface CheckBoxFormProps {
  onCancel: () => void;
}

export const CheckboxForm = ({ onCancel }: CheckBoxFormProps) => {
  const { formId } = useLocalSearchParams();
  const {
    mutate: addQuestionToForm,
    isPending,
    error,
    isError,
    isSuccess,
  } = useAddQuestionToFrom();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCheckboxQuestionData>({
    resolver: zodResolver(checkboxQuestionSchema),
    defaultValues: {
      title: "",
      type: "CheckBox",
      description: "",
      imageUrl: undefined,
      isRequired: false,
      checkboxConfig: {
        options: [{ id: "1", value: "" }],
        selectMultiple: false,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "checkboxConfig.options",
  });

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

  const onSubmit = (data: CreateCheckboxQuestionData) => {
    addQuestionToForm({ formId: formId as string, data });
  };
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
      <Controller
        control={control}
        name="checkboxConfig.selectMultiple"
        render={({ field: { value, onChange } }) => (
          <View className="flex flex-row items-center gap-2">
            <Checkbox
              onValueChange={onChange}
              color={value ? colors.accent.rgb : colors.textBase.rgb}
              value={value}
            />
            <Label>Allow Multiple Selection</Label>
          </View>
        )}
      />
      <View>
        <Label className="mb-3">Options:</Label>
        {fields.map((field, index) => (
          <View
            className="flex flex-row items-center justify-start gap-3 mb-3"
            key={field.id}
          >
            <Controller
              control={control}
              name={`checkboxConfig.options.${index}.value`} // Bind to the value property
              render={({ field: { value, onChange } }) => (
                <TextInput
                  className="w-[87%]"
                  placeholder={`Option ${index + 1}`}
                  error={
                    errors.checkboxConfig?.options?.[index]?.value?.message
                  }
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            <MaterialCommunityIcons
              onPress={() => remove(index)} // Remove the option
              name="delete-forever"
              size={30}
              color={colors.textMuted.rgb}
            />
          </View>
        ))}
        <Button
          onPress={
            () => append({ id: String(fields.length + 1), value: "" }) // Append a new option
          }
          variant="ghost"
        >
          Add an Option
        </Button>
      </View>

      <View className="flex flex-row justify-end mt-2">
        <Button variant="ghost" onPress={onCancel}>
          Cancel
        </Button>
        <Button onPress={handleSubmit(onSubmit)}>Add Question</Button>
      </View>
    </View>
  );
};
