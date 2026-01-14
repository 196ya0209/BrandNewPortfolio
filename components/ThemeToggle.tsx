'use client';

import { useTheme } from './ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        border: '1px solid',
      }}
      aria-label={`Switch to ${theme === 'professional' ? 'playful' : 'professional'} theme`}
      type="button"
    >
      {theme === 'professional' ? '🎨' : '💼'}
    </button>
  );
}
