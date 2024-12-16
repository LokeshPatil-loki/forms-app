import { Text, TextProps } from "react-native";

export const Label = ({ children, className, ...rest }: TextProps) => (
  <Text className={`text-lg font-medium text-text-base ${className}`} {...rest}>
    {children}
  </Text>
);
