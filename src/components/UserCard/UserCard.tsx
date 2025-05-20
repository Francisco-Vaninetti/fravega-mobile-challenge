import React, { useRef } from "react";
import { View, Text, Image, Pressable, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { GitHubUser, useFavorites } from "../../context/FravoritesContext";

import { getStyles } from "./styles";
import { useTheme } from "@/src/context/ThemeContext";

type Props = {
  user: GitHubUser;
  onPress: () => void;
};

export const UserCard: React.FC<Props> = ({ user, onPress }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { colors } = useTheme();
  const styles = getStyles(colors);

  const handleToggleFavorite = () => {
    // Pop animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    toggleFavorite(user);
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
        <Text style={styles.username}>{user.login}</Text>
      </View>

      <Pressable onPress={handleToggleFavorite} hitSlop={10}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <FontAwesome
            name={isFavorite(user) ? "star" : "star-o"}
            size={24}
            color={colors.primary}
          />
        </Animated.View>
      </Pressable>
    </Pressable>
  );
};
