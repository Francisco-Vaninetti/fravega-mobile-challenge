import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import {
  GitHubUser,
  FavoritesProvider,
  useFavorites,
} from "./FravoritesContext";
import { Button, Text } from "react-native";

// Mock del storage
jest.mock("../storage/FavoritesStorage", () => ({
  favoritesStorage: {
    load: jest.fn(),
    save: jest.fn(),
  },
}));

import { favoritesStorage } from "../storage/FavoritesStorage";

const mockUser: GitHubUser = {
  id: 1,
  login: "frankzappa",
  avatar_url: "https://example.com/avatar.png",
};

const TestComponent = () => {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <>
      <Text testID="favorites-count">{favorites.length}</Text>
      <Text testID="is-favorite">{isFavorite(mockUser) ? "Sí" : "No"}</Text>
      <Button title="toggle" onPress={() => toggleFavorite(mockUser)} />
    </>
  );
};

describe("FavoritesContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carga favoritos desde el storage al iniciar", async () => {
    (favoritesStorage.load as jest.Mock).mockResolvedValue([mockUser]);

    const { getByTestId } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    await waitFor(() =>
      expect(getByTestId("favorites-count").props.children).toBe(1)
    );
    expect(getByTestId("is-favorite").props.children).toBe("Sí");
  });

  it("toggleFavorite agrega y remueve usuario", async () => {
    (favoritesStorage.load as jest.Mock).mockResolvedValue([]);

    const { getByTestId, getByText } = render(
      <FavoritesProvider>
        <TestComponent />
      </FavoritesProvider>
    );

    const count = getByTestId("favorites-count");
    const toggleBtn = getByText("toggle");

    fireEvent.press(toggleBtn);
    expect(count.props.children).toBe(1);
    expect(getByTestId("is-favorite").props.children).toBe("Sí");
    expect(favoritesStorage.save).toHaveBeenCalledWith([mockUser]);

    fireEvent.press(toggleBtn);
    expect(count.props.children).toBe(0);
    expect(getByTestId("is-favorite").props.children).toBe("No");
    expect(favoritesStorage.save).toHaveBeenCalledWith([]);
  });
});
