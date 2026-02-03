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
      className="min-h-screen relative cursor-pointer"
      onClick={onProceed}
      style={{ background: colors.darkBg }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <Scene />
      </Canvas>
      
      {/* Overlay text */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl mb-4 text-center"
          style={{
            fontFamily: 'var(--font-great-vibes)',
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: `0 0 40px ${colors.primaryPink}66`,
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome, Mu ✨
        </motion.h1>
        
        <motion.p
          className="text-xl mt-8"
          style={{
            fontFamily: 'var(--font-dancing-script)',
            color: colors.lightPink,
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Tap to begin your journey 💕
        </motion.p>
      </motion.div>
    </div>
  );
}
