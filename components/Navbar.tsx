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

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const updateActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    
    setIsScrolled(scrollY > 50);

    // Get the hero section to determine when we've scrolled past it
    const heroSection = document.querySelector('section');
    if (heroSection) {
      const heroRect = heroSection.getBoundingClientRect();
      // If the hero section bottom is still significantly visible, no nav item is active
      if (heroRect.bottom > viewportHeight * 0.5) {
        setActiveSection(null);
        return;
      }
    }

    // Check each section - find which one is most in view
    const sections = ['experience', 'projects', 'contact'];
    let bestMatch: string | null = null;
    let bestScore = -Infinity;

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        // Calculate how much of the section is in the "active zone" (top 60% of viewport)
        const activeZoneBottom = viewportHeight * 0.6;
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(activeZoneBottom, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Score based on visible height and proximity to top
        const score = visibleHeight - (rect.top > 0 ? rect.top * 0.5 : 0);
        
        if (score > bestScore && rect.top < activeZoneBottom && rect.bottom > 0) {
          bestScore = score;
          bestMatch = `#${sectionId}`;
        }
      }
    }

    setActiveSection(bestMatch);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();

    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

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
            {/* Logo */}
            <Link href="/" className="group">
              <motion.div
                className="px-2.5 sm:px-3 py-1.5 sm:py-2 font-semibold text-sm sm:text-base text-accent tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                JS
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
