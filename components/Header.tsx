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
      className="fixed top-14 left-0 right-0 z-40 flex justify-center px-4"
    >
      <nav
        className={`
          backdrop-blur-md
          rounded-full
          px-4 py-1.5
          border
          transition-all
          duration-300
          ${isScrolled ? 'navbar-scrolled shadow-sm' : ''}
        `}
        style={{
          backgroundColor: 'rgba(var(--background-rgb), 0.6)',
          borderColor: 'var(--border)',
        }}
      >
        <ul className="flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href} className="relative">
              <Link
                href={link.href}
                className="text-xs font-medium transition-all hover:opacity-80 flex items-center gap-1.5 py-1 px-1"
                style={{
                  color: pathname === link.href ? 'var(--primary)' : 'var(--foreground)',
                }}
              >
                {/* Glowing circle indicator for active page */}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ 
                      backgroundColor: 'var(--primary)',
                      boxShadow: '0 0 8px var(--primary), 0 0 16px var(--primary)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </Link>
            </li>
          ))}
          <li className="border-l pl-3" style={{ borderColor: 'var(--border)' }}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
