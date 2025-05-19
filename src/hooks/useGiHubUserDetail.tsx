import { useEffect, useState } from "react";
import axios from "axios";
import { GitHubUser } from "../context/FravoritesContext";

export const useGitHubUserDetail = (username: string) => {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [username]);

  return { user, loading };
};
