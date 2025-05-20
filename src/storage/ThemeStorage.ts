import AsyncStorage from "@react-native-async-storage/async-storage";

const THEME_KEY = "theme_preference";

export const themeStorage = {
  async load(): Promise<"light" | "dark"> {
    try {
      const value = await AsyncStorage.getItem(THEME_KEY);
      return value === "dark" ? "dark" : "light";
    } catch (error) {
      console.error("Error al cargar el tema:", error);
      return "light";
    }
  },

  async save(theme: "light" | "dark"): Promise<void> {
    try {
      await AsyncStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      console.error("Error al guardar el tema:", error);
    }
  },
};
