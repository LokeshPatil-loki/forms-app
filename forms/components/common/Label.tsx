import { Text, TextProps } from "react-native";

interface LabelProps extends TextProps {
  required?: boolean;
}

export const Label = ({
  children,
  className,
  required = false,

  ...rest
}: LabelProps) => (
  <Text className={`text-lg font-medium text-text-base ${className}`} {...rest}>
    {children}
  </Text>
);
