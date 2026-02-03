'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { colors, threeColors, gradients, petNames } from '@/lib/valentine-colors';

interface StoryScreenProps {
  onRestart?: () => void;
}

const storyParagraphs = [
  {
    text: "From the moment I met you, I knew my life would never be the same...",
    emoji: "✨"
  },
  {
    text: "Every smile you give me lights up my entire world, Ammu.",
    emoji: "😊"
  },
  {
    text: "You're not just my love, you're my best friend, my partner, my everything.",
    emoji: "💕"
  },
  {
    text: "Through every up and down, you've been my constant, my anchor.",
    emoji: "⚓"
  },
  {
    text: "I fall in love with you more every single day, Amritha.",
    emoji: "💖"
  },
  {
    text: "You make me want to be a better person, just to deserve you.",
    emoji: "🌟"
  },
  {
    text: "Thank you for choosing me, for loving me, for being you.",
    emoji: "🙏"
  },
  {
    text: "Forever and always, my beautiful Mu.",
    emoji: "💝"
  },
];

// Seeded random for consistent positions
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function FloatingHeart({ position, delay, size = 0.15 }: { position: [number, number, number]; delay: number; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t * 0.8 + delay) * 0.5;
      mesh.current.position.x = position[0] + Math.sin(t * 0.5 + delay * 2) * 0.3;
      mesh.current.rotation.y = t * 0.3 + delay;
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
        emissiveIntensity={0.5}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function FloatingStar({ position, delay, size = 0.1 }: { position: [number, number, number]; delay: number; size?: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      const t = clock.getElapsedTime();
      mesh.current.position.y = position[1] + Math.sin(t * 0.6 + delay) * 0.4;
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
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

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

function Scene3D() {
  const elements = useMemo(() => {
    const hearts: { position: [number, number, number]; delay: number; size: number }[] = [];
    const stars: { position: [number, number, number]; delay: number; size: number }[] = [];
    const sparkles: { position: [number, number, number]; delay: number }[] = [];
    
    // Generate hearts
    for (let i = 0; i < 15; i++) {
      hearts.push({
        position: [
          (seededRandom(i * 7) - 0.5) * 16,
          (seededRandom(i * 7 + 1) - 0.5) * 10,
          (seededRandom(i * 7 + 2) - 0.5) * 8 - 3
        ],
        delay: seededRandom(i * 7 + 3) * 10,
        size: 0.1 + seededRandom(i * 7 + 4) * 0.15
      });
    }
    
    // Generate stars
    for (let i = 0; i < 10; i++) {
      stars.push({
        position: [
          (seededRandom(i * 11 + 100) - 0.5) * 16,
          (seededRandom(i * 11 + 101) - 0.5) * 10,
          (seededRandom(i * 11 + 102) - 0.5) * 6 - 2
        ],
        delay: seededRandom(i * 11 + 103) * 10,
        size: 0.08 + seededRandom(i * 11 + 104) * 0.1
      });
    }
    
    // Generate sparkles
    for (let i = 0; i < 25; i++) {
      sparkles.push({
        position: [
          (seededRandom(i * 13 + 200) - 0.5) * 20,
          (seededRandom(i * 13 + 201) - 0.5) * 12,
          (seededRandom(i * 13 + 202) - 0.5) * 10 - 4
        ],
        delay: seededRandom(i * 13 + 203) * 10
      });
    }
    
    return { hearts, stars, sparkles };
  }, []);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color={threeColors.pink} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color={threeColors.gold} />
      <pointLight position={[0, 0, 8]} intensity={0.3} color={0xffffff} />
      
      {elements.hearts.map((heart, i) => (
        <FloatingHeart key={`heart-${i}`} position={heart.position} delay={heart.delay} size={heart.size} />
      ))}
      {elements.stars.map((star, i) => (
        <FloatingStar key={`star-${i}`} position={star.position} delay={star.delay} size={star.size} />
      ))}
      {elements.sparkles.map((sparkle, i) => (
        <FloatingSparkle key={`sparkle-${i}`} position={sparkle.position} delay={sparkle.delay} />
      ))}
    </>
  );
}

export default function StoryScreen({ onRestart }: StoryScreenProps) {
  return (
    <div
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{ background: gradients.darkPink }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <Scene3D />
        </Canvas>
      </div>

      {/* Story Content - Scrollable */}
      <div className="relative z-10 h-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center justify-start py-12 sm:py-16 px-4 sm:px-6">
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-8 sm:mb-12 text-center"
            style={{
              fontFamily: "'Great Vibes', cursive",
              background: gradients.primary,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: `drop-shadow(0 0 20px ${colors.primaryPink}66)`,
            }}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Our Love Story 💕
          </motion.h1>

          {/* Story paragraphs */}
          <div className="max-w-2xl space-y-6 sm:space-y-8 mb-12 sm:mb-16 px-2">
            {storyParagraphs.map((para, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p
                  className="text-lg sm:text-xl md:text-2xl leading-relaxed"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    color: colors.cream,
                  }}
                >
                  {para.emoji} {para.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Pet names section */}
          <motion.div
            className="mb-12 sm:mb-16 w-full max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3
              className="text-2xl sm:text-3xl text-center mb-6 sm:mb-8"
              style={{
                fontFamily: "'Great Vibes', cursive",
                color: colors.primaryPink,
              }}
            >
              All the ways I call you 💝
            </h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
              {petNames.map((name, i) => (
                <motion.span
                  key={i}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm"
                  style={{
                    background: `${colors.darkSurface}cc`,
                    border: `1px solid ${colors.primaryPink}66`,
                    color: colors.lightPink,
                    fontFamily: "'Dancing Script', cursive",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{
                    scale: 1.1,
                    background: colors.primaryPink,
                    color: colors.white,
                  }}
                >
                  {name}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Final message */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div
              className="p-6 sm:p-8 rounded-3xl inline-block mx-4"
              style={{
                background: `${colors.darkSurface}dd`,
                border: `2px solid ${colors.primaryPink}`,
                boxShadow: `0 0 40px ${colors.primaryPink}44`,
              }}
            >
              <p
                className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  color: colors.primaryPink,
                }}
              >
                I Love You, Amritha 💖
              </p>
              <p
                className="text-lg sm:text-xl"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: colors.lightPink,
                }}
              >
                Forever yours, Achchu
              </p>
            </div>
          </motion.div>

          {/* Restart button */}
          {onRestart && (
            <motion.button
              onClick={onRestart}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-sm sm:text-base mb-8"
              style={{
                background: gradients.primary,
                fontFamily: "'Inter', sans-serif",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Experience Again 💕
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
}
