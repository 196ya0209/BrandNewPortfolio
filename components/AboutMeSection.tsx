'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const floatingEmojis = ['🚀', '💻', '⚡', '🎨', '🔥', '✨', '🌟', '💡', '🎯', '🏆'];

// Pre-computed animation values to avoid Math.random in render
const emojiAnimations = [
  { x: 30, y: -20, duration: 4.5 },
  { x: -40, y: 25, duration: 3.8 },
  { x: 15, y: -35, duration: 4.2 },
  { x: -25, y: 40, duration: 3.5 },
  { x: 45, y: -15, duration: 4.8 },
  { x: -30, y: 30, duration: 4.0 },
  { x: 20, y: -40, duration: 3.7 },
  { x: -45, y: 20, duration: 4.3 },
  { x: 35, y: -25, duration: 3.9 },
  { x: -20, y: 35, duration: 4.6 },
];

export function AboutMeSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const aboutText = `I'm a passionate full-stack developer who loves building amazing web experiences. With a keen eye for design and a deep understanding of modern web technologies, I create solutions that are both beautiful and functional. 🎨 My journey in tech has been driven by curiosity and a desire to solve real-world problems. 💻 Whether it's crafting pixel-perfect UIs or architecting robust backends, I bring creativity and technical expertise to every project. ✨`;

  const words = aboutText.split(' ');

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden"
      style={{ backgroundColor: 'var(--muted)' }}
    >
      {/* Floating emojis */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? {
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
            x: [0, emojiAnimations[index].x, 0],
            y: [0, emojiAnimations[index].y, 0],
          } : { opacity: 0, scale: 0 }}
          transition={{
            duration: emojiAnimations[index].duration,
            delay: index * 0.2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute text-4xl md:text-6xl pointer-events-none"
          style={{
            left: `${10 + index * 8}%`,
            top: `${20 + (index % 3) * 25}%`,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <div className="container mx-auto px-4 z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-16 text-center"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
          >
            About Me
          </motion.h2>

          {/* Paragraph with slide-up animation */}
          <div
            className="text-2xl md:text-4xl leading-relaxed p-12 rounded-3xl backdrop-blur-sm border-2"
            style={{
              backgroundColor: 'rgba(var(--background-rgb), 0.8)',
              borderColor: 'var(--border)',
            }}
          >
            <p>
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.03,
                    ease: 'easeOut',
                  }}
                  className="inline-block mr-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* 3D Decorative shapes */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={isInView ? {
                  opacity: [0.1, 0.3, 0.1],
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                } : { opacity: 0, scale: 0, rotate: 0 }}
                transition={{
                  duration: 5 + i,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute rounded-full"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  background: `linear-gradient(135deg, var(--primary), var(--accent))`,
                  left: `${15 + i * 15}%`,
                  top: `${10 + i * 15}%`,
                  filter: 'blur(40px)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
