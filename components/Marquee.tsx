'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function Marquee() {
  const text = "FULL-STACK DEVELOPER • CREATIVE CODER • PROBLEM SOLVER • WEB ENTHUSIAST • ";
  const repeatedText = text.repeat(3);
  const textRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth / 3);
    }
  }, []);

  return (
    <div className="py-8 overflow-hidden border-y" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: textWidth > 0 ? [0, -textWidth] : [0, -1000],
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
        <span ref={textRef} className="text-2xl md:text-4xl font-bold pr-4" style={{ color: 'var(--primary)' }}>
          {repeatedText}
        </span>
      </motion.div>
    </div>
  );
}
