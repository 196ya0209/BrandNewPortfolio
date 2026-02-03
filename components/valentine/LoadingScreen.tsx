'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { colors, gradients } from '@/lib/valentine-colors';

interface LoadingScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  'Loading something special for Ammu... 💕',
  'Gathering all my love for you... 💖',
  'Preparing your surprise, Mu... ✨',
  'Almost ready, my beautiful... 🌹',
];

const OrbitingHeart = ({ index, total }: { index: number; total: number }) => {
  const angle = (index / total) * 360;
  return (
    <motion.div
      className="absolute text-2xl"
      style={{
        width: 320,
        height: 320,
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      <motion.span
        className="absolute"
        style={{
          left: '50%',
          top: 0,
          transform: `translateX(-50%) rotate(${angle}deg)`,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          delay: index * 0.3,
          repeat: Infinity,
        }}
      >
        {index % 2 === 0 ? '💕' : '💖'}
      </motion.span>
    </motion.div>
  );
};

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const increment = 100 / (duration / interval);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressTimer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return next;
      });
    }, interval);

    const messageTimer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: gradients.darkPink }}
    >
      {/* Photo container with orbiting hearts */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Orbiting hearts */}
        {[...Array(6)].map((_, i) => (
          <OrbitingHeart key={i} index={i} total={6} />
        ))}

        {/* Photo circle */}
        <motion.div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 280,
            height: 280,
            background: gradients.primary,
            padding: 4,
          }}
          animate={{
            boxShadow: [
              `0 0 30px ${colors.primaryPink}66`,
              `0 0 60px ${colors.primaryPink}aa`,
              `0 0 30px ${colors.primaryPink}66`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center text-6xl"
            style={{ background: colors.darkBg }}
          >
            💕
          </div>
        </motion.div>
      </div>

      {/* Loading message */}
      <motion.p
        key={messageIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-2xl mb-8 text-center px-4"
        style={{
          fontFamily: 'var(--font-dancing-script)',
          color: colors.lightPink,
        }}
      >
        {loadingMessages[messageIndex]}
      </motion.p>

      {/* Progress bar */}
      <div
        className="w-64 h-3 rounded-full overflow-hidden"
        style={{ background: colors.darkSurface }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: gradients.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: 'linear' }}
        />
      </div>

      <p
        className="mt-4 text-sm"
        style={{
          color: colors.lightPink,
          fontFamily: 'var(--font-inter)',
        }}
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
}
