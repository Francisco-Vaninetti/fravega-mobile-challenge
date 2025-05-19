import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { FavoritesProvider } from "./context/FravoritesContext";
import { AppNavigator } from "./navigation/AppNavigator";

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
