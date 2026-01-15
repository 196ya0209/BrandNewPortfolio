'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LiquidText } from './LiquidText';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

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

  return (
    <>
      {/* Hero Section */}
      <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex flex-col items-center justify-center">
        <div className="w-full flex-1 flex flex-col items-center justify-center px-4 z-10">
          {/* Liquid Text Animation - Main Hero "Dreamer" - Takes most of the space */}
          <div className="w-full flex-1 max-h-[60vh] min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
            <LiquidText 
              text="Dreamer" 
              className="w-full h-full"
              fontSize="large"
            />
          </div>

          {/* Horizontal Line - Very thin and small */}
          <motion.hr
            initial={{ scaleX: 0, opacity: 0 }}
            animate={isInView ? { scaleX: 1, opacity: 0.4 } : { scaleX: 0, opacity: 0 }}
            transition={{
              duration: 1,
              delay: 0.5,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="w-32 md:w-48 mx-auto border-t my-4"
            style={{ borderColor: 'var(--foreground)', transformOrigin: 'center' }}
          />

          {/* Subtitle - Full Stack Developer with same font */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: 1,
              delay: 0.8,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed tracking-wide mb-8"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
          >
            Full Stack Developer
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--secondary)' }}>Scroll</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                style={{ color: 'var(--secondary)' }}
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </motion.div>
          </motion.div>

          {/* Decorative animated background glow */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1.5, opacity: 0.08 } : { scale: 0, opacity: 0 }}
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

      {/* About Me Section - Scroll Reveal */}
      <div 
        ref={aboutRef}
        className="relative w-full min-h-screen flex items-center justify-center py-24 px-4"
        style={{ backgroundColor: 'var(--muted)' }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center"
          >
            <h2 
              className="text-lg md:text-xl font-medium mb-8 tracking-widest uppercase"
              style={{ color: 'var(--secondary)' }}
            >
              About Me
            </h2>
            <p 
              className="text-3xl md:text-4xl lg:text-5xl leading-relaxed font-medium mb-12"
              style={{ color: 'var(--foreground)' }}
            >
              I&apos;m a passionate developer who loves creating beautiful, 
              functional, and user-friendly digital experiences that make a difference.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <span 
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
              >
                React & Next.js
              </span>
              <span 
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
              >
                TypeScript
              </span>
              <span 
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
              >
                Node.js
              </span>
              <span 
                className="px-6 py-3 rounded-full text-sm font-medium"
                style={{ 
                  backgroundColor: 'var(--card-bg)', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)'
                }}
              >
                UI/UX Design
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
