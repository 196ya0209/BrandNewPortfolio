'use client';

import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export function PlayfulShapes() {
  const { theme } = useTheme();

  // Only render in playful theme
  if (theme !== 'playful') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating gradient orbs for playful theme */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        className="glow-orb absolute top-20 left-10 w-40 h-40"
        style={{ 
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          animationDelay: '0s'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        className="glow-orb absolute top-40 right-20 w-52 h-52"
        style={{ 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          animationDelay: '-2s'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="glow-orb absolute top-1/2 left-20 w-36 h-36"
        style={{ 
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.5) 0%, transparent 70%)',
          animationDelay: '-4s'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="glow-orb absolute bottom-32 right-16 w-44 h-44"
        style={{ 
          background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
          animationDelay: '-1s'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.25, scale: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="glow-orb absolute bottom-40 left-32 w-48 h-48"
        style={{ 
          background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          animationDelay: '-3s'
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="glow-orb absolute top-1/3 right-32 w-32 h-32"
        style={{ 
          background: 'radial-gradient(circle, rgba(192, 132, 252, 0.5) 0%, transparent 70%)',
          animationDelay: '-5s'
        }}
      />
    </div>
  );
}
