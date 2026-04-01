'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

// Otter SVG component
function OtterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-label="Otter mascot">
      <defs>
        <linearGradient id="otterGradNav" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B7355' }} />
          <stop offset="100%" style={{ stopColor: '#6B5344' }} />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="52" rx="35" ry="32" fill="url(#otterGradNav)" />
      <circle cx="22" cy="30" r="10" fill="#6B5344" />
      <circle cx="78" cy="30" r="10" fill="#6B5344" />
      <circle cx="22" cy="30" r="6" fill="#D4C4B0" />
      <circle cx="78" cy="30" r="6" fill="#D4C4B0" />
      <ellipse cx="50" cy="58" rx="22" ry="18" fill="#D4C4B0" />
      <ellipse cx="38" cy="48" rx="6" ry="7" fill="#1a1a1a" />
      <ellipse cx="62" cy="48" rx="6" ry="7" fill="#1a1a1a" />
      <circle cx="40" cy="46" r="2" fill="#fff" />
      <circle cx="64" cy="46" r="2" fill="#fff" />
      <ellipse cx="50" cy="60" rx="8" ry="5" fill="#1a1a1a" />
      <ellipse cx="50" cy="59" rx="3" ry="2" fill="#4a4a4a" />
      <path d="M 44 68 Q 50 73 56 68" stroke="#6B5344" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Use IntersectionObserver for more reliable scroll tracking
  useEffect(() => {
    // Scroll listener for navbar background
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track which sections are currently visible
    const visibleSections = new Map<string, number>();

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, entry.intersectionRatio);
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Find the section with highest visibility
      let maxRatio = 0;
      let activeId = '';
      visibleSections.forEach((ratio, id) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          activeId = id;
        }
      });

      if (activeId) {
        setActiveSection(`#${activeId}`);
      }
    };

    // Create observer
    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '-20% 0px -20% 0px',
    });

    const sections = ['experience', 'projects', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex justify-center">
          <div
            className={`
              flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl
              border border-[var(--border-color)]
              transition-all duration-300
              ${isScrolled
                ? 'bg-[var(--bg-elevated)]/95 backdrop-blur-md shadow-sm'
                : 'bg-[var(--bg-elevated)]/70 backdrop-blur-sm'
              }
            `}
          >
            {/* Otter Logo */}
            <Link href="/" className="group">
              <motion.div
                className="px-1.5 sm:px-2 py-1 sm:py-1.5 flex items-center gap-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <OtterIcon className="w-7 h-7 sm:w-8 sm:h-8" />
                <span className="font-semibold text-sm sm:text-base text-accent tracking-wide">JS</span>
              </motion.div>
            </Link>

            {/* Divider */}
            <div className="hidden md:block w-px h-4 sm:h-5 bg-[var(--border-color)]" />

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="relative px-3 py-2"
                  >
                    <span
                      className={`
                        text-sm font-medium transition-colors duration-200
                        ${isActive
                          ? 'text-accent'
                          : 'text-text-secondary hover:text-text-primary'
                        }
                      `}
                    >
                      {link.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-accent rounded-full"
                        layoutId="activeNav"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-4 sm:h-5 bg-[var(--border-color)]" />

            {/* Theme Toggle */}
            <div className="hidden md:block px-1">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-text-secondary hover:text-text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 sm:top-20 left-4 right-4 bg-[var(--bg-elevated)] border border-[var(--border-color)] rounded-xl p-4 z-50 md:hidden shadow-lg"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <motion.button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className={`
                        w-full px-3 py-2.5 text-left font-medium rounded-lg transition-colors text-sm
                        ${isActive
                          ? 'text-accent bg-accent-subtle'
                          : 'text-text-secondary hover:text-text-primary hover:bg-[var(--bg-secondary)]'
                        }
                      `}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
                <div className="pt-2 mt-1 border-t border-[var(--border-color)]">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
