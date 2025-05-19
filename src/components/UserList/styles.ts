import { StyleSheet } from "react-native";
import { colors, typography } from "../../theme";

export const styles = StyleSheet.create({
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
