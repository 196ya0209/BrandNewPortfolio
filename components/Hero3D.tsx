'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LiquidText } from './LiquidText';

// Color palettes for "Surprise Me" feature (no dark themes)
const colorPalettes = [
  { bg: '#f5f0e8', fg: '#1a1a1a', accent: '#333333' }, // Cream/Dark (default professional)
  { bg: '#ffe066', fg: '#1a1a1a', accent: '#ff8fab' }, // Yellow/Black (playful default)
  { bg: '#e9c46a', fg: '#264653', accent: '#2a9d8f' }, // Gold/Teal
  { bg: '#f1faee', fg: '#e63946', accent: '#457b9d' }, // White/Red
  { bg: '#dfe6e9', fg: '#2d3436', accent: '#0984e3' }, // Gray/Blue
  { bg: '#a29bfe', fg: '#2d3436', accent: '#6c5ce7' }, // Purple/Dark
  { bg: '#55efc4', fg: '#1a1a1a', accent: '#00b894' }, // Green/Dark
  { bg: '#ffeaa7', fg: '#d63031', accent: '#e17055' }, // Yellow/Red
  { bg: '#fab1a0', fg: '#2d3436', accent: '#e17055' }, // Peach/Dark
  { bg: '#74b9ff', fg: '#1a1a1a', accent: '#0984e3' }, // Blue/Dark
];

// Split text into characters for slide-up animation
function SplitTextCharacter({ children, className, style, delay = 0 }: { children: string; className?: string; style?: React.CSSProperties; delay?: number }) {
  const characters = children.split('');
  
  return (
    <span className={className} style={style}>
      {characters.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: delay + i * 0.02,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// Split text into words for smooth animation
function SplitText({ children, className, style, delay = 0 }: { children: string; className?: string; style?: React.CSSProperties; delay?: number }) {
  const words = children.split(' ');
  
  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.03,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  );
}

// Floating geometric shapes for playful mode - rich animations
function PlayfulShapes({ isPlayful }: { isPlayful: boolean }) {
  if (!isPlayful) return null;
  
  const shapes = [
    { type: 'circle', size: 80, x: '5%', y: '15%', delay: 0, color: '#ff8fab', rotation: 0 },
    { type: 'square', size: 60, x: '90%', y: '10%', delay: 0.5, color: '#74b9ff', rotation: 45 },
    { type: 'circle', size: 100, x: '85%', y: '70%', delay: 1, color: '#55efc4', rotation: 0 },
    { type: 'square', size: 50, x: '10%', y: '80%', delay: 1.5, color: '#ffeaa7', rotation: 15 },
    { type: 'circle', size: 40, x: '50%', y: '5%', delay: 2, color: '#ff9f43', rotation: 0 },
    { type: 'square', size: 70, x: '70%', y: '40%', delay: 0.3, color: '#a29bfe', rotation: 30 },
    { type: 'circle', size: 30, x: '25%', y: '60%', delay: 0.8, color: '#fd79a8', rotation: 0 },
    { type: 'square', size: 45, x: '40%', y: '85%', delay: 1.2, color: '#00cec9', rotation: 60 },
  ];
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.type === 'circle' ? 'rounded-full' : ''}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: shape.color,
            border: '3px solid #1a1a1a',
            rotate: shape.rotation,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            y: [0, -15, 0],
            rotate: [shape.rotation, shape.rotation + 5, shape.rotation],
          }}
          transition={{
            scale: { duration: 0.5, delay: shape.delay },
            opacity: { duration: 0.5, delay: shape.delay },
            y: { duration: 6, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' },
            rotate: { duration: 8, delay: shape.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}
    </div>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentPalette, setCurrentPalette] = useState<number | null>(null);
  const [isPlayful, setIsPlayful] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsPlayful(theme === 'playful');
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  // Surprise Me - Random color change
  const handleSurpriseMe = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * colorPalettes.length);
    } while (newIndex === currentPalette);
    
    setCurrentPalette(newIndex);
    const palette = colorPalettes[newIndex];
    
    // Apply colors to CSS variables
    document.documentElement.style.setProperty('--background', palette.bg);
    document.documentElement.style.setProperty('--foreground', palette.fg);
    document.documentElement.style.setProperty('--primary', palette.fg);
    document.documentElement.style.setProperty('--secondary', palette.accent);
    document.documentElement.style.setProperty('--accent', palette.accent);
    document.documentElement.style.setProperty('--border', palette.accent);
  }, [currentPalette]);

  // Reset colors to default
  const resetColors = useCallback(() => {
    setCurrentPalette(null);
    document.documentElement.style.removeProperty('--background');
    document.documentElement.style.removeProperty('--foreground');
    document.documentElement.style.removeProperty('--primary');
    document.documentElement.style.removeProperty('--secondary');
    document.documentElement.style.removeProperty('--accent');
    document.documentElement.style.removeProperty('--border');
  }, []);

  return (
    <>
      {/* Header bar - slim */}
      <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between">
        {/* Left - Hola */}
        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-medium tracking-wider"
          style={{ color: 'var(--foreground)' }}
        >
          Hola
        </motion.span>

        {/* Center - Portfolio */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 text-center"
        >
          <span 
            className="text-sm font-medium tracking-wider"
            style={{ color: 'var(--foreground)' }}
          >
            Portfolio
          </span>
        </motion.div>

        {/* Right - Professional text with line + Surprise Me icon */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <div className="flex flex-col items-end">
            <span 
              className="text-sm font-medium tracking-wider"
              style={{ color: 'var(--foreground)' }}
            >
              {isPlayful ? 'Playful' : 'Professional'}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="w-16 h-[1px] mt-1"
              style={{ backgroundColor: 'var(--foreground)', transformOrigin: 'right' }}
            />
          </div>
          
          {/* Surprise Me Icon Button */}
          <motion.button
            onClick={handleSurpriseMe}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--foreground)', 
              color: 'var(--background)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Surprise Me"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </motion.button>

          {/* Reset button (only shows when palette is changed) */}
          <AnimatePresence>
            {currentPalette !== null && (
              <motion.button
                onClick={resetColors}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--foreground)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                title="Reset Colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                  <path d="M3 3v5h5"></path>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating shapes for playful mode */}
      <AnimatePresence>
        <PlayfulShapes isPlayful={isPlayful} />
      </AnimatePresence>

      {/* Hero Section */}
      <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex flex-col items-center justify-center">
        <motion.div 
          className="w-full flex-1 flex flex-col items-center justify-center px-4 z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Liquid Text Animation - Main Hero "Dreamer" - Thicker, consumes whole hero */}
          <div className="w-full flex-1 max-h-[65vh] min-h-[350px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[500px]">
            <LiquidText 
              text="Dreamer" 
              className="w-full h-full"
              fontSize="large"
            />
          </div>

          {/* Full-width Horizontal Line */}
          <motion.hr
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="w-full mx-auto border-t my-1"
            style={{ borderColor: 'var(--foreground)', transformOrigin: 'center' }}
          />

          {/* Subtitle - Full Stack Developer */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.9,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wider mb-4"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
          >
            Full Stack Developer
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => aboutRef.current?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em]" style={{ color: 'var(--secondary)' }}>Scroll</span>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
                style={{ color: 'var(--secondary)' }}
              >
                <path d="M12 5v14M5 12l7 7 7-7"/>
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* About Section - Same background, smooth character slide-up reveal */}
      <div 
        ref={aboutRef}
        className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 z-10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Main paragraph with smooth character-by-character reveal */}
            <p 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.4] font-medium mb-16"
              style={{ color: 'var(--foreground)' }}
            >
              <SplitTextCharacter delay={0}>
                I&apos;m a passionate developer who loves creating beautiful, functional, and user-friendly digital experiences that make a difference.
              </SplitTextCharacter>
            </p>

            {/* Second paragraph with emojis - smooth reveal */}
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-[1.5] font-medium mb-20"
              style={{ color: 'var(--foreground)' }}
            >
              <SplitText delay={0.3}>
                🚀 Building the future, one line of code at a time ✨ Crafting experiences that users love 💡 Turning ideas into reality 🎨
              </SplitText>
            </motion.p>

            {/* Third paragraph */}
            <motion.p 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.5] mb-16"
              style={{ color: 'var(--secondary)' }}
            >
              <SplitText delay={0.5}>
                With expertise in React, Next.js, TypeScript, and Node.js, I bring designs to life with clean, maintainable code and pixel-perfect attention to detail.
              </SplitText>
            </motion.p>
            
            {/* Skills tags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {['React & Next.js', 'TypeScript', 'Node.js', 'UI/UX Design', 'WebGL', 'Animation'].map((skill, index) => (
                <motion.span 
                  key={skill}
                  className="px-5 py-2.5 rounded-full text-sm font-medium cursor-pointer"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                  whileHover={{ 
                    backgroundColor: 'var(--foreground)', 
                    color: 'var(--background)',
                    transition: { duration: 0.3 }
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
