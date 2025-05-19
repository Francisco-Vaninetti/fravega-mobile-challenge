import React, { createContext, useContext, useState } from "react";

export interface GitHubUser {
  login: string;
  avatar_url: string;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: GitHubUser[];
  toggleFavorite: (user: GitHubUser) => void;
  isFavorite: (user: GitHubUser) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<GitHubUser[]>([]);

  const toggleFavorite = (user: GitHubUser) => {
    setFavorites((prev) => {
      const exists = prev.some((u) => u.login === user.login);
      return exists
        ? prev.filter((u) => u.login !== user.login)
        : [...prev, user];
    });
  };

  const isFavorite = (user: GitHubUser) =>
    favorites.some((u) => u.login === user.login);

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
  if (!context)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return context;
};
