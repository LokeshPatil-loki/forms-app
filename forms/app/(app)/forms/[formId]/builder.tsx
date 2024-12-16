import { ScreenView, TextInput, Button } from "@/components/common";
import { ImagePicker } from "@/components/ImagePicker";
import { useUpdateForm } from "@/hooks/use-form";
import { formSchema } from "@/schemas/form.schema";
import { useFormStore } from "@/stores/form-store";
import { shadowStyle } from "@/styles";
import { UpdateFormData } from "@/types/form.type";
import { colors } from "@/utils/colors";
import { showAlert } from "@/utils/notify";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";

export default function FormBuilderScreen() {
  const { formId } = useLocalSearchParams();
  const { currentForm } = useFormStore();
  const {
    mutate: updateForm,
    error,
    isSuccess,
    isPending,
    isError,
  } = useUpdateForm();
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(formSchema.partial()),
    defaultValues: {
      description: currentForm?.description,
      title: currentForm?.title,
      headerImageUrl: currentForm?.headerImageUrl,
    },
  });
  const onFormSave = async (data: UpdateFormData) => {
    console.log("pressed", data);
    updateForm({ formId: formId as string, data });
  };
  useEffect(() => {
    if (!isPending && isSuccess) {
      showAlert({ type: "success", title: "Form Updated" });
    } else if (!isPending && isError) {
      showAlert({
        type: "error",
        title: "Form Update Failed",
        description: error?.message,
      });
    }
  }, [isSuccess, isPending, isError, error]);
  return (
    <ScreenView className="p-4 mt-2">
      <View>
        <Text className="text-2xl font-bold font-display text-text-base">
          Build Form
        </Text>
      </View>
      <View className="flex gap-5 mt-4 rounded-lg">
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                containerClassName=""
                label="Form Title"
                required
                onChangeText={onChange}
                value={value}
                error={errors.title?.message}
                placeholder="Enter form title"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                containerClassName=""
                value={value}
                onChangeText={onChange}
                label="Description"
                error={errors.description?.message}
                placeholder="Enter form title"
              />
            );
          }}
        />

        <View className="">
          <Text className="mb-2 text-lg font-medium text-text-base">
            Header Image
          </Text>
          <ImagePicker
            url={currentForm?.headerImageUrl || ""}
            onImageUpdload={(newUrl) => setValue("headerImageUrl", newUrl)}
          />
        </View>

        <Button onPress={handleSubmit(onFormSave)}>Save</Button>
      </View>
    </ScreenView>
  );
}
