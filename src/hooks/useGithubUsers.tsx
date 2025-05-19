import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GitHubUser } from "../context/FravoritesContext";

export function useGitHubUsers(initialSearch?: string) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const url = initialSearch
        ? `https://api.github.com/search/users?q=${initialSearch}`
        : `https://api.github.com/users`;

      const res = await axios.get(url);
      setUsers(initialSearch ? res.data.items : res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [initialSearch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, initialSearch]);

  return { users, loading, refetch: fetchUsers };
}
