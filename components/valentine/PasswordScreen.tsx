'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors, gradients } from '@/lib/valentine-colors';

interface PasswordScreenProps {
  onSuccess: () => void;
}

const FloatingHeart = ({ delay, left }: { delay: number; left: string }) => (
  <motion.div
    className="absolute text-2xl pointer-events-none select-none"
    style={{ left }}
    initial={{ bottom: -50, opacity: 0 }}
    animate={{
      bottom: '110vh',
      opacity: [0, 1, 1, 0],
      x: [0, 30, -30, 0],
    }}
    transition={{
      duration: 8,
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

  const hearts = Array.from({ length: 15 }, (_, i) => ({
    delay: i * 0.5,
    left: `${(i * 7) % 100}%`,
  }));

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: gradients.darkPink }}
    >
      {/* Floating hearts background */}
      {hearts.map((heart, i) => (
        <FloatingHeart key={i} delay={heart.delay} left={heart.left} />
      ))}

      <motion.div
        className="relative z-10 text-center p-8 rounded-3xl"
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
          className="text-6xl mb-6"
          animate={isUnlocked ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 0.5 }}
        >
          {isUnlocked ? '💖' : '🔒'}
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl mb-8"
          style={{
            fontFamily: 'var(--font-great-vibes)',
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
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
            placeholder="Enter the code"
            disabled={isUnlocked}
            className="text-center text-2xl tracking-[0.5em] w-48 py-4 px-6 rounded-xl border-2 outline-none transition-all duration-300"
            style={{
              background: colors.darkSurface,
              borderColor: shake ? '#ef4444' : colors.primaryPink,
              color: colors.white,
              fontFamily: 'var(--font-inter)',
            }}
            autoFocus
          />
        </motion.div>

        {/* Unlock Button */}
        <motion.button
          onClick={handleButtonSubmit}
          disabled={password.length < 4 || isUnlocked}
          className="mt-6 px-10 py-4 rounded-full text-white font-semibold text-lg transition-all duration-300 disabled:opacity-50"
          style={{
            background: gradients.primary,
            fontFamily: 'var(--font-inter)',
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
              className="mt-4 text-sm"
              style={{
                color: colors.lightPink,
                fontFamily: 'var(--font-dancing-script)',
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
              className="mt-4 text-xl"
              style={{
                color: colors.primaryPink,
                fontFamily: 'var(--font-dancing-script)',
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
