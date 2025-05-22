import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useFavorites } from "@/src/context/FravoritesContext";
import { UserCard } from "../UserCard";

// Mock del contexto
interface FontAwesomeProps {
  testID?: string;
  [key: string]: any;
}
jest.mock("@/src/context/FravoritesContext", () => ({
  useFavorites: jest.fn(),
}));

jest.mock("@expo/vector-icons", () => {
  const React = require("react");
  return {
    FontAwesome: (props: FontAwesomeProps) =>
      React.createElement("View", {
        ...props,
        testID: props.testID || "star-icon",
      }),
  };
});

const mockUser = {
  id: 1,
  login: "frankzappa",
  avatar_url: "https://example.com/avatar.png",
};

describe("UserCard", () => {
  const toggleFavorite = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renderiza el nombre del usuario", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => false,
      toggleFavorite,
    });

    const { getByText } = render(
      <UserCard user={mockUser} onPress={jest.fn()} />
    );

    expect(getByText("frankzappa")).toBeTruthy();
  });

  it("muestra la estrella vacía si no es favorito", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => false,
      toggleFavorite,
    });

    const { getByTestId } = render(
      <UserCard user={mockUser} onPress={jest.fn()} />
    );
    const icon = getByTestId("star-icon");
    expect(icon).toHaveProp("name", "star-o");
  });

  it("muestra la estrella llena si es favorito", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => true,
      toggleFavorite,
    });

    const { getByTestId } = render(
      <UserCard user={mockUser} onPress={jest.fn()} />
    );

    const icon = getByTestId("star-icon");
    expect(icon).toHaveProp("name", "star");
  });

  it("llama a toggleFavorite al tocar la estrella", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      isFavorite: () => false,
      toggleFavorite,
    });

    const { getByTestId } = render(
      <UserCard user={mockUser} onPress={jest.fn()} />
    );

    fireEvent.press(getByTestId("star-icon-wrapper"));
    expect(toggleFavorite).toHaveBeenCalledWith(mockUser);
  });
});
