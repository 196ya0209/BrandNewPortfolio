'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function TravelingObject() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#2563eb"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export function Scene3D() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    // Sync 3D position with scroll
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (canvasRef.current) {
            const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const yOffset = scrollProgress * 100;
            canvasRef.current.style.transform = `translateY(${yOffset}vh)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={canvasRef}
      className="fixed top-0 right-0 w-1/3 h-screen pointer-events-none z-10 transition-transform duration-100"
      style={{ willChange: 'transform' }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <TravelingObject />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
