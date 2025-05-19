// src/components/UserCard/UserCard.tsx
import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { styles } from "./styles";
import { GitHubUser, useFavorites } from "@/src/context/FravoritesContext";

type Props = {
  user: GitHubUser;
  onPress?: () => void;
};

export const UserCard: React.FC<Props> = ({ user, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.login}>{user.login}</Text>
        <Pressable onPress={() => toggleFavorite(user)}>
          <Text style={[styles.favorite]}>
            {isFavorite(user) ? "★ Favorito" : "☆ Marcar"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
};
