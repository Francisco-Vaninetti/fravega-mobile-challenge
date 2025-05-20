import React, { createContext, useContext, useEffect, useState } from "react";
import { lightColors, darkColors, Colors } from "../theme";
import { themeStorage } from "../storage/ThemeStorage";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  colors: Colors;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  colors: lightColors,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  useEffect(() => {
    (async () => {
      const savedTheme = await themeStorage.load();
      setIsDark(savedTheme === "dark");
    })();
  }, []);

  useEffect(() => {
    themeStorage.save(isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        colors: isDark ? darkColors : lightColors,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
