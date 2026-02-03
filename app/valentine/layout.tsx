import type { Metadata } from 'next';
import './valentine.css';

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
    <div className="valentine-container">
      {children}
    </div>
  );
}
