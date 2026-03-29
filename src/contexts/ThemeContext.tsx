import React, { type ReactNode, createContext, useContext, useEffect, useState } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const parseStoredTheme = (theme: string | null): "light" | "dark" | null => {
  if (theme === "light" || theme === "dark") {
    return theme;
  }
  return null;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = parseStoredTheme(localStorage.getItem("theme"));
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const bodyClassList = document.body.classList;
    const rootClassList = document.documentElement.classList;

    bodyClassList.remove("light", "dark");
    if (theme === "dark") {
      bodyClassList.add("dark");
      rootClassList.add("dark");
    } else {
      bodyClassList.add("light");
      rootClassList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const value: ThemeContextValue = {
    isDark: theme === "dark",
    setTheme,
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
