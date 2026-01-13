'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Theme } from '@/lib/theme';
import { THEME_COOKIE_NAME } from '@/lib/theme';

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'professional' ? 'playful' : 'professional';
    setTheme(newTheme);
    
    // Set cookie
    document.cookie = `${THEME_COOKIE_NAME}=${newTheme}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Update data-theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Ensure the data-theme attribute is set on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
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
