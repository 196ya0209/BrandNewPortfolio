'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle px-4 py-2 rounded-md border-2 font-medium transition-colors"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
      }}
      aria-label={`Switch to ${theme === 'professional' ? 'playful' : 'professional'} theme`}
      type="button"
    >
      {theme === 'professional' ? '🎨 Playful' : '💼 Professional'}
    </button>
  );
}
