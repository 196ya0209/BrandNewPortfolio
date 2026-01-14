import { Hero3D } from '@/components/Hero3D';
import { ScrollReveal } from '@/components/ScrollReveal';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* 3D Animated Hero Section */}
      <Hero3D />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
              style={{ color: 'var(--foreground)' }}
            >
              Features
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">✨</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  Dual-Mode Themes
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Switch between Professional and Playful themes to match your mood and context.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">♿</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  Fully Accessible
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Complete keyboard navigation support and screen reader friendly design.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">🎨</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  Minimal & Colorful
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Clean design with vibrant colors that don&apos;t overwhelm.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">💾</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  Persistent Preferences
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Your theme choice is saved and remembered across visits.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">⚡</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  No Flash
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Server-side theme detection prevents any hydration flash on load.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div
                className="p-8 rounded-xl border-2 card-hover"
                style={{
                  backgroundColor: 'var(--card-bg)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="text-4xl mb-4">🎯</div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ color: 'var(--foreground)' }}
                >
                  Modern Stack
                </h3>
                <p style={{ color: 'var(--secondary)' }}>
                  Built with Next.js 16, TypeScript, and Tailwind CSS 4.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl font-bold mb-8 text-center"
              style={{ color: 'var(--foreground)' }}
            >
              About This Project
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div
              className="p-12 rounded-xl border-2"
              style={{
                backgroundColor: 'var(--card-bg)',
                borderColor: 'var(--border)',
              }}
            >
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: 'var(--foreground)' }}
              >
                BrandNewPortfolio is designed to be a complete portfolio platform that adapts
                to different contexts and moods. Whether you&apos;re presenting work to potential
                clients or showcasing your creative side, this platform has you covered.
              </p>
              <p
                className="text-lg leading-relaxed"
                style={{ color: 'var(--secondary)' }}
              >
                Future sprints will add a rich text editor, database integration, content
                management features, and more. Stay tuned for updates!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal>
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              style={{ color: 'var(--foreground)' }}
            >
              Ready to Explore?
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              className="text-lg mb-8"
              style={{ color: 'var(--secondary)' }}
            >
              Try switching between themes to see how the design adapts.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
