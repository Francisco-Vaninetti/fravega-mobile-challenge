import { StyleSheet } from "react-native";
import { Colors, typography } from "../../theme";

export const getStyles = (colors: Colors) =>
  StyleSheet.create({
    emptyList: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      ...typography.regular,
      color: colors.gray,
    },
  });
