import { View } from "react-native";
import { Button } from "@/components/common";
import { useLogout } from "@/hooks/use-auth";

export default function HomePage() {
  const logout = useLogout();

  return (
    <View className="justify-center flex-1 bg-fill">
      <Button onPress={logout} variant="secondary">
        Logout
      </Button>
    </View>
  );
}
