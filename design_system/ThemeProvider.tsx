"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "female" | "male" | "pet" | "provider";

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultMode = "female",
}: {
  children: React.ReactNode;
  defaultMode?: ThemeMode;
}) {
  const [mode, setModeState] = useState<ThemeMode>(defaultMode);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    // Remove existing mode classes
    root.removeAttribute("data-theme");
    // Apply new mode
    if (mode !== "female") {
      root.setAttribute("data-theme", mode);
    }
  }, [mode]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    // Persist if needed
    localStorage.setItem("beautyverse-mode", newMode);
  };

  const toggleDark = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
