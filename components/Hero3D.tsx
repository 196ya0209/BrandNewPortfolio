'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LiquidText } from './LiquidText';

// Color palettes for "Surprise Me" feature
const colorPalettes = [
  { bg: '#f5f0e8', fg: '#1a1a1a', accent: '#333333' }, // Cream/Dark
  { bg: '#1a1a1a', fg: '#f5f0e8', accent: '#e8e3db' }, // Dark/Cream
  { bg: '#264653', fg: '#e9c46a', accent: '#f4a261' }, // Teal/Gold
  { bg: '#e63946', fg: '#f1faee', accent: '#a8dadc' }, // Red/White
  { bg: '#2d3436', fg: '#dfe6e9', accent: '#74b9ff' }, // Charcoal/Blue
  { bg: '#6c5ce7', fg: '#ffffff', accent: '#a29bfe' }, // Purple/White
  { bg: '#00b894', fg: '#ffffff', accent: '#55efc4' }, // Green/White
  { bg: '#fdcb6e', fg: '#2d3436', accent: '#e17055' }, // Yellow/Dark
  { bg: '#fd79a8', fg: '#2d3436', accent: '#e84393' }, // Pink/Dark
  { bg: '#0984e3', fg: '#ffffff', accent: '#74b9ff' }, // Blue/White
];

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

// Floating shapes for playful mode background - geometric style
function FloatingShapes({ isPlayful }: { isPlayful: boolean }) {
  if (!isPlayful) return null;
  
  // Geometric shapes with colorful gradients - inspired by Portfolio 2025
  const shapes = [
    { type: 'circle', size: 120, x: '8%', y: '15%', delay: 0, color: '#ff6b6b', opacity: 0.6 },
    { type: 'circle', size: 80, x: '85%', y: '20%', delay: 0.5, color: '#4ecdc4', opacity: 0.5 },
    { type: 'circle', size: 150, x: '75%', y: '65%', delay: 1, color: '#ffe66d', opacity: 0.4 },
    { type: 'circle', size: 60, x: '15%', y: '75%', delay: 1.5, color: '#a29bfe', opacity: 0.6 },
    { type: 'circle', size: 100, x: '50%', y: '85%', delay: 2, color: '#ff6b6b', opacity: 0.3 },
    // Add some smaller accent circles
    { type: 'circle', size: 40, x: '30%', y: '30%', delay: 0.3, color: '#4ecdc4', opacity: 0.7 },
    { type: 'circle', size: 30, x: '70%', y: '40%', delay: 0.8, color: '#ffe66d', opacity: 0.8 },
  ];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            backgroundColor: shape.color,
            opacity: shape.opacity,
            filter: 'blur(40px)',
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
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
      {/* Hero Section */}
      <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden flex flex-col items-center justify-center">
        {/* Floating shapes for playful mode */}
        <AnimatePresence>
          <FloatingShapes isPlayful={isPlayful} />
        </AnimatePresence>
        
        <motion.div 
          className="w-full flex-1 flex flex-col items-center justify-center px-4 z-10"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Liquid Text Animation - Main Hero "Dreamer" */}
          <div className="w-full flex-1 max-h-[55vh] min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[420px]">
            <LiquidText 
              text="Dreamer" 
              className="w-full h-full"
              fontSize="large"
            />
          </div>

          {/* Horizontal Line - Very thin and minimal spacing */}
          <motion.hr
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: isPlayful ? 0.5 : 0.3 }}
            transition={{
              duration: 1.2,
              delay: 0.6,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="w-24 md:w-32 mx-auto border-t my-2"
            style={{ borderColor: isPlayful ? 'var(--secondary)' : 'var(--foreground)', transformOrigin: 'center' }}
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
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed tracking-wider mb-6"
            style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
          >
            Full Stack Developer
          </motion.p>

          {/* Surprise Me Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex gap-3 mt-4"
          >
            <motion.button
              onClick={handleSurpriseMe}
              className="px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--foreground)', 
                color: 'var(--background)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Surprise Me
            </motion.button>
            {currentPalette !== null && (
              <motion.button
                onClick={resetColors}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                style={{ 
                  backgroundColor: 'transparent', 
                  color: 'var(--foreground)',
                  border: '1px solid var(--foreground)',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset
              </motion.button>
            )}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
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

      {/* About Section - Same background, smooth text reveal */}
      <div 
        ref={aboutRef}
        className="relative w-full min-h-screen flex items-center justify-center py-32 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Main paragraph with smooth word-by-word reveal */}
            <p 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.4] font-medium mb-16"
              style={{ color: 'var(--foreground)' }}
            >
              <SplitText delay={0}>
                I&apos;m a passionate developer who loves creating beautiful, functional, and user-friendly digital experiences that make a difference.
              </SplitText>
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
