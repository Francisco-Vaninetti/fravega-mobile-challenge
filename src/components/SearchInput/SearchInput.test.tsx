import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { SearchInput } from "./SearchInput";
import { useTheme } from "@/src/context/ThemeContext";
import { Keyboard } from "react-native";

jest.mock("@/src/context/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

describe("SearchInput", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      colors: {
        primary: "#0066cc",
        background: "#fafafa",
        text: "#222",
      },
    });
    // Mock del Keyboard porque sino rompe
    jest.spyOn(Keyboard, "dismiss").mockImplementation(jest.fn());
  });

  it("muestra el valor inicial correctamente", () => {
    const { getByDisplayValue } = render(
      <SearchInput
        value="frankzappa"
        onChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );
    expect(getByDisplayValue("frankzappa")).toBeTruthy();
  });

  it("llama a onChange al escribir", () => {
    const onChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChange={onChange} onSubmit={jest.fn()} />
    );
    fireEvent.changeText(getByPlaceholderText("Buscar usuario"), "nuevo texto");
    expect(onChange).toHaveBeenCalledWith("nuevo texto");
  });

  it("llama a onSubmit y oculta el teclado al enviar", () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChange={jest.fn()} onSubmit={onSubmit} />
    );
    fireEvent(getByPlaceholderText("Buscar usuario"), "submitEditing");
    expect(onSubmit).toHaveBeenCalled();
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });
});
