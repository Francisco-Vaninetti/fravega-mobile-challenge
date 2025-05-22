import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Text, Button } from "react-native";
import { ThemeProvider, useTheme } from "./ThemeContext";

jest.mock("../storage/ThemeStorage", () => ({
  themeStorage: {
    load: jest.fn(),
    save: jest.fn(),
  },
}));
// Necesario importar desp del mock
import { themeStorage } from "../storage/ThemeStorage";

const TestComponent = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  return (
    <>
      <Text testID="theme-mode">{isDark ? "dark" : "light"}</Text>
      <Text testID="primary-color">{colors.primary}</Text>
      <Button title="Toggle" onPress={toggleTheme} />
    </>
  );
};

describe("ThemeContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("carga el tema desde el storage y refleja los colores correctamente", async () => {
    (themeStorage.load as jest.Mock).mockResolvedValue("dark");

    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("theme-mode").props.children).toBe("dark");
    });

    expect(getByTestId("primary-color").props.children).toBe("#3399ff");
  });

  it("permite cambiar de tema con toggleTheme", async () => {
    (themeStorage.load as jest.Mock).mockResolvedValue("light");

    const { getByTestId, getByText } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(getByTestId("theme-mode").props.children).toBe("light");
    });

    fireEvent.press(getByText("Toggle"));

    await waitFor(() => {
      expect(getByTestId("theme-mode").props.children).toBe("dark");
    });

    expect(themeStorage.save).toHaveBeenCalledWith("dark");
  });
});
