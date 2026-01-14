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
    <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex items-center justify-center pt-14">
      <div className="max-w-6xl mx-auto text-center px-4 z-10">
        {/* Animated Name */}
        <div className="mb-8">
          <h1
            className="text-7xl md:text-9xl font-bold mb-6 leading-tight overflow-hidden"
            style={{ fontFamily: 'var(--hero-font)' }}
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut",
                }}
                className="inline-block"
                style={{ color: 'var(--foreground)' }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="text-xl md:text-3xl leading-relaxed max-w-3xl mx-auto"
          style={{ color: 'var(--secondary)' }}
        >
          A dual-mode portfolio platform that adapts to your mood. Switch between
          Professional and Playful themes using the toggle above.
        </motion.p>

        {/* Decorative animated background glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="absolute inset-0 -z-10 pointer-events-none"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: 'var(--primary)' }}
          />
        </motion.div>
      </div>
    </div>
  );
}
