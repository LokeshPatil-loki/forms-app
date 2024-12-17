import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/utils/colors";

export default function FormTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.fill.rgb,
        },
        tabBarActiveTintColor: colors.accent.rgb,
        tabBarInactiveTintColor: colors.textMuted.rgb,
      }}
    >
      <Tabs.Screen
        name="builder"
        options={{
          title: "Build Form",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="edit" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="preview"
        options={{
          title: "Preview",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="preview" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="responses"
        options={{
          title: "Responses",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="analytics" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
