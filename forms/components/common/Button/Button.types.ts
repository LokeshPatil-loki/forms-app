import type { TouchableOpacityProps } from "react-native";

export type ButtonVariant =
  | "primary" // Main CTA buttons
  | "secondary" // Less prominent actions
  | "outline" // Bordered buttons
  | "ghost" // Text-only buttons
  | "danger" // Destructive actions
  | "success"; // Confirmation actions

export type ButtonSize =
  | "sm" // Small buttons
  | "md" // Medium (default) buttons
  | "lg" // Large buttons
  | "full"; // Full-width buttons

export interface ButtonProps extends Omit<TouchableOpacityProps, "disabled"> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
  loadingText?: string;
  onLongPress?: () => void;
}

export interface ButtonStyleConfig {
  baseStyle: string;
  variants: Record<ButtonVariant, string>;
  sizes: Record<ButtonSize, string>;
}

export interface ButtonStateStyles {
  default: string;
  pressed: string;
  disabled: string;
  loading: string;
}
