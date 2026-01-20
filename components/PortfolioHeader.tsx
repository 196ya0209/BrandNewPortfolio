'use client';

import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function PortfolioHeader() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-[60] py-1 px-6 border-b"
      style={{
        backgroundColor: 'rgba(var(--background-rgb), 0.8)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="flex justify-between items-center text-xs font-medium">
        <span style={{ color: 'var(--secondary)' }}>PORTFOLIO</span>
        <span style={{ color: 'var(--foreground)' }}>Achchutha Rengan</span>
        <div className="flex items-center gap-3">
          <span style={{ color: 'var(--secondary)' }}>{currentDate}</span>
          <ThemeToggle />
        </div>
      </div>
    </motion.div>
  );
}
