import { View, View as ViewBase } from "react-native";

export const ScreenView = ({ children, className = "", ...props }) => {
  return (
    <View
      className={["bg-fill w-full h-full p-4 ", className].join(" ")}
      {...props}
    >
      {children}
    </View>
  );
};
