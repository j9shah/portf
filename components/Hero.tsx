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
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <SignatureGraphic />
      
      <motion.h1
        className="text-5xl md:text-7xl lg:text-8xl font-semibold text-accent text-center tracking-wide relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {personalInfo.name}
      </motion.h1>

      <motion.nav
        className="flex items-center gap-8 md:gap-12 mt-12 relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
      >
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-text-secondary hover:text-accent transition-colors text-sm md:text-base tracking-wide"
          >
            {link.label}
          </button>
        ))}
      </motion.nav>
    </section>
  );
}
