import { Hero3D } from '@/components/Hero3D';
import { ScrollReveal } from '@/components/ScrollReveal';
import { StackingCards } from '@/components/StackingCards';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Gradient background overlay */}
      <div className="gradient-bg" />

      {/* 3D Animated Hero Section */}
      <Hero3D />

      {/* Stacking Cards Projects Section */}
      <StackingCards />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24 md:py-32 relative">
        {/* Section glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] -z-10 opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase mb-6"
                style={{ 
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  color: 'var(--primary)'
                }}
              >
                What I Offer
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold text-gradient"
              >
                Features & Capabilities
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={0.1}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(77, 162, 255, 0.1)' }}
                >
                  ✨
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Modern Design
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Clean, minimal aesthetics with smooth animations and cutting-edge visual effects.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(157, 78, 221, 0.1)' }}
                >
                  ♿
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Fully Accessible
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Complete keyboard navigation support and screen reader friendly design.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(16, 185, 129, 0.1)' }}
                >
                  ⚡
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Lightning Fast
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Optimized performance with server-side rendering and efficient code splitting.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(244, 63, 94, 0.1)' }}
                >
                  🎨
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Beautiful UI
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Glassmorphism, gradients, and glowing effects for a premium visual experience.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(77, 162, 255, 0.1)' }}
                >
                  📱
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Responsive
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Perfectly adapts to any screen size, from mobile devices to ultra-wide displays.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div
                className="p-8 rounded-2xl card-hover group h-full"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <div 
                  className="text-4xl mb-6 w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(157, 78, 221, 0.1)' }}
                >
                  🎯
                </div>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: 'var(--foreground)' }}
                >
                  Modern Stack
                </h3>
                <p className="font-light leading-relaxed" style={{ color: 'var(--secondary)' }}>
                  Built with Next.js 16, TypeScript, Tailwind CSS 4, and Framer Motion.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span 
                className="inline-block px-4 py-2 rounded-full text-sm font-medium tracking-wide uppercase mb-6"
                style={{ 
                  background: 'rgba(77, 162, 255, 0.1)',
                  border: '1px solid rgba(77, 162, 255, 0.3)',
                  color: 'var(--primary)'
                }}
              >
                About
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold text-gradient"
              >
                About This Project
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div
              className="p-10 md:p-14 rounded-3xl backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <p
                className="text-lg md:text-xl leading-relaxed mb-6 font-light"
                style={{ color: 'var(--foreground)' }}
              >
                This portfolio showcases a modern, premium web experience inspired by cutting-edge 
                design principles. Featuring smooth animations, glassmorphism effects, and a 
                sophisticated dark theme with vibrant accent colors.
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed font-light"
                style={{ color: 'var(--secondary)' }}
              >
                Built with the latest web technologies, this platform demonstrates expertise in 
                creating immersive digital experiences that captivate users and deliver exceptional 
                performance across all devices.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 md:py-40 relative">
        {/* CTA glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] -z-10 opacity-30"
          style={{
            background: 'radial-gradient(ellipse, var(--primary) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-gradient"
            >
              Ready to Build Something Amazing?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              className="text-lg md:text-xl mb-12 font-light"
              style={{ color: 'var(--secondary)' }}
            >
              Let&apos;s collaborate and create digital experiences that stand out.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="glow-button px-10 py-5 rounded-full font-semibold text-lg transition-all hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                  color: '#ffffff',
                  boxShadow: '0 15px 50px -15px var(--glow-color)',
                }}
              >
                Start a Project
              </button>
              <button
                className="px-10 py-5 rounded-full font-semibold text-lg transition-all hover:scale-105 hover:bg-white/10"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'var(--foreground)',
                  background: 'rgba(255, 255, 255, 0.03)',
                }}
              >
                View Resume
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
