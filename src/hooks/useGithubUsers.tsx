import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { GitHubUser } from "../context/FravoritesContext";

export function useGitHubUsers(searchQuery?: string) {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      let res;

      if (searchQuery && searchQuery.trim().length > 0) {
        res = await axios.get(
          `https://api.github.com/search/users?q=${searchQuery}`
        );
        setUsers(res.data.items);
      } else {
        res = await axios.get("https://api.github.com/users");
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Error searching users:", err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, refetch: fetchUsers };
}
