import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import { ButtonProps, ButtonStyleConfig } from "./Button.types";

const buttonStyles: ButtonStyleConfig = {
  baseStyle: "rounded-lg flex-row items-center justify-center",
  variants: {
    primary: "bg-accent active:bg-accent-hover active:text-text-base",
    secondary: "bg-button-muted active:bg-muted",
    outline: "border border-accent active:bg-accent/10",
    ghost: "bg-transparent active:bg-accent/10",
    danger: "bg-status-error active:opacity-90",
    success: "bg-status-success active:opacity-90",
  },
  sizes: {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
    full: "px-4 py-3 w-full",
  },
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  isDisabled = false,
  leftIcon,
  rightIcon,
  className = "",
  loadingText,
  onPress,
  ...props
}: ButtonProps) => {
  const getButtonStyles = () => {
    const styles = [
      buttonStyles.baseStyle,
      buttonStyles.variants[variant],
      buttonStyles.sizes[size],
      isDisabled && "opacity-50",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return styles;
  };

  const getTextStyles = () => {
    const baseTextStyles = "font-semibold text-center";
    const variantTextStyles = {
      primary: "text-text-inverted  ",
      secondary: "text-text-base",
      outline: "text-accent",
      ghost: "text-accent",
      danger: "text-text-inverted",
      success: "text-text-inverted",
    };

    return `${baseTextStyles} ${variantTextStyles[variant]}`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled || isLoading}
      className={getButtonStyles()}
      {...props}
    >
      {leftIcon && !isLoading && <View className="mr-2">{leftIcon}</View>}

      <Text className={getTextStyles()}>
        {isLoading ? loadingText || children : children}
      </Text>

      {rightIcon && !isLoading && <View className="ml-2">{rightIcon}</View>}
    </TouchableOpacity>
  );
};
