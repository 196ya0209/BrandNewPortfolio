'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll with slower, tighter settings
    const lenis = new Lenis({
      duration: 1.4, // Slower scroll for smoother feel
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quartic ease-out for ultra smooth
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8, // Reduced for slower, more controlled scroll
      touchMultiplier: 1.0, // Reduced for tighter touch scroll
      lerp: 0.06, // Lower lerp for smoother, slower interpolation
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    }

    rafRef.current = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
