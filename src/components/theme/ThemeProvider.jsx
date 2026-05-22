"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light-linen");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage or default to light-linen
  useEffect(() => {
    const savedTheme = localStorage.getItem("vian-luxure-theme");
    const initialTheme = savedTheme || "light-linen";
    
    // Apply theme class to document element
    const root = window.document.documentElement;
    root.classList.remove("theme-light-linen", "theme-premium-gold", "theme-luxury-dark");
    root.classList.add(`theme-${initialTheme}`);
    
    const timer = setTimeout(() => {
      setThemeState(initialTheme);
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const setTheme = (newTheme) => {
    if (!["light-linen", "premium-gold", "luxury-dark"].includes(newTheme)) return;
    
    setThemeState(newTheme);
    localStorage.setItem("vian-luxure-theme", newTheme);
    
    const root = window.document.documentElement;
    root.classList.remove("theme-light-linen", "theme-premium-gold", "theme-luxury-dark");
    root.classList.add(`theme-${newTheme}`);
  };

  // Prevent flash by avoiding rendering with incorrect initial theme
  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      <div className={mounted ? `theme-${theme}` : "theme-light-linen"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
