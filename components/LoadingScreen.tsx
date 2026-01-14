'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit before hiding the loading screen
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
            >
              196ya0209
            </h1>
            <p
              className="text-lg md:text-xl"
              style={{ color: 'var(--secondary)' }}
            >
              Loading Experience...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-64 h-1 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--muted)' }}>
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: 'var(--primary)' }}
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.p
            className="mt-4 text-sm font-medium"
            style={{ color: 'var(--secondary)' }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
