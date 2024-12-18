import { useState, useMemo } from "react";
import { ScreenView } from "@/components/common";
import { useGetResponses } from "@/hooks/use-form-submission";
import { useLocalSearchParams } from "expo-router";
import { Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import { useFormStore } from "@/stores/form-store";

export default function FormResponsesScreen() {
  const { currentForm } = useFormStore();
  const formId = currentForm?.id;
  const {
    data: responses,
    isLoading,
    error,
  } = useGetResponses(formId as string);

  const [selectedResponse, setSelectedResponse] = useState(null);

  const groupedResponses = useMemo(() => {
    if (!responses) return [];
    return responses.data.responses.reduce((acc, response) => {
      const respondentId = response.respondent.id;
      if (!acc[respondentId]) {
        acc[respondentId] = {
          respondent: response.respondent,
          responses: [],
        };
      }
      acc[respondentId].responses.push(response);
      return acc;
    }, {});
  }, [responses]);

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
        data={Object.values(groupedResponses)}
        keyExtractor={(item) => item.respondent.id}
        renderItem={({ item }) => (
          <View className="p-4 mb-4 bg-white rounded-lg shadow">
            <Text className="text-lg font-medium">
              {item.respondent.firstName} {item.respondent.lastName} (
              {item.respondent.email})
            </Text>
            {item.responses.map((response) => (
              <TouchableOpacity
                key={response.id}
                onPress={() => handleResponseClick(response)}
                className="p-4 my-2 bg-white rounded-lg shadow"
              >
                <Text className="text-sm text-text-muted">
                  Submitted on:{" "}
                  {new Date(response.submittedAt).toLocaleDateString()}
                </Text>
                {response.responses.map(({ question, answer }) => {
                  console.log("question", question);
                  return (
                    <View key={question._id} className="mt-2">
                      <Text className="font-medium text-red-700">
                        {question.title}
                      </Text>
                      <Text className="text-base">
                        Answer: {JSON.stringify(answer)}
                      </Text>
                    </View>
                  );
                })}
              </TouchableOpacity>
            ))}
          </View>
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
              {selectedResponse.responses.map(({ question, answer }) => (
                <View key={question._id} className="mb-2">
                  <Text className="font-medium">{question.title}:</Text>
                  <Text className="text-base">{JSON.stringify(answer)}</Text>
                </View>
              ))}
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
