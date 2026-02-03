'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { colors, gradients } from '@/lib/valentine-colors';

// Dynamic import for 3D elements to avoid SSR issues
const Floating3DElements = dynamic(() => import('./Floating3DElements'), {
  ssr: false,
  loading: () => null,
});

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
      className="flex-shrink-0 p-3 sm:p-4 rounded-lg shadow-2xl cursor-pointer"
      style={{
        background: colors.cream,
        width: 'min(280px, 70vw)',
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
        className="w-full aspect-square rounded flex items-center justify-center text-4xl sm:text-5xl md:text-6xl"
        style={{
          background: gradients.soft,
        }}
      >
        💕
      </div>
      {/* Caption */}
      <p
        className="mt-3 sm:mt-4 text-center text-sm sm:text-base md:text-lg"
        style={{
          fontFamily: "'Dancing Script', cursive",
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
      className="fixed inset-0 w-full h-full flex flex-col overflow-hidden"
      style={{ background: gradients.darkPink }}
    >
      {/* 3D Floating Elements Background */}
      <Floating3DElements 
        heartCount={10}
        starCount={6}
        sparkleCount={15}
        ringCount={3}
        spread={8}
      />

      {/* Header */}
      <motion.div
        className="text-center py-8 sm:py-12 px-4 relative z-10 flex-shrink-0"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-4"
          style={{
            fontFamily: "'Great Vibes', cursive",
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 20px ${colors.primaryPink}66)`,
          }}
        >
          Our Beautiful Memories 💕
        </h2>
        <p
          className="text-base sm:text-lg"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: colors.lightPink,
          }}
        >
          Scroll to explore our journey together
        </p>
      </motion.div>

      {/* Horizontal scroll gallery */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide relative z-10"
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className="flex gap-4 sm:gap-6 md:gap-8 px-6 sm:px-12 py-4 sm:py-8 min-w-max items-center h-full">
          {memories.map((memory, index) => (
            <PolaroidCard key={memory.id} memory={memory} index={index} />
          ))}
          
          {/* End card with proceed button */}
          <motion.div
            className="flex-shrink-0 flex flex-col items-center justify-center p-6 sm:p-8"
            style={{ width: 'min(300px, 80vw)' }}
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 text-center"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: colors.lightPink,
              }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              There&apos;s more to our story...
            </motion.p>
            <motion.button
              onClick={onProceed}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base"
              style={{
                background: gradients.primary,
                fontFamily: "'Inter', sans-serif",
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
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 text-sm sm:text-base"
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span style={{ color: colors.lightPink }}>Scroll</span>
        <span style={{ color: colors.lightPink }}>→</span>
      </motion.div>
    </div>
  );
}
