import { ScreenView, TextInput, Button } from "@/components/common";
import { ImagePicker } from "@/components/ImagePicker";
import { useFormStore } from "@/stores/form-store";
import { shadowStyle } from "@/styles";
import { colors } from "@/utils/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function FormBuilderScreen() {
  const { formId } = useLocalSearchParams();
  const { currentForm } = useFormStore();
  return (
    <ScreenView className="p-4 mt-2">
      <View>
        <Text className="text-2xl font-bold font-display text-text-base">
          Build Form
        </Text>
      </View>
      <View className="flex gap-5 mt-4 rounded-lg">
        <TextInput
          containerClassName=""
          label="Form Title"
          required
          value={currentForm?.title}
          placeholder="Enter form title"
        />
        <TextInput
          containerClassName=""
          value={currentForm?.description}
          label="Description"
          placeholder="Enter form title"
        />

        <View className="">
          <Text className="mb-2 text-lg font-medium text-text-base">
            Header Image
          </Text>
          <ImagePicker
            url={currentForm?.headerImageUrl || ""}
            onPress={() => {}}
          />
        </View>

        <Button>Save</Button>
      </View>
    </ScreenView>
  );
}
