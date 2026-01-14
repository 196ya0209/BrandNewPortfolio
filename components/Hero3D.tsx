'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  useEffect(() => {
    // Parallax scroll effect for hero
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  const name = "196ya0209";
  const characters = name.split('');

  return (
    <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto text-center px-4 z-10">
        {/* Animated Name - Much Larger */}
        <div className="mb-12">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-bold mb-8 leading-[0.9] overflow-hidden"
            style={{ fontFamily: 'var(--hero-font)' }}
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.08,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="inline-block hover:text-[var(--primary)] transition-colors duration-300"
                style={{ color: 'var(--foreground)' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle - Larger and More Prominent */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="text-2xl md:text-4xl leading-relaxed max-w-4xl mx-auto font-medium"
          style={{ color: 'var(--secondary)' }}
        >
          A dual-mode portfolio platform that adapts to your mood. Switch between
          Professional and Playful themes using the toggle above.
        </motion.p>

        {/* Decorative animated background glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1.5, opacity: 0.15 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
