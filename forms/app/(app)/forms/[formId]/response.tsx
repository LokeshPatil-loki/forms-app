import { ScreenView } from "@/components/common";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { useGetForm } from "@/hooks/use-form";
import { useFormStore } from "@/stores/form-store";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function FormResponseScreen() {
  // const { currentForm } = useFormStore();
  const { formId } = useLocalSearchParams();
  const { data: currentForm } = useGetForm(formId as string);

  if (!currentForm) {
    return (
      <ScreenView className="items-center justify-center flex-1">
        <Text className="text-lg text-text-muted">No form selected</Text>
      </ScreenView>
    );
  }

  return (
    <ScreenView>
      <FormRenderer form={currentForm.data.form} isPreview={false} />
    </ScreenView>
  );
}
