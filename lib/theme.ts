/**
 * Theme types and utilities
 */

export type Theme = 'professional' | 'playful';

export const THEME_COOKIE_NAME = 'portfolio-theme';

export function getThemeFromCookie(cookieString?: string): Theme | null {
  if (!cookieString) return null;
  
  const cookies = cookieString.split(';').reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split('=');
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>);
  
  const theme = cookies[THEME_COOKIE_NAME];
  if (theme === 'professional' || theme === 'playful') {
    return theme;
  }
  
  return null;
}
