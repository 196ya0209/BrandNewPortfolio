export function Footer() {
  return (
    <footer
      className="border-t-2 mt-auto"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--background)',
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p style={{ color: 'var(--secondary)' }}>
            © {new Date().getFullYear()} BrandNewPortfolio. All rights reserved.
          </p>
          <p className="mt-2 text-sm" style={{ color: 'var(--secondary)' }}>
            Built with Next.js, featuring dual-mode themes for every mood.
          </p>
        </div>
      </div>
    </footer>
  );
}
