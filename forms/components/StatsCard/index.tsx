import { Text, View } from "react-native";
interface StatsCardProps {
  value: number | string;
  label: string;
  valueClassName?: string;
  labelClassName?: string;
}

export const StatsCard = ({
  value,
  label,
  valueClassName = "text-accent",
  labelClassName = "text-text-muted",
}: StatsCardProps) => {
  return (
    <View className="flex-1 p-4 mx-2 shadow rounded-xl bg-text-inverted">
      <Text className={`text-2xl font-bold ${valueClassName}`}>{value}</Text>
      <Text className={`text-sm ${labelClassName}`}>{label}</Text>
    </View>
  );
};
