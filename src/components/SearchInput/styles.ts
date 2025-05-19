import { StyleSheet } from "react-native";
import { spacing, colors, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: spacing.sm,
    padding: spacing.sm,
    backgroundColor: "#fff",
    ...typography.regular,
  },
});
