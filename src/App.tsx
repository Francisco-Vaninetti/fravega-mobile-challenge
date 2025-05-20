import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FavoritesProvider } from "./context/FravoritesContext";
import { AppNavigator } from "./navigation/AppNavigator";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </FavoritesProvider>
    </ThemeProvider>
  );
}
