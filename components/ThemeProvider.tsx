'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Theme } from '@/lib/theme';
import { THEME_COOKIE_NAME, THEMES } from '@/lib/theme';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    
    // Set cookie
    document.cookie = `${THEME_COOKIE_NAME}=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update data-theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleTheme = () => {
    // Cycle through themes: professional -> playful -> sui -> professional
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const newTheme = THEMES[nextIndex];
    setTheme(newTheme);
  };

  useEffect(() => {
    // Ensure the data-theme attribute is set on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
