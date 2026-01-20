'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { id: 'hero', label: 'Hero' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
];

export function GlassNavbar() {
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.5,
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
    >
      <div
        className="backdrop-blur-xl rounded-full px-6 py-3 border shadow-2xl"
        style={{
          backgroundColor: 'rgba(var(--background-rgb), 0.6)',
          borderColor: 'rgba(var(--background-rgb), 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        }}
      >
        <ul className="flex items-center gap-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => scrollToSection(link.id)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${activeSection === link.id ? 'scale-105' : 'hover:scale-105'}
                `}
                style={{
                  backgroundColor: activeSection === link.id ? 'var(--primary)' : 'transparent',
                  color: activeSection === link.id ? '#ffffff' : 'var(--foreground)',
                }}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
