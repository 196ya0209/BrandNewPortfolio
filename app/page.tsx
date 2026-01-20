import { NewHeroSection } from '@/components/NewHeroSection';
import { AboutMeSection } from '@/components/AboutMeSection';
import { ProjectsSection } from '@/components/ProjectsSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Full-Stack Developer text */}
      <NewHeroSection />

      {/* About Me Section with emojis and 3D elements */}
      <AboutMeSection />

      {/* Projects Section with rounded cards */}
      <ProjectsSection />
    </div>
  );
}
