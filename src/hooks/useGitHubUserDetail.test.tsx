import { renderHook, act } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/dom";
import axios from "axios";
import { useGitHubUserDetail } from "./useGiHubUserDetail";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("useGitHubUserDetail", () => {
  const mockUser = {
    id: 1,
    login: "frankzappa",
    avatar_url: "url",
    name: "Frank Zappa",
  };
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("fetches user successfully", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useGitHubUserDetail("frankzappa"));

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it("handles error correctly", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useGitHubUserDetail("failuser"));

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
  });

  it("refetches user data", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUser });

    const { result } = renderHook(() => useGitHubUserDetail("user1"));

    await waitFor(() => expect(result.current.loading).toBe(false), {
      timeout: 3000,
    });

    const updatedUser = { ...mockUser, name: "New Name" };
    mockedAxios.get.mockResolvedValueOnce({ data: updatedUser });

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.user).toEqual(updatedUser);
  });
});
