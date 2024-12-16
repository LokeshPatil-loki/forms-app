import { MaterialIcons } from "@expo/vector-icons";
import { View, Text } from "react-native";

const Loading = ({ loadingText }: { loadingText: string }) => (
  <View className="items-center justify-center flex-1">
    <MaterialIcons
      name="hourglass-empty"
      size={32}
      color="var(--color-text-muted)"
      className="animate-spin"
    />
    <Text className="mt-2 text-text-muted">{loadingText}</Text>
  </View>
);

export default Loading;
