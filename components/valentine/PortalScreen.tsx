'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { colors, threeColors, gradients } from '@/lib/valentine-colors';

interface PortalScreenProps {
  onProceed: () => void;
}

function Starfield() {
  return <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />;
}

function ParticleVortex() {
  const points = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(500 * 3);
    const colors = new Float32Array(500 * 3);
    
    for (let i = 0; i < 500; i++) {
      const angle = (i / 500) * Math.PI * 8;
      const radius = 0.5 + (i / 500) * 4;
      const height = (i / 500) * 6 - 3;
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
      
      const t = i / 500;
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 0.41 + t * 0.19;
      colors[i * 3 + 2] = 0.71 - t * 0.21;
    }
    
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={0.08} vertexColors transparent opacity={0.8} />
    </points>
  );
}

function PulsingHeart() {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={threeColors.pink}
        emissive={threeColors.pink}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Starfield />
      <ParticleVortex />
      <PulsingHeart />
    </>
  );
}

export default function PortalScreen({ onProceed }: PortalScreenProps) {
  return (
    <div
      className="fixed inset-0 w-full h-full cursor-pointer overflow-hidden"
      onClick={onProceed}
      style={{ background: colors.darkBg }}
    >
      {/* 3D Canvas - fills entire screen */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 75 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene />
        </Canvas>
      </div>
      
      {/* Overlay text - centered with safe padding */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 py-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 text-center leading-tight whitespace-nowrap"
          style={{
            fontFamily: "'Great Vibes', cursive",
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: `drop-shadow(0 0 30px ${colors.primaryPink}88)`,
            letterSpacing: '0.02em',
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring', stiffness: 100 }}
        >
          Welcome, Mu ✨
        </motion.h1>
        
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl mt-8 text-center px-4"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: colors.lightPink,
            textShadow: `0 0 20px ${colors.primaryPink}44`,
            letterSpacing: '0.05em',
          }}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          Tap to begin your journey 💕
        </motion.p>
      </motion.div>
    </div>
  );
}
