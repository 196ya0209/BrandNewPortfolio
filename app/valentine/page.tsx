'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import PasswordScreen from '@/components/valentine/PasswordScreen';
import LoadingScreen from '@/components/valentine/LoadingScreen';

// Dynamic imports for Three.js components to avoid SSR issues
const PortalScreen = dynamic(() => import('@/components/valentine/PortalScreen'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

const UniverseScreen = dynamic(() => import('@/components/valentine/UniverseScreen'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

const MemoriesScreen = dynamic(() => import('@/components/valentine/MemoriesScreen'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

const StoryScreen = dynamic(() => import('@/components/valentine/StoryScreen'), {
  ssr: false,
  loading: () => <LoadingPlaceholder />,
});

function LoadingPlaceholder() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0a' }}>
      <div className="text-4xl animate-pulse">💕</div>
    </div>
  );
}

type Screen = 'password' | 'loading' | 'portal' | 'universe' | 'memories' | 'story';

export default function ValentinePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('password');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load Google Fonts dynamically on client side
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@400;700&family=Parisienne&family=Inter:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      :root {
        --font-great-vibes: 'Great Vibes', cursive;
        --font-dancing-script: 'Dancing Script', cursive;
        --font-parisienne: 'Parisienne', cursive;
        --font-inter: 'Inter', sans-serif;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  const handlePasswordSuccess = useCallback(() => {
    setIsAuthenticated(true);
    setCurrentScreen('loading');
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setCurrentScreen('portal');
  }, []);

  const handlePortalProceed = useCallback(() => {
    setCurrentScreen('universe');
  }, []);

  const handleUniverseProceed = useCallback(() => {
    setCurrentScreen('memories');
  }, []);

  const handleMemoriesProceed = useCallback(() => {
    setCurrentScreen('story');
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentScreen('portal');
  }, []);

  return (
    <main className="min-h-screen" style={{ background: '#0a0a0a' }}>
      {currentScreen === 'password' && (
        <PasswordScreen onSuccess={handlePasswordSuccess} />
      )}
      
      {currentScreen === 'loading' && isAuthenticated && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {currentScreen === 'portal' && isAuthenticated && (
        <PortalScreen onProceed={handlePortalProceed} />
      )}
      
      {currentScreen === 'universe' && isAuthenticated && (
        <UniverseScreen onProceed={handleUniverseProceed} />
      )}
      
      {currentScreen === 'memories' && isAuthenticated && (
        <MemoriesScreen onProceed={handleMemoriesProceed} />
      )}
      
      {currentScreen === 'story' && isAuthenticated && (
        <StoryScreen onRestart={handleRestart} />
      )}
    </main>
  );
}
