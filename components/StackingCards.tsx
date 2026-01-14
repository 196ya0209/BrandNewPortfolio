'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  year: string;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and seamless checkout experience.',
    category: 'Web Development',
    year: '2024',
    color: '#2563eb',
  },
  {
    id: 2,
    title: 'Design System',
    description: 'Comprehensive component library with accessibility-first approach and extensive documentation.',
    category: 'UI/UX Design',
    year: '2024',
    color: '#7c3aed',
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: 'Secure and intuitive mobile banking experience with biometric authentication and instant transfers.',
    category: 'Mobile Development',
    year: '2023',
    color: '#059669',
  },
  {
    id: 4,
    title: 'AI Content Generator',
    description: 'Machine learning powered content creation tool that generates high-quality copy for various platforms.',
    category: 'AI/ML',
    year: '2023',
    color: '#dc2626',
  },
];

export function StackingCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Featured Projects
            </motion.h2>
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
    [0.8, 0.95, 1]
  );

  // Calculate opacity based on scroll position
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6],
    [0, 0.5, 1]
  );

  // Sticky positioning offset
  const stickyTop = 80 + index * 40; // 80px initial + 40px per card
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
        className="rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm transition-all duration-500 hover:shadow-3xl group"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
          border: `2px solid ${project.color}30`,
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <span
              className="text-6xl md:text-7xl font-bold opacity-20"
              style={{ color: project.color }}
            >
              {String(project.id).padStart(2, '0')}
            </span>
            <div>
              <p
                className="text-sm font-medium mb-2"
                style={{ color: project.color }}
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
            className="text-2xl md:text-3xl font-bold opacity-30 group-hover:opacity-50 transition-opacity"
            style={{ color: 'var(--foreground)' }}
          >
            {project.year}
          </div>
        </div>

        <p
          className="text-lg md:text-xl leading-relaxed mb-8"
          style={{ color: 'var(--secondary)' }}
        >
          {project.description}
        </p>

        <div className="flex items-center gap-4">
          <button
            className="px-6 py-3 rounded-full font-medium transition-all hover:scale-105 hover:shadow-lg"
            style={{
              backgroundColor: project.color,
              color: '#ffffff',
            }}
          >
            View Project
          </button>
          <button
            className="px-6 py-3 rounded-full font-medium transition-all hover:scale-105"
            style={{
              border: `2px solid ${project.color}`,
              color: project.color,
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
