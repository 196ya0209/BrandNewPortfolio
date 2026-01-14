export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-4xl font-bold mb-6"
          style={{ color: 'var(--foreground)' }}
        >
          About
        </h1>
        <p
          className="text-lg mb-8"
          style={{ color: 'var(--secondary)' }}
        >
          Learn more about this portfolio platform.
        </p>
        <div
          className="p-8 rounded-lg border-2"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderColor: 'var(--border)',
          }}
        >
          <p style={{ color: 'var(--foreground)' }}>
            About content coming soon...
          </p>
        </div>
      </div>
    </div>
  );
}
