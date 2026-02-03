'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { colors, gradients } from '@/lib/valentine-colors';

// Dynamic import for 3D elements to avoid SSR issues
const Floating3DElements = dynamic(() => import('./Floating3DElements'), {
  ssr: false,
  loading: () => null,
});

interface PasswordScreenProps {
  onSuccess: () => void;
}

const FloatingHeart = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute text-xl sm:text-2xl md:text-3xl pointer-events-none select-none"
    style={{ left }}
    initial={{ bottom: -50, opacity: 0 }}
    animate={{
      bottom: '110vh',
      opacity: [0, 1, 1, 0],
      x: [0, 30, -30, 0],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: 'linear',
    }}
  >
    💕
  </motion.div>
);

export default function PasswordScreen({ onSuccess }: PasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [shake, setShake] = useState(false);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove non-digit characters to ensure only numbers are entered
    const newPassword = e.target.value.replace(/\D/g, '');
    setPassword(newPassword);
    // Auto-submit when 4 digits entered
    if (newPassword.length === 4) {
      if (newPassword === '0106') {
        setIsUnlocked(true);
        setTimeout(() => {
          onSuccess();
        }, 1500);
      } else {
        setWrongAttempts((prev) => prev + 1);
        setShake(true);
        setPassword('');
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  const handleButtonSubmit = () => {
    if (password === '0106') {
      setIsUnlocked(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } else {
      setWrongAttempts((prev) => prev + 1);
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 500);
    }
  };

  const hearts = Array.from({ length: 20 }, (_, i) => ({
    delay: i * 0.4,
    left: `${(i * 5) % 100}%`,
  }));

  return (
    <div
      className="fixed inset-0 w-full h-full flex items-center justify-center overflow-hidden"
      style={{ background: gradients.darkPink }}
    >
      {/* 3D Floating Elements Background */}
      <Floating3DElements 
        heartCount={15}
        starCount={10}
        sparkleCount={25}
        ringCount={5}
        spread={10}
      />

      {/* 2D Floating hearts background */}
      {hearts.map((heart, i) => (
        <FloatingHeart key={i} delay={heart.delay} left={heart.left} />
      ))}

      <motion.div
        className="relative z-10 text-center p-6 sm:p-8 md:p-10 rounded-3xl mx-4 max-w-sm sm:max-w-md w-full"
        style={{
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${colors.primaryPink}33`,
          boxShadow: `0 0 60px ${colors.primaryPink}22`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        {/* Lock/Heart Icon */}
        <motion.div
          className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6"
          animate={isUnlocked ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isUnlocked ? '💖' : '🔒'}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-6 sm:mb-8 leading-tight"
          style={{
            fontFamily: "'Great Vibes', cursive",
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          💕 A Special Surprise Awaits
        </motion.h1>

        {/* Password Input */}
        <motion.div
          animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input
            type="password"
            maxLength={4}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter code"
            disabled={isUnlocked}
            className="text-center text-xl sm:text-2xl tracking-[0.4em] sm:tracking-[0.5em] w-40 sm:w-48 py-3 sm:py-4 px-4 sm:px-6 rounded-xl border-2 outline-none transition-all duration-300"
            style={{
              background: colors.darkSurface,
              borderColor: shake ? '#ef4444' : colors.primaryPink,
              color: colors.white,
              fontFamily: "'Inter', sans-serif",
            }}
            autoFocus
          />
        </motion.div>

        {/* Unlock Button */}
        <motion.button
          onClick={handleButtonSubmit}
          disabled={password.length < 4 || isUnlocked}
          className="mt-4 sm:mt-6 px-6 sm:px-10 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg transition-all duration-300 disabled:opacity-50"
          style={{
            background: gradients.primary,
            fontFamily: "'Inter', sans-serif",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Unlock My Heart 💕
        </motion.button>

        {/* Hint after wrong attempts */}
        <AnimatePresence>
          {wrongAttempts >= 2 && !isUnlocked && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4 text-sm sm:text-base"
              style={{
                color: colors.lightPink,
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Hint: A special date 💝
            </motion.p>
          )}
        </AnimatePresence>

        {/* Success Message */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-lg sm:text-xl"
              style={{
                color: colors.primaryPink,
                fontFamily: "'Dancing Script', cursive",
              }}
            >
              Welcome, my love... 💖
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
