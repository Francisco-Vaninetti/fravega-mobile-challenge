import AsyncStorage from "@react-native-async-storage/async-storage";
import { GitHubUser } from "../context/FravoritesContext";

const FAVORITES_KEY = "github_favorites";

export const favoritesStorage = {
  async load(): Promise<GitHubUser[]> {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      return json ? JSON.parse(json) : [];
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      return [];
    }
  },

  async save(favorites: GitHubUser[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Error al guardar favoritos:", error);
    }
  },
};
