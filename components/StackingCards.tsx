'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  accentColor: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and seamless checkout experience. Built with Next.js, TypeScript, and modern payment integrations.',
    category: 'Web Development',
    year: '2024',
    accentColor: '#ff6b6b',
    image: '/api/placeholder/600/400',
  },
  {
    id: 2,
    title: 'Design System',
    description: 'Comprehensive component library with accessibility-first approach and extensive documentation. Over 50+ reusable components with dark mode support.',
    category: 'UI/UX Design',
    year: '2024',
    accentColor: '#4ecdc4',
    image: '/api/placeholder/600/400',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking experience with biometric authentication and instant transfers. Serving over 100k+ active users.',
    category: 'Mobile Development',
    year: '2023',
    accentColor: '#ffe66d',
    image: '/api/placeholder/600/400',
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation tool that generates high-quality copy for various platforms. Integrated with GPT-4 and custom fine-tuned models.',
    category: 'AI/ML',
    year: '2023',
    accentColor: '#a29bfe',
    image: '/api/placeholder/600/400',
  },
];

// Animated line component - animates from left to right
function AnimatedLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.15 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className="w-full h-[1px]"
      style={{ backgroundColor: 'var(--foreground)', transformOrigin: 'left' }}
    />
  );
}

// Geometric shapes component for card image overlay
// Not shown in playful (neobrutalism) theme per user request
function GeometricShapes({ accentColor, theme }: { accentColor: string; theme: string }) {
  // Don't render geometric shapes in playful theme (user requested removal of floating elements)
  if (theme === 'playful') {
    return null;
  }
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Circle */}
      <motion.div
        className="absolute top-[15%] left-[20%] w-16 h-16 rounded-full border-[3px]"
        style={{ borderColor: accentColor }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Square */}
      <motion.div
        className="absolute top-[40%] right-[25%] w-12 h-12 border-[3px]"
        style={{ borderColor: accentColor }}
        animate={{
          y: [0, 8, 0],
          rotate: [45, 55, 45],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      
      {/* Triangle */}
      <motion.div
        className="absolute bottom-[20%] left-[30%]"
        animate={{
          y: [0, -12, 0],
          rotate: [0, -8, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke={accentColor} strokeWidth="3">
          <polygon points="25,5 45,45 5,45" />
        </svg>
      </motion.div>

      {/* Small filled circle */}
      <motion.div
        className="absolute top-[60%] right-[15%] w-6 h-6 rounded-full"
        style={{ backgroundColor: accentColor, opacity: 0.6 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />

      {/* Small square */}
      <motion.div
        className="absolute top-[25%] right-[40%] w-8 h-8"
        style={{ backgroundColor: accentColor, opacity: 0.4 }}
        animate={{
          rotate: [0, 90, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8,
        }}
      />
    </div>
  );
}

export function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState('professional');
  
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

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
            >
              Featured Projects
            </motion.h2>
            
            {/* Animated line below title - left to right */}
            <div className="max-w-md mx-auto mb-6">
              <AnimatedLine delay={0.3} />
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto"
              style={{ color: 'var(--secondary)' }}
            >
              A curated selection of projects showcasing creativity, technical expertise, and problem-solving skills.
            </motion.p>
          </div>

          {/* Full width line before cards */}
          <AnimatedLine delay={0.4} />

          {/* Project Cards - Sequential layout (not stacking) */}
          <div ref={containerRef} className="space-y-16 mt-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                theme={currentTheme}
              />
            ))}
          </div>
          
          {/* Full width line after cards */}
          <div className="mt-16">
            <AnimatedLine delay={0.2} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  theme: string;
}

function ProjectCard({ project, index, theme }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative"
    >
      {/* Card with beige background - fully clickable */}
      <motion.div
        className="rounded-3xl overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl cursor-pointer"
        style={{
          backgroundColor: '#f5f0e8', // Beige background
          border: '2px solid #e8e3db',
        }}
        whileHover={{ scale: 1.01, y: -5 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => {
          // Handle project click - can navigate to project page
          console.log(`Navigate to project: ${project.title}`);
        }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left side - Text content */}
          <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              {/* Category and Year */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{ 
                    backgroundColor: project.accentColor + '20',
                    color: '#1a1a1a',
                    border: `1px solid ${project.accentColor}50`
                  }}
                >
                  {project.category}
                </span>
                <span className="text-sm font-medium" style={{ color: '#666666' }}>
                  {project.year}
                </span>
              </div>

              {/* Project number */}
              <span
                className="text-7xl md:text-8xl font-bold block mb-4"
                style={{ 
                  color: project.accentColor,
                  opacity: 0.15,
                  fontFamily: 'var(--hero-font)',
                }}
              >
                {String(project.id).padStart(2, '0')}
              </span>

              {/* Title */}
              <h3
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                style={{ color: '#1a1a1a', fontFamily: 'var(--hero-font)' }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                className="text-lg md:text-xl leading-relaxed mb-8"
                style={{ color: '#4a4a4a' }}
              >
                {project.description}
              </p>
            </div>

            {/* Button */}
            <div>
              <motion.button
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all group"
                style={{
                  backgroundColor: '#1a1a1a',
                  color: '#f5f0e8',
                }}
                whileHover={{ scale: 1.03, backgroundColor: project.accentColor }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click
                  console.log(`Explore project: ${project.title}`);
                }}
              >
                Explore Project
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  className="transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Right side - Image with blur and geometric shapes */}
          <div className="flex-1 relative min-h-[300px] lg:min-h-[500px]">
            {/* Blurred background image */}
            <div 
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, ${project.accentColor}30 0%, ${project.accentColor}10 50%, #f5f0e8 100%)`,
              }}
            >
              {/* Placeholder image with blur effect */}
              <div 
                className="absolute inset-4 md:inset-8 rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: project.accentColor + '15',
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Inner image container with additional blur */}
                <div 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at center, ${project.accentColor}20 0%, transparent 70%)`,
                  }}
                >
                  {/* Mock project preview */}
                  <div 
                    className="w-4/5 h-3/5 rounded-xl shadow-2xl"
                    style={{
                      backgroundColor: '#ffffff',
                      opacity: 0.9,
                      filter: 'blur(2px)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Geometric shapes overlay */}
            <GeometricShapes accentColor={project.accentColor} theme={theme} />
          </div>
        </div>
      </motion.div>
      
      {/* Animated line below each card (except last) */}
      {index < projects.length - 1 && (
        <div className="mt-16">
          <AnimatedLine delay={0.3} />
        </div>
      )}
    </motion.div>
  );
}
