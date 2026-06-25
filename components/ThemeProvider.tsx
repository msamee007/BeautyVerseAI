"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "female" | "male" | "pet" | "provider";

export type UserProfile = {
  id: string;
  name: string;
  subtitle: string;
  initials: string;
};

export const MOCK_PROFILES: UserProfile[] = [
  { id: '1', name: 'Priya Sharma', subtitle: 'VIP Member', initials: 'PS' },
  { id: '2', name: 'Rahul K.', subtitle: 'Premium Member', initials: 'RK' },
  { id: '3', name: 'Sarah', subtitle: 'Pet Parent (Bella)', initials: 'S' }
];

interface ThemeContextProps {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  toggleDark: () => void;
  activeCity: string;
  setActiveCity: (city: string) => void;
  currentUser: UserProfile;
  setCurrentUser: (profile: UserProfile) => void;
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
  const [activeCity, setActiveCity] = useState("mumbai");
  const [currentUser, setCurrentUserState] = useState<UserProfile>(MOCK_PROFILES[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedMode = localStorage.getItem("beautyverse-mode") as ThemeMode;
    if (savedMode && ["female", "male", "pet", "provider"].includes(savedMode)) {
      setModeState(savedMode);
    }
    
    const savedUserId = localStorage.getItem("beautyverse-user");
    if (savedUserId) {
      const foundUser = MOCK_PROFILES.find(p => p.id === savedUserId);
      if (foundUser) setCurrentUserState(foundUser);
    }
  }, []);

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

  const setCurrentUser = (profile: UserProfile) => {
    setCurrentUserState(profile);
    localStorage.setItem("beautyverse-user", profile.id);
  };

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, toggleDark, activeCity, setActiveCity, currentUser, setCurrentUser }}>
      {isMounted ? children : <div className="min-h-screen bg-background opacity-0"></div>}
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
