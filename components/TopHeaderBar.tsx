'use client';

export function TopHeaderBar() {
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 h-8 flex items-center justify-between px-6 border-b"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      <div className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
        Portfolio
      </div>
      <div className="text-xs font-medium" style={{ color: 'var(--foreground)' }}>
        Achchutha Rengan
      </div>
      <div className="text-xs font-medium" style={{ color: 'var(--secondary)' }}>
        {currentDate}
      </div>
    </div>
  );
}
