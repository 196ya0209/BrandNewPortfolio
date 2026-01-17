'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 15,
        mass: 1,
        duration: 0.8,
      }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4"
    >
      <nav
        className={`
          backdrop-blur-xl
          rounded-full
          px-8 py-3
          border
          transition-all
          duration-500
          ${isScrolled ? 'navbar-scrolled' : ''}
        `}
        style={{
          backgroundColor: isScrolled ? 'rgba(3, 0, 20, 0.85)' : 'rgba(255, 255, 255, 0.03)',
          borderColor: isScrolled ? 'rgba(77, 162, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)',
          boxShadow: isScrolled ? '0 8px 32px -4px rgba(77, 162, 255, 0.15)' : 'none',
        }}
      >
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-[var(--primary)] ${
                  pathname === link.href ? 'active-link' : ''
                }`}
                style={{
                  color: pathname === link.href ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-l pl-6 ml-2" style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
