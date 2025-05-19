import React from "react";
import { ScrollView, Image, Text, Button } from "react-native";
import { GitHubUser } from "../../context/FravoritesContext";
import { styles } from "./styles";
import { colors } from "../../theme";

interface Props {
  user: GitHubUser;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export const UserProfile: React.FC<Props> = ({
  user,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.username}>{user.name ?? user.login}</Text>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      <Text style={styles.info}>Repos públicos: {user.public_repos}</Text>

      <Button
        title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        onPress={onToggleFavorite}
        color={colors.primary}
      />
    </ScrollView>
  );
};
