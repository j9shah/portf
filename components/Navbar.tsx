'use client';

import { useState, useEffect } from 'react';
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
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll position for navbar style
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 150; // Offset for better detection

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const sectionId = href.substring(1);
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 px-4 py-4"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-surface-primary border-b border-[var(--border-color)] rounded-2xl px-2 py-2 flex items-center gap-1 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/">
            <motion.div
              className="px-4 py-2 font-semibold text-lg text-accent cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              JS
            </motion.div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative"
                >
                  <motion.div
                    className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-300 ${
                      isActive
                        ? 'text-accent border-b-2 border-accent'
                        : 'text-text-secondary hover:text-accent'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">{link.label}</span>
                  </motion.div>
                </button>
              );
            })}
          </div>

          {/* Theme Toggle */}
          <div className="hidden md:block ml-2">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="fixed top-20 left-4 right-4 bg-surface-elevated border border-[var(--border-color)] rounded-2xl p-6 z-50 md:hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href;
                  return (
                    <button
                      key={link.href}
                      onClick={() => scrollToSection(link.href)}
                      className="w-full"
                    >
                      <motion.div
                        className={`px-4 py-3 text-left font-medium rounded-xl transition-colors ${
                          isActive
                            ? 'text-accent border-b-2 border-accent'
                            : 'text-text-secondary hover:text-accent hover:bg-surface-secondary'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {link.label}
                      </motion.div>
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-[var(--border-color)] mt-2">
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
