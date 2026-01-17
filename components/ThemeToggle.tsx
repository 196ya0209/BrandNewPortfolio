'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105"
      style={{
        background: theme === 'professional' 
          ? 'rgba(77, 162, 255, 0.1)' 
          : 'rgba(167, 139, 250, 0.1)',
        border: `1px solid ${theme === 'professional' 
          ? 'rgba(77, 162, 255, 0.3)' 
          : 'rgba(167, 139, 250, 0.3)'}`,
        color: 'var(--foreground)',
      }}
      aria-label={`Switch to ${theme === 'professional' ? 'playful' : 'professional'} theme`}
      type="button"
    >
      {theme === 'professional' ? '✨ Playful' : '💼 Pro'}
    </button>
  );
}
