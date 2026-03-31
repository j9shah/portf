'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { SignatureGraphic } from './SignatureGraphic';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Hero() {
  const scrollTo = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
      <SignatureGraphic />
      
      {/* Name - clear focal point */}
      <motion.h1
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-text-primary text-center tracking-tight relative z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <span className="bg-gradient-to-r from-text-primary via-accent to-text-primary bg-clip-text" style={{ WebkitBackgroundClip: 'text' }}>
          {personalInfo.name}
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="mt-4 text-text-muted text-sm md:text-base tracking-wide relative z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      >
        {personalInfo.title}
      </motion.p>

      {/* Navigation links */}
      <motion.nav
        className="flex items-center gap-6 md:gap-10 mt-10 relative z-10"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-text-secondary hover:text-accent transition-colors duration-200 text-sm tracking-wide relative group"
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
          </button>
        ))}
      </motion.nav>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-[var(--border-color)] flex items-start justify-center p-1.5"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
