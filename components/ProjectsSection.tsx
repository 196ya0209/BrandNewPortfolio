'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface Project {
  name: string;
  duration: string;
  color: string;
}

const projects: Project[] = [
  {
    name: 'E-Commerce Platform',
    duration: '6 months',
    color: '#2563eb',
  },
  {
    name: 'Portfolio Designer',
    duration: '3 months',
    color: '#7c3aed',
  },
  {
    name: 'Social Media App',
    duration: '8 months',
    color: '#059669',
  },
  {
    name: 'AI Content Generator',
    duration: '4 months',
    color: '#dc2626',
  },
  {
    name: 'Mobile Banking App',
    duration: '10 months',
    color: '#ea580c',
  },
  {
    name: 'Task Management Tool',
    duration: '5 months',
    color: '#0891b2',
  },
];

export function ProjectsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen py-32"
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-5xl md:text-7xl font-bold mb-20 text-center"
          style={{ color: 'var(--foreground)', fontFamily: 'var(--hero-font)' }}
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative rounded-3xl p-8 overflow-hidden cursor-pointer"
              style={{
                backgroundColor: 'var(--card-bg)',
                border: '2px solid var(--border)',
              }}
            >
              {/* Project Info */}
              <div className="relative z-10 mb-8">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2"
                  style={{ color: 'var(--foreground)' }}
                >
                  {project.name}
                </h3>
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--secondary)' }}
                >
                  {project.duration}
                </p>
              </div>

              {/* Blurred image container with shapes */}
              <div className="relative h-48 rounded-2xl overflow-hidden">
                {/* Blurred background */}
                <div
                  className="absolute inset-0 transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}40, ${project.color}20)`,
                    filter: 'blur(20px)',
                  }}
                />

                {/* White shapes on center */}
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  {/* Circle */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-12 h-12 rounded-full bg-white/80"
                  />

                  {/* Triangle */}
                  <motion.div
                    animate={{
                      rotate: [0, -360],
                      scale: [1, 1.15, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-12 h-12 bg-white/80"
                    style={{
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    }}
                  />

                  {/* Square */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="w-12 h-12 rounded-lg bg-white/80"
                  />
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${project.color}10, transparent)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
