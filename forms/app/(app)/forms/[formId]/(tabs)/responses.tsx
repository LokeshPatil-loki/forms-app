import { useState } from "react";
import { ScreenView } from "@/components/common";
import { useGetResponses } from "@/hooks/use-form-submission";
import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, TouchableOpacity, Modal } from "react-native";

export default function FormResponsesScreen() {
  const { formId } = useLocalSearchParams();
  const {
    data: responses,
    isLoading,
    error,
  } = useGetResponses(formId as string);
  const [selectedResponse, setSelectedResponse] = useState(null);

  if (isLoading) {
    return (
      <ScreenView className="items-center justify-center flex-1">
        <Text className="text-lg text-text-muted">Loading responses...</Text>
      </ScreenView>
    );
  }

  if (error || !responses) {
    return (
      <ScreenView className="items-center justify-center flex-1">
        <Text className="text-lg text-text-muted">
          Failed to load responses
        </Text>
      </ScreenView>
    );
  }

  const handleResponseClick = (response) => {
    setSelectedResponse(response);
  };

  const closeModal = () => {
    setSelectedResponse(null);
  };

  return (
    <ScreenView className="p-4">
      <Text className="mb-4 text-2xl font-bold font-display text-text-base">
        Form Responses
      </Text>
      <FlatList
        data={responses.data.responses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleResponseClick(item)}
            className="p-4 my-2 bg-white rounded-lg shadow"
          >
            <Text className="text-lg font-medium">{item.respondent.email}</Text>
            <Text className="text-sm text-text-muted">
              Submitted on: {new Date(item.submittedAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selectedResponse && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={!!selectedResponse}
          onRequestClose={closeModal}
        >
          <View className="items-center justify-center flex-1 bg-black/50">
            <View className="w-11/12 p-6 bg-white rounded-lg shadow-lg">
              <Text className="mb-4 text-xl font-bold">Response Details</Text>
              {/* Display detailed response data here */}
              <Text className="text-base">
                Response ID: {selectedResponse.id}
              </Text>
              <Text className="text-base">
                Submitted on:{" "}
                {new Date(selectedResponse.submittedAt).toLocaleDateString()}
              </Text>
              {/* Add more detailed fields as needed */}
              <TouchableOpacity onPress={closeModal} className="mt-4">
                <Text className="text-accent">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScreenView>
  );
}
