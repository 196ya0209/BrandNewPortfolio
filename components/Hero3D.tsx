'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LiquidText } from './LiquidText';

// Color palettes for "Surprise Me" feature (no dark themes)
const colorPalettes = [
  { bg: '#f5f0e8', fg: '#1a1a1a', accent: '#333333' }, // Cream/Dark (default professional)
  { bg: '#fef3c7', fg: '#0f0f0f', accent: '#ff6b6b' }, // Warm yellow (neobrutalism)
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

// Marquee animation constants
const MARQUEE_REPEAT_COUNT = 10;
const MARQUEE_DURATION_SECONDS = 20;

// Scrolling text marquee for neobrutalism theme
function ScrollingTextBorder({ text, direction = 'left', theme }: { text: string; direction?: 'left' | 'right'; theme: string }) {
  if (theme !== 'playful') return null;
  
  const repeatedText = Array(MARQUEE_REPEAT_COUNT).fill(text).join(' • ');
  
  return (
    <div className="w-full overflow-hidden py-3 border-y-3 border-black bg-white pointer-events-none">
      <motion.div
        className="whitespace-nowrap font-bold text-lg tracking-wide"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration: MARQUEE_DURATION_SECONDS,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{ color: 'var(--foreground)' }}
      >
        {repeatedText}
      </motion.div>
    </div>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [currentPalette, setCurrentPalette] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState('professional');
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'professional';
      setCurrentTheme(theme);
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });
    
    return () => observer.disconnect();
  }, []);

  const isPlayful = currentTheme === 'playful';
  const isSui = currentTheme === 'sui';

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

  // Get theme-specific styles
  const getHeaderStyle = () => {
    if (isPlayful) {
      return {
        border: '3px solid var(--border)',
        boxShadow: '4px 4px 0 var(--border)',
        backgroundColor: 'var(--card-bg)',
      };
    }
    if (isSui) {
      return {
        backgroundColor: 'rgba(10, 22, 40, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--border)',
      };
    }
    return {};
  };

  return (
    <>
      {/* Header bar - slim with full-width line below */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div 
          className={`px-6 py-3 flex items-center justify-between ${isPlayful ? 'mx-4 mt-2 rounded-lg' : ''}`}
          style={getHeaderStyle()}
        >
          {/* Left - Hola */}
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-xs font-medium tracking-wider ${isPlayful ? 'retro-glitch' : ''} ${isSui ? 'sui-gradient-text' : ''}`}
            style={{ color: 'var(--foreground)' }}
            data-text="Hola"
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
              className={`text-xs font-medium tracking-wider ${isSui ? 'sui-gradient-text' : ''}`}
              style={{ color: 'var(--foreground)' }}
            >
              Portfolio
            </span>
          </motion.div>

          {/* Right - Theme name with line + Surprise Me icon */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="flex flex-col items-end">
              <span 
                className={`text-xs font-medium tracking-wider ${isSui ? 'sui-gradient-text' : ''}`}
                style={{ color: 'var(--foreground)' }}
              >
                {isPlayful ? 'Neobrutalism' : isSui ? 'Sui' : 'Professional'}
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={`w-12 mt-0.5 ${isPlayful ? 'h-[3px]' : 'h-[1px]'}`}
                style={{ backgroundColor: 'var(--foreground)', transformOrigin: 'right' }}
              />
            </div>
            
            {/* Surprise Me Icon Button */}
            <motion.button
              onClick={handleSurpriseMe}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isPlayful ? 'neo-button rounded-lg' : ''} ${isSui ? 'sui-button' : ''}`}
              style={{ 
                backgroundColor: isSui ? 'transparent' : 'var(--foreground)', 
                color: isSui ? 'var(--primary)' : 'var(--background)',
                border: isSui ? '1px solid var(--primary)' : 'none',
              }}
              whileHover={{ scale: isPlayful ? 1 : 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Surprise Me"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ 
                    backgroundColor: 'transparent', 
                    color: 'var(--foreground)',
                    border: '1px solid var(--foreground)',
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Reset Colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                    <path d="M3 3v5h5"></path>
                  </svg>
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        
        {/* Full-width horizontal line below header - left to right animation */}
        {!isPlayful && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: isSui ? 0.3 : 0.15 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
            className="w-full h-[1px]"
            style={{ backgroundColor: 'var(--foreground)', transformOrigin: 'left' }}
          />
        )}
      </div>

      {/* Scrolling text border for neobrutalism theme - top */}
      <div className="fixed top-[60px] left-0 right-0 z-30 pointer-events-none">
        <ScrollingTextBorder text="DREAMER • DEVELOPER • DESIGNER • CREATOR" direction="left" theme={currentTheme} />
      </div>

      {/* Hero Section */}
      <div ref={containerRef} className={`relative w-full h-screen min-h-[100vh] overflow-hidden flex flex-col items-center justify-center ${isPlayful ? 'pt-20' : ''}`}>
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

          {/* Full-width Horizontal Line - left to right animation */}
          <motion.hr
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: isPlayful ? 1 : 0.3 }}
            transition={{
              duration: 1.5,
              delay: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className={`w-full mx-auto my-1 ${isPlayful ? 'border-t-[3px]' : 'border-t'}`}
            style={{ borderColor: 'var(--foreground)', transformOrigin: 'left' }}
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
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wider mb-4 ${isPlayful ? 'retro-glitch font-bold' : ''} ${isSui ? 'sui-gradient-text' : ''}`}
            style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
            data-text="Full Stack Developer"
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
              className={`flex flex-col items-center gap-1 cursor-pointer ${isPlayful ? 'retro-shake' : ''}`}
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

      {/* Scrolling text border for neobrutalism theme - between sections */}
      <ScrollingTextBorder text="REACT • NEXT.JS • TYPESCRIPT • NODE.JS • UI/UX" direction="right" theme={currentTheme} />

      {/* About Section - Same background, smooth character slide-up reveal */}
      <div 
        ref={aboutRef}
        className="relative w-full min-h-screen flex items-center justify-center py-32 px-6 z-10"
      >
        <div className={`max-w-5xl mx-auto ${isPlayful ? 'neo-card p-8 rounded-lg' : ''} ${isSui ? 'sui-card p-8' : ''}`}>
          <div className="text-center">
            {/* Main paragraph with smooth character-by-character reveal */}
            <p 
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.4] font-medium mb-16 ${isSui ? 'sui-gradient-text' : ''}`}
              style={{ color: isSui ? undefined : 'var(--foreground)' }}
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
                  className={`px-5 py-2.5 text-sm font-medium cursor-pointer ${isPlayful ? 'neo-button rounded-lg' : 'rounded-full'} ${isSui ? 'sui-button' : ''}`}
                  style={{ 
                    backgroundColor: isPlayful ? 'var(--card-bg)' : isSui ? 'transparent' : 'transparent', 
                    color: 'var(--foreground)',
                    border: isSui ? '1px solid var(--primary)' : isPlayful ? '3px solid var(--border)' : '1px solid var(--border)'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                  whileHover={isPlayful ? {} : { 
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

      {/* Bottom scrolling text border for neobrutalism theme */}
      <ScrollingTextBorder text="LET'S BUILD SOMETHING AMAZING TOGETHER" direction="left" theme={currentTheme} />
    </>
  );
}
