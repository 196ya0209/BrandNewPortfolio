'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function NewHeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const title = 'Full-Stack Developer';
  const words = title.split(' ');

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-20"
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--primary) 0%, transparent 50%)',
        }}
      />

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          {/* Main Title with slide-up animation */}
          <div className="overflow-hidden mb-8">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none">
              {words.map((word, wordIndex) => (
                <div key={wordIndex} className="overflow-hidden inline-block">
                  {word.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={isLoaded ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: (wordIndex * word.length + charIndex) * 0.05,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                      className="inline-block"
                      style={{
                        color: 'var(--foreground)',
                        fontFamily: 'var(--hero-font)',
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                  {wordIndex < words.length - 1 && (
                    <span className="inline-block w-6 md:w-12" />
                  )}
                </div>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            className="text-xl md:text-3xl max-w-3xl mx-auto"
            style={{ color: 'var(--secondary)' }}
          >
            Crafting exceptional digital experiences with modern technologies
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isLoaded ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl pointer-events-none -z-10"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </div>
      </div>
    </section>
  );
}
