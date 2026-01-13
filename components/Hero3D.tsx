'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (meshRef.current) {
      // GSAP animation for continuous rotation
      gsap.to(meshRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });

      // Breathing effect
      gsap.to(meshRef.current.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    }
  }, []);

  // Theme-based colors
  const sphereColor = theme === 'professional' ? '#2563eb' : '#ff6b6b';
  const emissiveColor = theme === 'professional' ? '#0ea5e9' : '#ffa500';

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color={sphereColor}
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        emissive={emissiveColor}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
}

export function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    // Animate text on load
    if (titleRef.current && subtitleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.6,
        }
      );
    }

    // Parallax scroll effect for hero
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen min-h-[100vh] overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="absolute inset-0"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />
        <AnimatedSphere />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            style={{ color: 'var(--foreground)' }}
          >
            Welcome to BrandNewPortfolio
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl mb-12 leading-relaxed"
            style={{ color: 'var(--secondary)' }}
          >
            A dual-mode portfolio platform that adapts to your mood. Switch between
            Professional and Playful themes using the toggle above.
          </p>
        </div>
      </div>
    </div>
  );
}
