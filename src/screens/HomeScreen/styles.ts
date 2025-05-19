import { StyleSheet } from "react-native";
import { colors, typography, spacing } from "../../theme";

export const styles = StyleSheet.create({
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
