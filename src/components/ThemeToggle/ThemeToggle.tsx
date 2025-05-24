import { useTheme } from "@/src/context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export const ThemeToggle = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        paddingHorizontal: 6,
        paddingVertical: 4,
      }}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Feather name={isDark ? "sun" : "moon"} size={22} color={colors.text} />
    </TouchableOpacity>
  );
};
