import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import axios from "axios";
import { useGitHubUsers } from "./useGithubUsers";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useGitHubUsers", () => {
  it("debería obtener usuarios al realizar una búsqueda", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { items: [{ id: 1, login: "user1" }] },
    });
    const { result } = renderHook(() => useGitHubUsers("user"));
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual([{ id: 1, login: "user1" }]);
  });

  it("debería obtener lista general de usuarios cuando no hay query", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [{ id: 2, login: "generalUser" }],
    });
    const { result } = renderHook(() => useGitHubUsers());
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual([{ id: 2, login: "generalUser" }]);
  });

  it("debería manejar error sin romper la aplicación", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useGitHubUsers("errorQuery"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.users).toEqual([]);
  });
});
