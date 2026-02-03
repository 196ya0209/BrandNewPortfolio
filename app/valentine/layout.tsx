import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '💕 A Special Surprise for Amritha',
  description: 'From Achchu with love',
};

export default function ValentineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: '#0a0a0a',
        minHeight: '100vh',
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
