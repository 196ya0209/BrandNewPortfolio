'use client';

import { useRef } from 'react';
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

function FloatingHeart({ position, delay }: { position: [number, number, number]; delay: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() + delay) * 0.5;
      mesh.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[0.15, 16, 16]} />
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

function FloatingStar({ position, delay }: { position: [number, number, number]; delay: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * 0.8 + delay) * 0.3;
      mesh.current.rotation.z = clock.getElapsedTime();
      const scale = 0.8 + Math.sin(clock.getElapsedTime() + delay) * 0.2;
      mesh.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[0.1, 0]} />
      <meshStandardMaterial
        color={threeColors.gold}
        emissive={threeColors.gold}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

function Scene3D() {
  const hearts = [
    [-3, 2, -2], [3, 1, -3], [-2, -1, -2], [4, 0, -4], [-4, 1.5, -3],
    [2, -2, -2], [-1, 2.5, -3], [1, -1.5, -2],
  ] as [number, number, number][];

  const stars = [
    [-2.5, 0, -2], [2.5, 2, -3], [0, -2, -2], [-3.5, -1, -4], [3.5, -0.5, -3],
    [-1.5, 1.5, -2], [1.5, -1, -2],
  ] as [number, number, number][];

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color={threeColors.pink} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color={threeColors.gold} />
      
      {hearts.map((pos, i) => (
        <FloatingHeart key={`heart-${i}`} position={pos} delay={i * 0.5} />
      ))}
      {stars.map((pos, i) => (
        <FloatingStar key={`star-${i}`} position={pos} delay={i * 0.7} />
      ))}
    </>
  );
}

export default function StoryScreen({ onRestart }: StoryScreenProps) {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: gradients.darkPink }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Story Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-start py-16 px-4 overflow-y-auto">
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl mb-12 text-center"
          style={{
            fontFamily: 'var(--font-great-vibes)',
            background: gradients.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Our Love Story 💕
        </motion.h1>

        {/* Story paragraphs */}
        <div className="max-w-2xl space-y-8 mb-16">
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
                className="text-xl md:text-2xl leading-relaxed"
                style={{
                  fontFamily: 'var(--font-dancing-script)',
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
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3
            className="text-3xl text-center mb-8"
            style={{
              fontFamily: 'var(--font-great-vibes)',
              color: colors.primaryPink,
            }}
          >
            All the ways I call you 💝
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl">
            {petNames.map((name, i) => (
              <motion.span
                key={i}
                className="px-4 py-2 rounded-full text-sm"
                style={{
                  background: `${colors.darkSurface}cc`,
                  border: `1px solid ${colors.primaryPink}66`,
                  color: colors.lightPink,
                  fontFamily: 'var(--font-dancing-script)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
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
          className="text-center mb-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div
            className="p-8 rounded-3xl inline-block"
            style={{
              background: `${colors.darkSurface}dd`,
              border: `2px solid ${colors.primaryPink}`,
              boxShadow: `0 0 40px ${colors.primaryPink}44`,
            }}
          >
            <p
              className="text-3xl md:text-4xl mb-4"
              style={{
                fontFamily: 'var(--font-great-vibes)',
                color: colors.primaryPink,
              }}
            >
              I Love You, Amritha 💖
            </p>
            <p
              className="text-xl"
              style={{
                fontFamily: 'var(--font-dancing-script)',
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
            className="px-8 py-4 rounded-full text-white font-semibold"
            style={{
              background: gradients.primary,
              fontFamily: 'var(--font-inter)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experience Again 💕
          </motion.button>
        )}
      </div>
    </div>
  );
}
