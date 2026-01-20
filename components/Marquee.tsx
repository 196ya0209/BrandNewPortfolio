'use client';

import { motion } from 'framer-motion';

export function Marquee() {
  const text = "FULL-STACK DEVELOPER • CREATIVE CODER • PROBLEM SOLVER • WEB ENTHUSIAST • ";
  const repeatedText = text.repeat(3);

  return (
    <div className="py-8 overflow-hidden border-y" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, -1 * (text.length * 12)], // Approximate width calculation
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <span className="text-2xl md:text-4xl font-bold pr-4" style={{ color: 'var(--primary)' }}>
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
