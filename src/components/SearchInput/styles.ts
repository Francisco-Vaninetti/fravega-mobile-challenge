import { StyleSheet } from "react-native";
import { spacing, typography } from "../../theme";
import { Colors } from "../../theme/colors"; // Import the type for better typing

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    container: {
      marginBottom: spacing.md,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.lightGray,
      borderRadius: spacing.sm,
      padding: spacing.sm,
      backgroundColor: colors.background,
      color: colors.text,
      ...typography.regular,
    },
  });
