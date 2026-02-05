'use client';

import { useState, useEffect } from 'react';
import type { Theme } from './theme';

/**
 * Custom hook to detect the current theme from the document's data-theme attribute.
 * Uses MutationObserver to listen for theme changes.
 * 
 * @returns The current theme ('professional' | 'playful' | 'sui')
 */
export function useThemeDetection(): Theme {
  const [currentTheme, setCurrentTheme] = useState<Theme>('professional');

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') as Theme || 'professional';
      setCurrentTheme(theme);
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  return currentTheme;
}
