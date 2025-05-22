import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { UserList } from "./UserList";
import { useTheme } from "@/src/context/ThemeContext";

jest.mock("@/src/context/ThemeContext", () => ({
  useTheme: jest.fn(),
}));

// // Mock del UserCard (para que no afecte los tests con lógica propia)
// jest.mock("../UserCard", () => ({
//   UserCard: ({ user, onPress }: any) => (
//     <Text testID="user-card" onPress={onPress}>
//       {user.login}
//     </Text>
//   ),
// }));

jest.mock("../UserCard", () => {
  const React = require("react");
  return {
    UserCard: (props: any) =>
      React.createElement("Text", {
        ...props,
        testID: props.testID || "user-card",
        onPress: props.onPress,
      }),
  };
});

const mockUsers = [
  { id: 1, login: "frankzappa", avatar_url: "https://example.com/avatar.png" },
  {
    id: 2,
    login: "anotherUser",
    avatar_url: "https://example.com/avatar2.png",
  },
];

describe("UserList", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      colors: {
        primary: "#0066cc",
        text: "#222",
      },
    });
  });

  it("renderiza el loader cuando loading es true", () => {
    const { getByTestId } = render(
      <UserList users={[]} loading={true} onUserPress={jest.fn()} />
    );

    expect(getByTestId("ActivityIndicator")).toBeTruthy();
  });

  it("renderiza la lista de usuarios cuando loading es false", () => {
    const { getAllByTestId } = render(
      <UserList users={mockUsers} loading={false} onUserPress={jest.fn()} />
    );

    const userCards = getAllByTestId("user-card");
    expect(userCards).toHaveLength(mockUsers.length);
  });

  it("muestra mensaje de lista vacía cuando no hay usuarios", () => {
    const { getByText } = render(
      <UserList users={[]} loading={false} onUserPress={jest.fn()} />
    );

    expect(getByText("No se encontraron usuarios.")).toBeTruthy();
  });

  it("llama a onUserPress al tocar una UserCard", () => {
    const onUserPress = jest.fn();

    const { getByTestId } = render(
      <UserList
        users={[mockUsers[0]]}
        loading={false}
        onUserPress={onUserPress}
      />
    );

    fireEvent.press(getByTestId("user-card"));
    expect(onUserPress).toHaveBeenCalledWith(mockUsers[0]);
  });
});
