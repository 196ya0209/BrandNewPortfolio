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

  const title = "Full-Stack Developer";
  const words = title.split(' ');

  return (
    <div id="hero" ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex items-center justify-center pt-20">
      <div className="max-w-7xl mx-auto text-center px-4 z-10">
        {/* Animated Title - Much Larger */}
        <div className="mb-12">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-8 leading-[0.9] overflow-hidden"
            style={{ fontFamily: 'var(--hero-font)' }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-6">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${wordIndex}-${charIndex}`}
                    initial={{ opacity: 0, y: 100 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                    transition={{
                      duration: 0.8,
                      delay: (wordIndex * word.length + charIndex) * 0.05,
                      ease: [0.25, 0.4, 0.25, 1],
                    }}
                    className="inline-block hover:text-[var(--primary)] transition-colors duration-300"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1,
            delay: 1.2,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="text-xl md:text-3xl leading-relaxed max-w-4xl mx-auto font-medium"
          style={{ color: 'var(--secondary)' }}
        >
          Building modern, scalable web applications with passion and precision ✨
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
