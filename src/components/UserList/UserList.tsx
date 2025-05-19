import React from "react";
import { ActivityIndicator, FlatList, Text, ViewStyle } from "react-native";
import { GitHubUser } from "@/src/context/FravoritesContext";
import { UserCard } from "../UserCard";
import { styles } from "./style";
import { colors } from "../../theme";

interface Props {
  users: GitHubUser[];
  loading: boolean;
  onUserPress: (user: GitHubUser) => void;
  contentContainerStyle?: ViewStyle;
}

export const UserList: React.FC<Props> = ({
  users,
  loading,
  onUserPress,
  contentContainerStyle,
}) => {
  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <UserCard user={item} onPress={() => onUserPress(item)} />
      )}
      contentContainerStyle={
        users.length === 0
          ? [styles.emptyList, contentContainerStyle]
          : contentContainerStyle
      }
      ListEmptyComponent={
        <Text style={styles.emptyText}>No se encontraron usuarios.</Text>
      }
    />
  );
};
