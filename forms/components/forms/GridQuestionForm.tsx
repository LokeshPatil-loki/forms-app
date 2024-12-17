import { Text, View } from "react-native";
import { Button, Label, TextInput } from "../common";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CreateGridQuestionData } from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { gridQuestionSchema } from "@/schemas/question.schema";
import { colors } from "@/utils/colors";
import { useEffect, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAddQuestionToFrom } from "@/hooks/use-question";
import { showAlert } from "@/utils/notify";
import Checkbox from "expo-checkbox";
import { ScrollView } from "react-native-gesture-handler";

interface GridQuestionFormProps {
  onCancel: () => void;
}

export const GridQuestionForm = ({ onCancel }: GridQuestionFormProps) => {
  const { formId } = useLocalSearchParams();
  const rowsScrollRef = useRef<ScrollView>(null);
  const columnsScrollRef = useRef<ScrollView>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGridQuestionData>({
    resolver: zodResolver(gridQuestionSchema),
    defaultValues: {
      title: "",
      type: "Grid",
      description: "",
      imageUrl: undefined,
      isRequired: false,
      gridConfig: {
        rows: [""],
        columns: [""],
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

  const rowsArray = useFieldArray({
    control,
    name: "gridConfig.rows",
  });

  const columnsArray = useFieldArray({
    control,
    name: "gridConfig.columns",
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
  }, [isPending, isSuccess, isError, error]);

  const onSubmit = (data: CreateGridQuestionData) => {
    console.log(data);
    addQuestionToForm({ formId: formId as string, data });
  };

  const addRow = () => {
    rowsArray.append("");
    rowsScrollRef.current?.scrollToEnd({ animated: true });
  };

  const addColumn = () => {
    columnsArray.append("");
    columnsScrollRef.current?.scrollToEnd({ animated: true });
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
      <View>
        <Label className="mb-3">Rows (Question):</Label>
        {errors.gridConfig?.rows?.message && (
          <Text className="mb-2 text-sm text-error">
            {errors.gridConfig.rows.message}
          </Text>
        )}
        <ScrollView
          ref={(ref) => {
            if (ref) {
              // @ts-ignore
              rowsScrollRef.current = ref;
            }
          }}
          className="max-h-40"
          showsVerticalScrollIndicator={true}
        >
          {rowsArray.fields.map((field, index) => (
            <View
              className="flex flex-row items-center justify-start gap-3 mb-3"
              key={field.id}
            >
              <Controller
                control={control}
                name={`gridConfig.rows.${index}`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="w-[87%]"
                    placeholder={`Row ${index + 1}`}
                    error={
                      typeof errors.gridConfig?.rows?.[index] === "object"
                        ? errors.gridConfig?.rows?.[index]?.message
                        : undefined
                    }
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <MaterialCommunityIcons
                onPress={() => rowsArray.remove(index)}
                name="delete-forever"
                size={30}
                color={colors.textMuted.rgb}
              />
            </View>
          ))}
        </ScrollView>
        <Button onPress={addRow} variant="ghost">
          Add Row
        </Button>
      </View>

      <View>
        <Label className="mb-3">Columns (Valid Answers):</Label>
        {errors.gridConfig?.columns?.message && (
          <Text className="mb-2 text-sm text-error">
            {errors.gridConfig.columns.message}
          </Text>
        )}
        <ScrollView
          ref={(ref) => {
            if (ref) {
              // @ts-ignore
              columnsScrollRef.current = ref;
            }
          }}
          className="max-h-40"
          showsVerticalScrollIndicator={true}
        >
          {columnsArray.fields.map((field, index) => (
            <View
              className="flex flex-row items-center justify-start gap-3 mb-3"
              key={field.id}
            >
              <Controller
                control={control}
                name={`gridConfig.columns.${index}`}
                render={({ field: { value, onChange } }) => (
                  <TextInput
                    className="w-[87%]"
                    placeholder={`Column ${index + 1}`}
                    error={
                      typeof errors.gridConfig?.columns?.[index] === "object"
                        ? errors.gridConfig?.columns?.[index]?.message
                        : undefined
                    }
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <MaterialCommunityIcons
                onPress={() => columnsArray.remove(index)}
                name="delete-forever"
                size={30}
                color={colors.textMuted.rgb}
              />
            </View>
          ))}
        </ScrollView>
        <Button onPress={addColumn} variant="ghost">
          Add Column
        </Button>
      </View>
      <View className="flex flex-row justify-end mt-2">
        <Button isDisabled={isPending} variant="ghost" onPress={onCancel}>
          Cancel
        </Button>
        <Button isDisabled={isPending} onPress={handleSubmit(onSubmit)}>
          Add Question
        </Button>
      </View>
    </View>
  );
};
