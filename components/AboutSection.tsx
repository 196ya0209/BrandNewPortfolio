'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Sphere, Box, Torus } from '@react-three/drei';

function FloatingShape({ position, color, type }: { position: [number, number, number]; color: string; type: 'sphere' | 'box' | 'torus' }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <group position={position}>
        {type === 'sphere' && (
          <Sphere args={[0.3, 32, 32]}>
            <meshStandardMaterial color={color} />
          </Sphere>
        )}
        {type === 'box' && (
          <Box args={[0.5, 0.5, 0.5]}>
            <meshStandardMaterial color={color} />
          </Box>
        )}
        {type === 'torus' && (
          <Torus args={[0.3, 0.1, 16, 32]}>
            <meshStandardMaterial color={color} />
          </Torus>
        )}
      </group>
    </Float>
  );
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="min-h-screen py-32 relative" style={{ backgroundColor: 'var(--background)' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" ref={containerRef}>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-12"
            style={{ color: 'var(--foreground)' }}
          >
            About Me 👨‍💻
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl leading-relaxed space-y-6"
            style={{ color: 'var(--foreground)' }}
          >
            <p>
              Hey there! 👋 I'm a passionate full-stack developer who loves creating 
              amazing web experiences ✨. I believe in writing clean, maintainable code 
              that makes both users and developers happy 😊.
            </p>
            <p>
              My journey in tech has been fueled by curiosity 🔍 and a love for solving 
              complex problems 🧩. Whether it's building sleek UIs with React or crafting 
              robust backend systems, I'm always excited to learn something new 🚀.
            </p>
            <p>
              When I'm not coding 💻, you might find me exploring the latest web technologies 🌐, 
              contributing to open source 🤝, or brainstorming the next big idea 💡. 
              Let's build something amazing together! 🎯
            </p>
          </motion.div>

          {/* 3D Floating Elements */}
          <div className="absolute right-0 top-0 w-1/4 h-full pointer-events-none opacity-50 hidden md:block">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <FloatingShape position={[-1, 2, 0]} color="#2563eb" type="sphere" />
              <FloatingShape position={[1, 0, 0]} color="#7c3aed" type="box" />
              <FloatingShape position={[0, -2, 0]} color="#059669" type="torus" />
            </Canvas>
          </div>
        </div>
      </div>
    </section>
  );
}
