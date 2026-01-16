'use client';

import { useTheme } from './ThemeProvider';

const themeIcons: Record<string, string> = {
  professional: '💼',
  playful: '🎨',
  sui: '🌊',
};

const themeLabels: Record<string, string> = {
  professional: 'Professional',
  playful: 'Neobrutalism',
  sui: 'Sui',
};

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
        border: theme === 'playful' ? '3px solid var(--border)' : '1px solid',
        boxShadow: theme === 'playful' ? '3px 3px 0 var(--border)' : 'none',
      }}
      aria-label={`Current theme: ${themeLabels[theme]}. Click to switch theme.`}
      type="button"
    >
      {themeIcons[theme]}
    </button>
  );
}
