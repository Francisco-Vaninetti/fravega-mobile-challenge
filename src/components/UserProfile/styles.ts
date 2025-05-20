import { StyleSheet } from "react-native";
import { Colors, spacing } from "../../theme";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      alignItems: "center",
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: spacing.md,
    },
    username: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: spacing.sm,
      color: colors.text,
    },
    bio: {
      fontSize: 16,
      fontStyle: "italic",
      textAlign: "center",
      marginBottom: spacing.sm,
      color: colors.text,
    },
    info: {
      fontSize: 16,
      marginBottom: spacing.md,
      color: colors.text,
    },
  });
