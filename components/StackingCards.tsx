'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and seamless checkout experience.',
    category: 'Web Development',
    year: '2024',
    gradient: 'linear-gradient(135deg, rgba(77, 162, 255, 0.15) 0%, rgba(111, 188, 240, 0.05) 100%)',
  },
  {
    id: 2,
    title: 'Design System',
    description: 'Comprehensive component library with accessibility-first approach and extensive documentation.',
    category: 'UI/UX Design',
    year: '2024',
    gradient: 'linear-gradient(135deg, rgba(157, 78, 221, 0.15) 0%, rgba(167, 139, 250, 0.05) 100%)',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking experience with biometric authentication and instant transfers.',
    category: 'Mobile Development',
    year: '2023',
    gradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(52, 211, 153, 0.05) 100%)',
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation tool that generates high-quality copy for various platforms.',
    category: 'AI/ML',
    year: '2023',
    gradient: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15) 0%, rgba(251, 113, 133, 0.05) 100%)',
  },
];

export function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-32 md:py-40 relative" style={{ backgroundColor: 'transparent' }}>
      {/* Section background glow */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse, var(--primary) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase mb-6"
                style={{ 
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  color: 'var(--primary)'
                }}
              >
                Portfolio
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 text-gradient"
            >
              Featured Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl max-w-2xl mx-auto font-light"
              style={{ color: 'var(--secondary)' }}
            >
              A curated selection of projects showcasing creativity, technical expertise, and problem-solving skills.
            </motion.p>
          </div>

          {/* Stacking Cards Container */}
          <div ref={containerRef} className="relative">
            {projects.map((project, index) => (
              <StackingCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface StackingCardProps {
  project: Project;
  index: number;
  total: number;
}

function StackingCard({ project, index, total }: StackingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  // Calculate scale based on scroll position
  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.85, 0.95, 1]
  );

  // Calculate opacity based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0.3, 0.7, 1]
  );

  // Sticky positioning offset
  const stickyTop = 100 + index * 50;
  const isLastCard = index === total - 1;

  return (
    <motion.div
      ref={cardRef}
      style={{
        scale,
        opacity,
        position: 'sticky',
        top: `${stickyTop}px`,
        zIndex: total - index,
      }}
      className={`mb-8 ${!isLastCard ? 'will-change-transform' : ''}`}
    >
      <div
        className="rounded-3xl p-8 md:p-12 backdrop-blur-xl transition-all duration-500 hover:border-[var(--primary)] group"
        style={{
          background: project.gradient,
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <span
              className="text-6xl md:text-7xl font-bold text-gradient opacity-50"
            >
              {String(project.id).padStart(2, '0')}
            </span>
            <div>
              <p
                className="text-sm font-medium mb-2 tracking-wide uppercase"
                style={{ color: 'var(--primary)' }}
              >
                {project.category}
              </p>
              <h3
                className="text-3xl md:text-4xl font-bold"
                style={{ color: 'var(--foreground)' }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <div
            className="text-2xl md:text-3xl font-bold opacity-30 group-hover:opacity-60 transition-opacity"
            style={{ color: 'var(--foreground)' }}
          >
            {project.year}
          </div>
        </div>

        <p
          className="text-lg md:text-xl leading-relaxed mb-8 font-light"
          style={{ color: 'var(--secondary)' }}
        >
          {project.description}
        </p>

        <div className="flex items-center gap-4">
          <button
            className="glow-button px-6 py-3 rounded-full font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: '#ffffff',
              boxShadow: '0 8px 30px -8px var(--glow-color)',
            }}
          >
            View Project
          </button>
          <button
            className="px-6 py-3 rounded-full font-semibold transition-all hover:scale-105 hover:bg-white/10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'var(--foreground)',
              backgroundColor: 'transparent',
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </motion.div>
  );
}
