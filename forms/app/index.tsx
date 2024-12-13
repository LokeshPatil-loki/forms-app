import { Button } from "@/components/common/Button/Button";
import { useAuthStore } from "@/stores/auth-store";
import { Text, View } from "react-native";

const HomePage = () => {
  // const { clearAuth } = useAuthStore();
  // clearAuth();
  return (
    <View
      style={{ display: "flex", height: "100%" }}
      className="items-center justify-center bg-fill"
    >
      <Button variant="primary" size="md" className="active:bg-button-accent ">
        Click Me
      </Button>
    </View>
  );
};

export default HomePage;
