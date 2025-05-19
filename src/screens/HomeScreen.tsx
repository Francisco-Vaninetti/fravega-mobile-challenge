import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";

import { colors, spacing, typography } from "../theme";
import { useGitHubUsers } from "../hooks/useGithubUsers";
import { UserCard } from "../components/UserCard";

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState("");
  const [searchTrigger, setSearchTrigger] = useState<string | undefined>();

  const { users, loading } = useGitHubUsers(searchTrigger);

  const handleSearch = () => {
    const trimmed = search.trim();
    setSearchTrigger(trimmed || undefined);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios de GitHub</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar usuario"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UserCard user={item} />}
          contentContainerStyle={
            users.length === 0 ? styles.emptyList : undefined
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No se encontraron usuarios.</Text>
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  searchContainer: {
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
