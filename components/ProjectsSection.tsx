'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  name: string;
  duration: string;
}

const projects: Project[] = [
  { id: 1, name: 'E-Commerce Platform', duration: 'Jan 2024 - Mar 2024' },
  { id: 2, name: 'Design System', duration: 'Apr 2024 - Jun 2024' },
  { id: 3, name: 'Mobile Banking App', duration: 'Jul 2023 - Dec 2023' },
  { id: 4, name: 'AI Content Generator', duration: 'Jan 2023 - Jun 2023' },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-3xl p-8 border-2 mb-8 overflow-hidden group hover:shadow-2xl transition-all duration-500"
      style={{
        backgroundColor: 'var(--card-bg)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Side - Project Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            {project.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--secondary)' }}>
            {project.duration}
          </p>
        </div>

        {/* Right Side - Blurred Image with Geometric Shapes */}
        <div className="flex-1 relative h-64 rounded-2xl overflow-hidden">
          {/* Blurred Background */}
          <div
            className="absolute inset-0 blur-2xl opacity-30"
            style={{
              background: `linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)`,
            }}
          />

          {/* Three White Geometric Shapes */}
          <div className="absolute inset-0 flex items-center justify-center gap-4">
            {/* Circle */}
            <motion.div
              className="w-16 h-16 rounded-full bg-white/90 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            />
            {/* Square */}
            <motion.div
              className="w-16 h-16 bg-white/90 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 45 }}
              transition={{ duration: 0.3 }}
            />
            {/* Triangle */}
            <motion.div
              className="w-0 h-0 shadow-lg"
              style={{
                borderLeft: '32px solid transparent',
                borderRight: '32px solid transparent',
                borderBottom: '55px solid rgba(255, 255, 255, 0.9)',
              }}
              whileHover={{ scale: 1.1, rotate: 120 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="min-h-screen py-32" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto" ref={containerRef}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-16 text-center"
            style={{ color: 'var(--foreground)' }}
          >
            Featured Projects
          </motion.h2>

          <div>
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
