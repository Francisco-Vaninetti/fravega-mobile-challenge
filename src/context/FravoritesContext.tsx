import React, { createContext, useContext, useEffect, useState } from "react";
import { favoritesStorage } from "../storage/FavoritesStorage";

export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  name?: string;
  bio?: string;
  public_repos?: number;
}

type FavoritesContextType = {
  favorites: GitHubUser[];
  toggleFavorite: (user: GitHubUser) => void;
  isFavorite: (user: GitHubUser) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<GitHubUser[]>([]);

  useEffect(() => {
    favoritesStorage.load().then(setFavorites);
  }, []);

  const toggleFavorite = (user: GitHubUser) => {
    const updated = favorites.some((f) => f.id === user.id)
      ? favorites.filter((f) => f.id !== user.id)
      : [...favorites, user];

    setFavorites(updated);
    favoritesStorage.save(updated);
  };

  const isFavorite = (user: GitHubUser) =>
    favorites.some((f) => f.id === user.id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites debe ser usado dentro de un FavoritesProvider!"
    );
  }
  return context;
};
