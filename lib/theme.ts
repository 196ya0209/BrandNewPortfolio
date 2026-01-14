/**
 * Theme types and utilities
 */

export type Theme = 'professional' | 'playful';

export const THEME_COOKIE_NAME = 'portfolio-theme';

export function getThemeFromCookie(cookieString?: string): Theme | null {
  if (!cookieString) return null;
  
  const cookies = cookieString.split(';').reduce((acc, cookie) => {
    const parts = cookie.trim().split('=');
    if (parts.length === 2) {
      const [key, value] = parts;
      acc[key] = value;
    }
    return acc;
  }, {} as Record<string, string>);
  
  const theme = cookies[THEME_COOKIE_NAME];
  if (theme === 'professional' || theme === 'playful') {
    return theme;
  }
  
  return null;
}
