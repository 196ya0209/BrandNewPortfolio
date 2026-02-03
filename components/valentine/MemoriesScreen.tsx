'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { colors, gradients } from '@/lib/valentine-colors';

interface MemoriesScreenProps {
  onProceed: () => void;
}

const memories = [
  { id: 1, caption: 'Our first moment 💕', rotation: -3 },
  { id: 2, caption: 'Your beautiful smile 😊', rotation: 2 },
  { id: 3, caption: 'Adventures together 🌟', rotation: -2 },
  { id: 4, caption: 'Laughter and love 💖', rotation: 4 },
  { id: 5, caption: 'My favorite person 🥰', rotation: -1 },
  { id: 6, caption: 'Forever memories ✨', rotation: 3 },
  { id: 7, caption: 'You are my world 🌍', rotation: -4 },
  { id: 8, caption: 'Perfect moments 💝', rotation: 2 },
];

function PolaroidCard({ memory, index }: { memory: typeof memories[0]; index: number }) {
  return (
    <motion.div
      className="flex-shrink-0 p-4 rounded-lg shadow-2xl cursor-pointer"
      style={{
        background: colors.cream,
        width: 280,
        rotate: `${memory.rotation}deg`,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.2 },
      }}
    >
      {/* Photo placeholder */}
      <div
        className="w-full aspect-square rounded flex items-center justify-center text-6xl"
        style={{
          background: gradients.soft,
        }}
      >
        💕
      </div>
      {/* Caption */}
      <p
        className="mt-4 text-center text-lg"
        style={{
          fontFamily: 'var(--font-dancing-script)',
          color: colors.darkBg,
        }}
      >
        {memory.caption}
      </p>
    </motion.div>
  );
}

export default function MemoriesScreen({ onProceed }: MemoriesScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col"
      style={{ background: gradients.darkPink }}
    >
      {/* Header */}
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="text-4xl md:text-5xl mb-4"
          style={{
            fontFamily: 'var(--font-great-vibes)',
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Beautiful Memories 💕
        </h2>
        <p
          className="text-lg"
          style={{
            fontFamily: 'var(--font-dancing-script)',
            color: colors.lightPink,
          }}
        >
          Scroll to explore our journey together
        </p>
      </motion.div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-8 px-12 py-8 min-w-max items-center h-full">
          {memories.map((memory, index) => (
            <PolaroidCard key={memory.id} memory={memory} index={index} />
          ))}
          
          {/* End card with proceed button */}
          <motion.div
            className="flex-shrink-0 flex flex-col items-center justify-center p-8"
            style={{ width: 300 }}
          >
            <motion.p
              className="text-2xl mb-6 text-center"
              style={{
                fontFamily: 'var(--font-dancing-script)',
                color: colors.lightPink,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              There&apos;s more to our story...
            </motion.p>
            <motion.button
              onClick={onProceed}
              className="px-8 py-4 rounded-full text-white font-semibold"
              style={{
                background: gradients.primary,
                fontFamily: 'var(--font-inter)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Our Story 💕
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span style={{ color: colors.lightPink }}>Scroll</span>
        <span>→</span>
      </motion.div>
    </div>
  );
}
