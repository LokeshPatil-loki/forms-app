import { notify } from "react-native-notificated";
import { DefaultVariants } from "react-native-notificated/lib/typescript/defaultConfig/types";

interface ShowAlertProps {
  type: keyof DefaultVariants;
  title: string;
  description?: string;
}

export const showAlert = ({ type, title, description }: ShowAlertProps) => {
  return notify(type, {
    params: {
      title: title,
      description: description,
      style: {
        titleSize: 16,
        borderType: "accent",
      },
    },
  });
};
