import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

export interface ThemeToggleOrigin {
  x: number;
  y: number;
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: (origin?: ThemeToggleOrigin) => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback((origin?: ThemeToggleOrigin) => {
    const runToggle = () => {
      setThemeState((current) => {
        const next = current === "dark" ? "light" : "dark";
        applyTheme(next);
        return next;
      });
    };

    if (origin) {
      const root = document.documentElement;
      const endRadius = Math.hypot(
        Math.max(origin.x, window.innerWidth - origin.x),
        Math.max(origin.y, window.innerHeight - origin.y),
      );
      root.style.setProperty("--vt-x", `${origin.x}px`);
      root.style.setProperty("--vt-y", `${origin.y}px`);
      root.style.setProperty("--vt-r", `${endRadius}px`);
    }

    if ("startViewTransition" in document) {
      document.startViewTransition(runToggle);
    } else {
      runToggle();
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
