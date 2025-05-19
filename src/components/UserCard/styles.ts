import { StyleSheet } from "react-native";
import { spacing, colors } from "../../theme";

export const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    marginVertical: spacing.xs,
    backgroundColor: colors.backgroundLight,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  login: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.text,
  },
  favorite: {
    marginTop: 4,
    fontSize: 14,
    color: colors.primary,
  },
});
