import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

import { useGitHubUserDetail } from "../../hooks/useGiHubUserDetail";
import { useFavorites } from "../../context/FravoritesContext";
import { RootStackParamList } from "../../navigation/types";
import { UserProfile } from "../../components/UserProfile";
import { useTheme } from "../../context/ThemeContext";
import { getStyles } from "./styles";

export const UserDetailScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, "UserDetail">>();
  const { username } = route.params;

  const { colors } = useTheme();
  const styles = getStyles(colors);
  const { user, loading } = useGitHubUserDetail(username);
  const { toggleFavorite, isFavorite } = useFavorites();

  if (loading) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!user) {
    return (
      <View
        style={[
          styles.loadingContainer,
          { backgroundColor: colors.background },
        ]}
      >
        <Text style={styles.errorText}>No se pudo cargar el usuario.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <UserProfile
        user={user}
        isFavorite={isFavorite(user)}
        onToggleFavorite={() => toggleFavorite(user)}
      />
    </View>
  );
};
