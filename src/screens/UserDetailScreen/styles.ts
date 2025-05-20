import { Colors } from "@/src/theme";
import { StyleSheet } from "react-native";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    errorText: {
      fontSize: 16,
      color: colors.danger,
    },
  });
