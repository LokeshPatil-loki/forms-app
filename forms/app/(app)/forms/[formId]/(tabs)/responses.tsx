import { useState, useMemo } from "react";
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

  const statistics = useMemo(() => {
    if (!responses) return null;

    const totalResponses = responses.data.responses.length;
    const averageResponseTime =
      responses.data.responses.reduce((acc, response) => {
        const responseTime = new Date(response.submittedAt).getTime();
        return acc + responseTime;
      }, 0) / totalResponses;

    return {
      totalResponses,
      averageResponseTime: new Date(averageResponseTime).toLocaleDateString(),
    };
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
      {statistics && (
        <View className="p-4 mb-4 bg-white rounded-lg shadow">
          <Text className="text-lg font-medium">Statistics</Text>
          <Text>Total Responses: {statistics.totalResponses}</Text>
          <Text>Average Response Time: {statistics.averageResponseTime}</Text>
        </View>
      )}
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
            {Object.entries(item.responses).map(([questionId, answer]) => (
              <View key={questionId} className="mt-2">
                <Text className="font-medium">Question ID: {questionId}</Text>
                <Text className="text-base">
                  Answer: {JSON.stringify(answer)}
                </Text>
              </View>
            ))}
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
              {Object.entries(selectedResponse.fields).map(([field, value]) => (
                <View key={field} className="mb-2">
                  <Text className="font-medium">{field}:</Text>
                  <Text className="text-base">{value}</Text>
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
