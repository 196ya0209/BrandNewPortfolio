'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
];

export function CapsuleNav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Detect active section
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        delay: 0.3,
      }}
      className={`fixed top-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled ? 'scale-95' : ''
      }`}
    >
      <div
        className="flex items-center gap-2 px-6 py-3 rounded-full backdrop-blur-xl border shadow-2xl"
        style={{
          background: 'rgba(var(--background-rgb), 0.6)',
          borderColor: 'rgba(var(--primary), 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === section.id ? 'text-white' : ''
            }`}
            style={{
              color: activeSection === section.id ? '#ffffff' : 'var(--foreground)',
            }}
          >
            {activeSection === section.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--primary)' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{section.label}</span>
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
