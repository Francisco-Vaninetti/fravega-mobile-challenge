import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesProvider } from "./context/FravoritesContext";
import HomeScreen from "./screens/HomeScreen";
import { UserDetailScreen } from "./screens/UserDetailScreen";

export type RootStackParamList = {
  Home: undefined;
  UserDetail: { username: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="UserDetail" component={UserDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
