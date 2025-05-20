import { StyleSheet } from "react-native";
import { Colors, spacing, typography } from "../../theme";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    card: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.md,
      backgroundColor: colors.card,
      borderRadius: spacing.sm,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: colors.gray,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: spacing.md,
    },
    username: {
      ...typography.regular,
      color: colors.text,
    },
  });
