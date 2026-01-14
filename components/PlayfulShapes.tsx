'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function PlayfulShapes() {
  const { theme } = useTheme();

  // Only render in playful theme
  if (theme !== 'playful') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Developer - Top left rounded rectangle with dashed border */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotate: -15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-20 left-10 w-40 h-52 rounded-3xl border-4 border-dashed flex items-center justify-center"
        style={{ borderColor: 'var(--primary)' }}
      >
        <span className="text-lg font-bold rotate-0" style={{ color: 'var(--primary)' }}>
          Developer
        </span>
      </motion.div>

      {/* Artist - Top right circle with fill */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute top-40 right-20 w-44 h-44 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
      >
        <span className="text-lg font-bold" style={{ color: 'var(--foreground)' }}>
          Artist
        </span>
      </motion.div>

      {/* Designer - Middle left square with dashed border */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-20 w-32 h-32 rounded-2xl rotate-12 border-4 border-dashed flex items-center justify-center"
        style={{ borderColor: 'var(--secondary)' }}
      >
        <span className="text-base font-bold -rotate-12" style={{ color: 'var(--secondary)' }}>
          Designer
        </span>
      </motion.div>

      {/* 3D Artist - Bottom right rounded rectangle with fill */}
      <motion.div
        initial={{ opacity: 0, x: 100, rotate: 15 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-32 right-16 w-40 h-32 rounded-3xl flex items-center justify-center"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.2 }}
      >
        <span className="text-base font-bold" style={{ color: 'var(--foreground)' }}>
          3D Artist
        </span>
      </motion.div>

      {/* Creative - Bottom left circle with dashed border */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-40 left-32 w-36 h-36 rounded-full border-4 border-dashed flex items-center justify-center"
        style={{ borderColor: 'var(--accent)' }}
      >
        <span className="text-base font-bold" style={{ color: 'var(--accent)' }}>
          Creative
        </span>
      </motion.div>

      {/* Coder - Middle right tall rectangle with fill */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/3 right-32 w-24 h-60 rounded-3xl rotate-6 flex items-center justify-center"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.2 }}
      >
        <span className="text-base font-bold -rotate-6" style={{ color: 'var(--foreground)' }}>
          Coder
        </span>
      </motion.div>

      {/* UX - Top middle small circle with fill */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute top-24 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'var(--primary)', opacity: 0.25 }}
      >
        <span className="text-sm font-bold" style={{ color: 'var(--foreground)' }}>
          UX
        </span>
      </motion.div>

      {/* Maker - Bottom middle square with dashed border */}
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-20 left-1/3 w-24 h-24 rounded-xl border-4 border-dashed flex items-center justify-center"
        style={{ borderColor: 'var(--accent)' }}
      >
        <span className="text-sm font-bold" style={{ color: 'var(--accent)' }}>
          Maker
        </span>
      </motion.div>

      {/* Innovator - Middle center rectangle with fill */}
      <motion.div
        initial={{ opacity: 0, scale: 0, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -10 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-24 rounded-2xl -rotate-10 flex items-center justify-center"
        style={{ backgroundColor: 'var(--secondary)', opacity: 0.18 }}
      >
        <span className="text-base font-bold rotate-10" style={{ color: 'var(--foreground)' }}>
          Innovator
        </span>
      </motion.div>

      {/* Builder - Top right tall rectangle with dashed border */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="absolute top-16 right-1/4 w-28 h-44 rounded-3xl -rotate-12 border-4 border-dashed flex items-center justify-center"
        style={{ borderColor: 'var(--primary)' }}
      >
        <span className="text-base font-bold rotate-12" style={{ color: 'var(--primary)' }}>
          Builder
        </span>
      </motion.div>

      {/* Thinker - Bottom left small rectangle with fill */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.9, delay: 1.1 }}
        className="absolute bottom-1/4 left-1/4 w-28 h-20 rounded-2xl rotate-6 flex items-center justify-center"
        style={{ backgroundColor: 'var(--accent)', opacity: 0.2 }}
      >
        <span className="text-sm font-bold -rotate-6" style={{ color: 'var(--foreground)' }}>
          Thinker
        </span>
      </motion.div>
    </div>
  );
}
