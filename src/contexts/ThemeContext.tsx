import React, {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  preference: "system" | "light" | "dark";
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

export const resolveInitialTheme = (): "light" | "dark" => resolveTheme(resolveThemePreference());

const resolveThemePreference = (): "system" | "light" | "dark" =>
  parseStoredTheme(localStorage.getItem("theme")) ?? "system";

const systemTheme = (): "light" | "dark" =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const resolveTheme = (preference: "system" | "light" | "dark") =>
  preference === "system" ? systemTheme() : preference;

export const applyTheme = (theme: "light" | "dark") => {
  document.body.classList.toggle("dark", theme === "dark");
  document.body.classList.toggle("light", theme === "light");
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [preference, setPreference] = useState<"system" | "light" | "dark">(resolveThemePreference);
  const [preferredSystemTheme, setPreferredSystemTheme] = useState(systemTheme);
  const theme = preference === "system" ? preferredSystemTheme : preference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncSystemTheme = () => setPreferredSystemTheme(media.matches ? "dark" : "light");
    media.addEventListener("change", syncSystemTheme);
    return () => media.removeEventListener("change", syncSystemTheme);
  }, []);

  useEffect(() => {
    if (preference === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", preference);
    }
    applyTheme(theme);
  }, [preference, theme]);

  const setTheme = useCallback((nextTheme: "light" | "dark") => setPreference(nextTheme), []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      isDark: theme === "dark",
      preference,
      setTheme,
      theme,
      toggleTheme,
    }),
    [preference, setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
