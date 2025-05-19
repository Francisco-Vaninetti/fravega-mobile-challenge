import React from "react";
import {
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useGitHubUserDetail } from "../hooks/useGiHubUserDetail";

import { colors, spacing } from "../theme";
import { useFavorites } from "../context/FravoritesContext";

type DetailRouteParam = {
  Detail: { username: string };
};

export const UserDetailScreen = () => {
  const route = useRoute<RouteProp<DetailRouteParam, "Detail">>();
  const { username } = route.params;

  const { user, loading } = useGitHubUserDetail(username);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading || !user) {
    return <ActivityIndicator size="large" color={colors.primary} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.username}>{user.name ?? user.login}</Text>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      <Text style={styles.info}>Repos públicos: {user.public_repos}</Text>
      <Button
        title={isFavorite(user) ? "Quitar de favoritos" : "Agregar a favoritos"}
        onPress={() => toggleFavorite(user)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
