import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { GitHubUser } from "../context/FravoritesContext";

export const useGitHubUserDetail = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://api.github.com/users/${username}`);
      setUser(res.data);
    } catch (err) {
      console.error("Error fetching user detail:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};
