'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { colors, threeColors, gradients, petNames } from '@/lib/valentine-colors';

interface UniverseScreenProps {
  onProceed: () => void;
}

// Seeded random number generator for deterministic results
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

// Letter positions for "AMRITHA"
const letterPositions: { [key: string]: [number, number][] } = {
  A: [[-0.3, 0], [0.3, 0], [-0.5, -0.5], [0.5, -0.5], [-0.7, -1], [0.7, -1], [-0.2, -0.5], [0.2, -0.5], [0, 0.5]],
  M: [[-0.4, -1], [-0.4, 0], [-0.4, 0.5], [-0.2, 0.3], [0, 0], [0.2, 0.3], [0.4, 0.5], [0.4, 0], [0.4, -1]],
  R: [[-0.3, -1], [-0.3, 0], [-0.3, 0.5], [0, 0.5], [0.3, 0.3], [0.3, 0], [0, 0], [0.2, -0.5], [0.4, -1]],
  I: [[0, -1], [0, -0.5], [0, 0], [0, 0.5], [-0.2, 0.5], [0.2, 0.5], [-0.2, -1], [0.2, -1]],
  T: [[0, -1], [0, -0.5], [0, 0], [0, 0.5], [-0.4, 0.5], [0.4, 0.5], [-0.2, 0.5], [0.2, 0.5]],
  H: [[-0.3, -1], [-0.3, 0], [-0.3, 0.5], [0.3, -1], [0.3, 0], [0.3, 0.5], [-0.1, 0], [0.1, 0]],
};

function ConstellationStars({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  const starsData = useMemo(() => {
    const letters = ['A', 'M', 'R', 'I', 'T', 'H', 'A'];
    const stars: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    let seed = 0;
    
    letters.forEach((letter, letterIndex) => {
      const baseX = (letterIndex - 3) * 2.5;
      const positions = letterPositions[letter] || [];
      
      positions.forEach(([x, y]) => {
        seed++;
        const startPos = new THREE.Vector3(
          (seededRandom(seed) - 0.5) * 20,
          (seededRandom(seed + 1000) - 0.5) * 20,
          (seededRandom(seed + 2000) - 0.5) * 10
        );
        const endPos = new THREE.Vector3(baseX + x * 1.2, y * 1.2, 0);
        stars.push({ start: startPos, end: endPos });
      });
    });
    
    return stars;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {starsData.map((star, i) => {
        const pos = new THREE.Vector3().lerpVectors(star.start, star.end, progress);
        return (
          <mesh key={i} position={[pos.x, pos.y, pos.z]}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? threeColors.pink : threeColors.gold}
              emissive={i % 2 === 0 ? threeColors.pink : threeColors.gold}
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function Tiara({ visible, hoveredGem, onGemHover }: { visible: boolean; hoveredGem: number | null; onGemHover: (i: number | null) => void }) {
  const gems = 7;
  
  if (!visible) return null;
  
  return (
    <group position={[0, 2.5, 0]}>
      {/* Arc of tiara */}
      {[...Array(gems)].map((_, i) => {
        const angle = (i / (gems - 1)) * Math.PI - Math.PI / 2;
        const x = Math.sin(angle) * 4;
        const y = Math.cos(angle) * 0.8 + 0.5;
        const isHovered = hoveredGem === i;
        
        return (
          <group key={i} position={[x, y, 0]}>
            <mesh
              onPointerOver={() => onGemHover(i)}
              onPointerOut={() => onGemHover(null)}
            >
              <octahedronGeometry args={[isHovered ? 0.25 : 0.2, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? threeColors.pink : threeColors.gold}
                emissive={i % 2 === 0 ? threeColors.pink : threeColors.gold}
                emissiveIntensity={isHovered ? 1.5 : 0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

function BackgroundStars() {
  const starsRef = useRef<THREE.Points>(null);
  
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (seededRandom(i * 3) - 0.5) * 100;
      positions[i * 3 + 1] = (seededRandom(i * 3 + 1) - 0.5) * 100;
      positions[i * 3 + 2] = (seededRandom(i * 3 + 2) - 0.5) * 100;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <points ref={starsRef} geometry={geometry}>
      <pointsMaterial size={0.1} color={0xffffff} transparent opacity={0.6} />
    </points>
  );
}

function Scene({ progress, hoveredGem, onGemHover }: { progress: number; hoveredGem: number | null; onGemHover: (i: number | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color={threeColors.pink} />
      <pointLight position={[5, 0, 5]} intensity={0.5} color={threeColors.gold} />
      <BackgroundStars />
      <ConstellationStars progress={progress} />
      <Tiara visible={progress > 0.8} hoveredGem={hoveredGem} onGemHover={onGemHover} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function UniverseScreen({ onProceed }: UniverseScreenProps) {
  const [progress, setProgress] = useState(0);
  const [hoveredGem, setHoveredGem] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
        setProgress(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-animate progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 1) {
          clearInterval(timer);
          return 1;
        }
        return p + 0.005;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const displayedPetName = hoveredGem !== null ? petNames[hoveredGem % petNames.length] : null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ background: colors.darkBg }}
    >
      {/* 3D Canvas - fills entire screen */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 12], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene progress={progress} hoveredGem={hoveredGem} onGemHover={setHoveredGem} />
        </Canvas>
      </div>

      {/* Title */}
      <motion.h2
        className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center px-4 whitespace-nowrap"
        style={{
          fontFamily: "'Great Vibes', cursive",
          background: gradients.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: `drop-shadow(0 0 20px ${colors.primaryPink}66)`,
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        Your Name in the Stars ✨
      </motion.h2>

      {/* Overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-16 sm:pb-20 pointer-events-none px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {displayedPetName && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-1/4 px-4 sm:px-6 py-2 sm:py-3 rounded-full"
            style={{
              background: `${colors.darkSurface}dd`,
              border: `1px solid ${colors.primaryPink}`,
            }}
          >
            <p
              className="text-lg sm:text-xl md:text-2xl"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: colors.primaryPink,
              }}
            >
              {displayedPetName} 💕
            </p>
          </motion.div>
        )}

        <motion.button
          onClick={onProceed}
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full pointer-events-auto text-sm sm:text-base text-white font-semibold"
          style={{
            background: gradients.primary,
            fontFamily: "'Inter', sans-serif",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ opacity: progress > 0.9 ? 1 : 0 }}
        >
          Continue to Memories 💕
        </motion.button>
      </motion.div>
    </div>
  );
}
