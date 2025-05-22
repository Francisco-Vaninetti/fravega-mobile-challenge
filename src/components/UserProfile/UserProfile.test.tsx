import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { UserProfile } from "./UserProfile";
import { useTheme } from "@/src/context/ThemeContext";

jest.mock("@/src/context/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

const mockUser = {
  id: 1,
  login: "frankzappa",
  name: "Frank Zappa",
  avatar_url: "https://example.com/avatar.png",
  bio: "Músico y compositor",
  public_repos: 42,
};

describe("UserProfile", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      colors: {
        primary: "#0066cc",
        background: "#fafafa",
        text: "#222",
      },
    });
  });

  it("muestra el nombre del usuario si está presente, sino el login", () => {
    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Frank Zappa")).toBeTruthy();
  });

  it("muestra la bio si está presente", () => {
    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Músico y compositor")).toBeTruthy();
  });

  it("muestra cantidad de repos públicos", () => {
    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Repos públicos: 42")).toBeTruthy();
  });

  it("muestra 'Agregar a favoritos' si no es favorito", () => {
    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Agregar a favoritos")).toBeTruthy();
  });

  it("muestra 'Quitar de favoritos' si es favorito", () => {
    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={true}
        onToggleFavorite={jest.fn()}
      />
    );

    expect(getByText("Quitar de favoritos")).toBeTruthy();
  });

  it("llama a onToggleFavorite al presionar el botón", () => {
    const onToggleFavorite = jest.fn();

    const { getByText } = render(
      <UserProfile
        user={mockUser}
        isFavorite={false}
        onToggleFavorite={onToggleFavorite}
      />
    );

    fireEvent.press(getByText("Agregar a favoritos"));
    expect(onToggleFavorite).toHaveBeenCalled();
  });
});
