'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { threeColors } from '@/lib/valentine-colors';

// Seeded random for consistent positions
/**
 * Generates a pseudo-random number between 0 and 1 based on a seed value.
 * Uses a common GLSL-based algorithm for deterministic element positioning,
 * ensuring 3D elements appear in the same positions across renders.
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Floating Heart 3D
function FloatingHeart3D({ position, delay, size = 0.15 }: { position: [number, number, number]; delay: number; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t * 0.8 + delay) * 0.5;
      mesh.current.position.x = position[0] + Math.sin(t * 0.5 + delay * 2) * 0.3;
      mesh.current.rotation.y = t * 0.3 + delay;
      mesh.current.rotation.z = Math.sin(t * 0.5 + delay) * 0.2;
      const scale = 1 + Math.sin(t * 1.5 + delay) * 0.15;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={threeColors.pink}
        emissive={threeColors.pink}
        emissiveIntensity={0.6}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// Floating Star 3D
function FloatingStar3D({ position, delay, size = 0.1 }: { position: [number, number, number]; delay: number; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t * 0.6 + delay) * 0.4;
      mesh.current.position.x = position[0] + Math.cos(t * 0.4 + delay) * 0.2;
      mesh.current.rotation.x = t * 0.5;
      mesh.current.rotation.z = t * 0.8;
      const scale = 0.8 + Math.sin(t * 2 + delay) * 0.3;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={threeColors.gold}
        emissive={threeColors.gold}
        emissiveIntensity={0.9}
      />
    </mesh>
  );
}

// Floating Sparkle (small bright point)
function FloatingSparkle({ position, delay }: { position: [number, number, number]; delay: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t + delay) * 0.6;
      mesh.current.position.x = position[0] + Math.sin(t * 0.7 + delay * 3) * 0.4;
      const scale = 0.5 + Math.sin(t * 3 + delay) * 0.5;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshStandardMaterial
        color={0xffffff}
        emissive={0xffffff}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

// Ring/Orbit element
function FloatingRing({ position, delay }: { position: [number, number, number]; delay: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t * 0.5 + delay) * 0.3;
      mesh.current.rotation.x = t * 0.3 + delay;
      mesh.current.rotation.y = t * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <torusGeometry args={[0.15, 0.02, 8, 24]} />
      <meshStandardMaterial
        color={threeColors.pinkLight}
        emissive={threeColors.pinkLight}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Scene with all floating elements
interface Floating3DSceneProps {
  heartCount?: number;
  starCount?: number;
  sparkleCount?: number;
  ringCount?: number;
  spread?: number;
}

function Floating3DScene({ 
  heartCount = 12, 
  starCount = 8, 
  sparkleCount = 20,
  ringCount = 4,
  spread = 8 
}: Floating3DSceneProps) {
  const elements = useMemo(() => {
    const hearts: { position: [number, number, number]; delay: number; size: number }[] = [];
    const stars: { position: [number, number, number]; delay: number; size: number }[] = [];
    const sparkles: { position: [number, number, number]; delay: number }[] = [];
    const rings: { position: [number, number, number]; delay: number }[] = [];
    
    // Generate hearts
    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        position: [
          (seededRandom(i * 7) - 0.5) * spread * 2,
          (seededRandom(i * 7 + 1) - 0.5) * spread,
          (seededRandom(i * 7 + 2) - 0.5) * spread - 3
        ],
        delay: seededRandom(i * 7 + 3) * 10,
        size: 0.1 + seededRandom(i * 7 + 4) * 0.15
      });
    }
    
    // Generate stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        position: [
          (seededRandom(i * 11 + 100) - 0.5) * spread * 2,
          (seededRandom(i * 11 + 101) - 0.5) * spread,
          (seededRandom(i * 11 + 102) - 0.5) * spread - 2
        ],
        delay: seededRandom(i * 11 + 103) * 10,
        size: 0.08 + seededRandom(i * 11 + 104) * 0.1
      });
    }
    
    // Generate sparkles
    for (let i = 0; i < sparkleCount; i++) {
      sparkles.push({
        position: [
          (seededRandom(i * 13 + 200) - 0.5) * spread * 2.5,
          (seededRandom(i * 13 + 201) - 0.5) * spread * 1.5,
          (seededRandom(i * 13 + 202) - 0.5) * spread - 4
        ],
        delay: seededRandom(i * 13 + 203) * 10
      });
    }
    
    // Generate rings
    for (let i = 0; i < ringCount; i++) {
      rings.push({
        position: [
          (seededRandom(i * 17 + 300) - 0.5) * spread * 1.5,
          (seededRandom(i * 17 + 301) - 0.5) * spread,
          (seededRandom(i * 17 + 302) - 0.5) * spread - 2
        ],
        delay: seededRandom(i * 17 + 303) * 10
      });
    }
    
    return { hearts, stars, sparkles, rings };
  }, [heartCount, starCount, sparkleCount, ringCount, spread]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={threeColors.pink} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color={threeColors.gold} />
      <pointLight position={[0, 0, 8]} intensity={0.3} color={0xffffff} />
      
      {elements.hearts.map((heart, i) => (
        <FloatingHeart3D key={`heart-${i}`} position={heart.position} delay={heart.delay} size={heart.size} />
      ))}
      {elements.stars.map((star, i) => (
        <FloatingStar3D key={`star-${i}`} position={star.position} delay={star.delay} size={star.size} />
      ))}
      {elements.sparkles.map((sparkle, i) => (
        <FloatingSparkle key={`sparkle-${i}`} position={sparkle.position} delay={sparkle.delay} />
      ))}
      {elements.rings.map((ring, i) => (
        <FloatingRing key={`ring-${i}`} position={ring.position} delay={ring.delay} />
      ))}
    </>
  );
}

// Main wrapper component
interface Floating3DElementsProps {
  heartCount?: number;
  starCount?: number;
  sparkleCount?: number;
  ringCount?: number;
  spread?: number;
  className?: string;
}

export default function Floating3DElements({
  heartCount = 12,
  starCount = 8,
  sparkleCount = 20,
  ringCount = 4,
  spread = 8,
  className = ''
}: Floating3DElementsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <Canvas 
        camera={{ position: [0, 0, 10], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Floating3DScene 
          heartCount={heartCount}
          starCount={starCount}
          sparkleCount={sparkleCount}
          ringCount={ringCount}
          spread={spread}
        />
      </Canvas>
    </div>
  );
}
