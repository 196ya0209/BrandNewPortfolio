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
        yPercent: 15,
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
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-20">
      {/* Animated gradient orbs - Sui.io style */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Primary glow orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="glow-orb absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px]"
          style={{ 
            background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
            animationDelay: '0s'
          }}
        />
        {/* Secondary glow orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 2.5, delay: 0.5 }}
          className="glow-orb absolute top-1/3 right-0 w-[400px] h-[400px] md:w-[600px] md:h-[600px]"
          style={{ 
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            animationDelay: '-2s'
          }}
        />
        {/* Tertiary glow orb */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.3 }}
          transition={{ duration: 2.5, delay: 0.7 }}
          className="glow-orb absolute bottom-0 left-1/4 w-[500px] h-[500px]"
          style={{ 
            background: 'radial-gradient(circle, rgba(157, 78, 221, 0.5) 0%, transparent 70%)',
            animationDelay: '-4s'
          }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto text-center px-4 z-10">
        {/* Animated Name - Sui.io style large typography */}
        <div className="mb-8">
          <h1
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold leading-[0.85] tracking-tighter overflow-hidden"
            style={{ fontFamily: 'var(--hero-font)' }}
          >
            {characters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 120, rotateX: -90 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 120, rotateX: -90 }}
                transition={{
                  duration: 1,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block text-gradient"
                style={{ 
                  transformStyle: 'preserve-3d',
                }}
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Tagline - Sui.io style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.8,
            delay: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8"
        >
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase"
            style={{ 
              background: 'rgba(77, 162, 255, 0.1)',
              border: '1px solid rgba(77, 162, 255, 0.3)',
              color: 'var(--primary)'
            }}
          >
            Creative Developer & Designer
          </span>
        </motion.div>

        {/* Subtitle - Larger and More Prominent */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1,
            delay: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-light tracking-wide"
          style={{ color: 'var(--secondary)' }}
        >
          Building digital experiences that push boundaries. Crafting seamless 
          interfaces with cutting-edge technology and thoughtful design.
        </motion.p>

        {/* CTA Buttons - Sui.io style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{
            duration: 1,
            delay: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
        >
          <button
            className="glow-button px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: '#ffffff',
              boxShadow: '0 10px 40px -10px var(--glow-color)',
            }}
          >
            View My Work
          </button>
          <button
            className="px-8 py-4 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:bg-white/10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--foreground)',
              background: 'rgba(255, 255, 255, 0.05)',
            }}
          >
            Get In Touch
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--secondary)' }}>
              Scroll
            </span>
            <div 
              className="w-6 h-10 rounded-full flex justify-center pt-2"
              style={{ border: '1px solid rgba(255, 255, 255, 0.2)' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-2 rounded-full"
                style={{ background: 'var(--primary)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
