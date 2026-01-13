export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-5xl font-bold mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          Welcome to BrandNewPortfolio
        </h1>
        <p
          className="text-xl mb-8 leading-relaxed"
          style={{ color: 'var(--secondary)' }}
        >
          A dual-mode portfolio platform that adapts to your mood. Switch between
          Professional and Playful themes using the toggle above.
        </p>
        <div
          className="p-8 rounded-lg border-2"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border)',
          }}
        >
          <h2
            className="text-2xl font-semibold mb-4"
            style={{ color: 'var(--foreground)' }}
          >
            Features
          </h2>
          <ul className="space-y-3" style={{ color: 'var(--foreground)' }}>
            <li>✨ Dual-mode theme system (Professional & Playful)</li>
            <li>♿ Full accessibility support with keyboard navigation</li>
            <li>🎨 Brutalist color scheme in Playful mode</li>
            <li>💾 Theme preference persisted across visits</li>
            <li>⚡ No hydration flash - server-side theme detection</li>
            <li>🎯 Skip-to-content link for screen readers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
