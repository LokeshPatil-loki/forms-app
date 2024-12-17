import { ScreenView } from "@/components/common";
import { useGetResponses } from "@/hooks/use-form-submission";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function FormResponsesScreen() {
  const { formId } = useLocalSearchParams();
  // const { data: responses, isLoading } = useGetResponses(formId as string);

  // if (isLoading) {
  //   return (
  //     <ScreenView className="items-center justify-center flex-1">
  //       <Text className="text-lg text-text-muted">Loading responses...</Text>
  //     </ScreenView>
  //   );
  // }

  return (
    <ScreenView className="p-4">
      <Text className="text-2xl font-bold font-display text-text-base">
        Form Responses
      </Text>
      {/* Add responses list components here */}
    </ScreenView>
  );
}
