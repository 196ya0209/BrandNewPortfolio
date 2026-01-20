import { Hero3D } from '@/components/Hero3D';
import { AboutSection } from '@/components/AboutSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { Marquee } from '@/components/Marquee';
import { GlassNavbar } from '@/components/GlassNavbar';
import { Scene3D } from '@/components/Scene3D';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 3D Traveling Object - Persists across all sections */}
      <Scene3D />

      {/* Glassmorphism Navigation */}
      <GlassNavbar />

      {/* Hero Section */}
      <Hero3D />

      {/* Marquee */}
      <Marquee />

      {/* About Me Section */}
      <AboutSection />

      {/* Marquee */}
      <Marquee />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Marquee */}
      <Marquee />
    </div>
  );
}
