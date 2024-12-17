import { ScreenView } from "@/components/common";
import { FormRenderer } from "@/components/forms/FormRenderer";
import { useFormStore } from "@/stores/form-store";
import { Text } from "react-native";

export default function FormPreviewScreen() {
  const { currentForm } = useFormStore();

  if (!currentForm) {
    return (
      <ScreenView className="items-center justify-center flex-1">
        <Text className="text-lg text-text-muted">No form selected</Text>
      </ScreenView>
    );
  }

  return (
    <ScreenView>
      <FormRenderer form={currentForm} isPreview={true} />
    </ScreenView>
  );
}
