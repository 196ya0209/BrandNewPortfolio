'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function PlayfulShapes() {
  const { theme } = useTheme();

  // Only render in playful theme
  if (theme !== 'playful') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top left rounded rectangle */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 left-10 w-32 h-48 rounded-3xl"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.15 }}
      />

      {/* Top right circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-40 right-20 w-40 h-40 rounded-full"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
      />

      {/* Middle left square */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-20 w-24 h-24 rounded-2xl rotate-12"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.18 }}
      />

      {/* Bottom right rounded rectangle */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-32 right-16 w-36 h-28 rounded-3xl"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.15 }}
      />

      {/* Bottom left circle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-40 left-32 w-32 h-32 rounded-full"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.12 }}
      />

      {/* Middle right tall rectangle */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/3 right-32 w-20 h-56 rounded-3xl rotate-6"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.15 }}
      />

      {/* Small accent circle top middle */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.2 }}
      />

      {/* Small square bottom middle */}
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-20 left-1/3 w-20 h-20 rounded-xl"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.15 }}
      />
    </div>
  );
}
