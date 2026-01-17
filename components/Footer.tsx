'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const footerLinks = [
  { href: '/work', label: 'Work' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', label: 'Twitter', icon: '𝕏' },
  { href: '#', label: 'GitHub', icon: '⬡' },
  { href: '#', label: 'LinkedIn', icon: 'in' },
];

export function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        backgroundColor: 'transparent',
      }}
    >
      {/* Footer glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] -z-10 opacity-20"
        style={{
          background: 'radial-gradient(ellipse, var(--primary) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 
                className="text-2xl font-bold text-gradient mb-2"
              >
                196ya0209
              </h3>
              <p 
                className="text-sm font-light"
                style={{ color: 'var(--secondary)' }}
              >
                Creative Developer & Designer
              </p>
            </motion.div>

            {/* Navigation */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex gap-8"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium transition-colors hover:text-[var(--primary)] link-underline"
                  style={{ color: 'var(--secondary)' }}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex gap-4"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110 hover:bg-white/10"
                  style={{ 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--foreground)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </div>

          {/* Divider */}
          <div className="section-divider mb-8" />

          {/* Bottom */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-center md:text-left">
            <p className="text-sm font-light" style={{ color: 'var(--secondary)' }}>
              © {new Date().getFullYear()} 196ya0209. All rights reserved.
            </p>
            <p className="text-sm font-light" style={{ color: 'var(--secondary)' }}>
              Built with Next.js, TypeScript & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
