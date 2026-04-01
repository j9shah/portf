'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '@/lib/data';
import { SignatureGraphic } from './SignatureGraphic';
import { InteractiveTether } from './InteractiveTether';
import { FloatingBubbles } from './FloatingBubbles';
import { Sparkles } from 'lucide-react';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function Hero() {
  const [showTether, setShowTether] = useState(false);

  const scrollTo = (href: string) => {
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center">
      <SignatureGraphic />
      
      {/* Floating bubbles/stars effect - only when easter egg is active */}
      <AnimatePresence>
        {showTether && <FloatingBubbles />}
      </AnimatePresence>
      
      <AnimatePresence>
        {showTether && <InteractiveTether />}
      </AnimatePresence>

      {/* Interactive mode toggle - top right */}
      <motion.button
        className={`
          absolute top-20 sm:top-24 right-4 sm:right-8 z-20
          p-2.5 rounded-full border transition-all duration-300
          ${showTether 
            ? 'bg-accent/20 border-accent text-accent' 
            : 'bg-bg-elevated/50 border-border-color text-text-muted hover:text-accent hover:border-accent/50'
          }
        `}
        onClick={() => setShowTether(!showTether)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={showTether ? "Hide interactive element" : "Show interactive element"}
      >
        <Sparkles size={16} />
      </motion.button>

      {/* Centered content container */}
      <div className="layout-container flex flex-col items-center text-center relative z-10">
        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-text-primary dark:text-text-primary light:text-gray-800 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {personalInfo.name}
        </motion.h1>

        {/* Navigation links */}
        <motion.nav
          className="flex items-center gap-6 sm:gap-10 mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-text-secondary dark:text-text-secondary light:text-gray-600 hover:text-accent transition-colors duration-200 text-xs sm:text-sm font-medium tracking-wide relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
            </button>
          ))}
        </motion.nav>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 rounded-full border border-border-color flex items-start justify-center p-1.5"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
