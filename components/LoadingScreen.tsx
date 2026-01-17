'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 3;
      });
    }, 25);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Wait a bit before hiding the loading screen
      const timeout = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--background)' }}
        >
          {/* Animated background glow */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 -z-10"
          >
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]"
              style={{
                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                filter: 'blur(80px)',
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-10"
          >
            <h1
              className="text-5xl md:text-7xl font-bold mb-4 text-gradient"
              style={{ fontFamily: 'var(--hero-font)' }}
            >
              196ya0209
            </h1>
            <p
              className="text-base md:text-lg font-light tracking-wide"
              style={{ color: 'var(--secondary)' }}
            >
              Loading Experience...
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '16rem' }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div 
              className="w-64 h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ 
                  background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              />
            </div>
            
            {/* Glow effect on progress */}
            <motion.div
              className="absolute top-0 h-1 rounded-full"
              style={{ 
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                filter: 'blur(4px)',
                opacity: 0.5,
              }}
            />
          </motion.div>

          {/* Progress Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-sm font-medium tracking-widest"
            style={{ color: 'var(--primary)' }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
