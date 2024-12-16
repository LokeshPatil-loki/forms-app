import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  View,
  View as ViewBase,
} from "react-native";

export const ScreenView = ({ children, className = "", ...props }) => {
  return (
    <SafeAreaView
      automaticallyAdjustKeyboardInsets={true}
      className={["bg-fill w-full h-full  ", className].join(" ")}
      {...props}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : "padding"}
        className="h-full p-4"
        enabled
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
