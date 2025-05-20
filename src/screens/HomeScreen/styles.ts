import { StyleSheet } from "react-native";
import { typography, spacing, Colors } from "../../theme";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: spacing.md,
    },
    title: {
      ...typography.title,
      marginBottom: spacing.md,
      color: colors.text,
    },
  });
