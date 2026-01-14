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
  { href: '/admin', label: 'Admin' },
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
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4"
    >
      <nav
        className={`
          backdrop-blur-lg
          rounded-full
          px-6 py-2.5
          border
          shadow-lg
          transition-all
          duration-300
          ${isScrolled ? 'navbar-scrolled' : ''}
        `}
        style={{
          backgroundColor: 'rgba(var(--background-rgb), 0.7)',
          borderColor: 'var(--border)',
        }}
      >
        <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-all hover:scale-105 ${
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
          <li className="border-l pl-4" style={{ borderColor: 'var(--border)' }}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
