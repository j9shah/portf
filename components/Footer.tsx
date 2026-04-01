'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 sm:py-10 border-t border-border-color/40 bg-bg-elevated/30">
      <div className="layout-container">
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Left: Logo & Copyright */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-accent">JS</span>
            <span className="text-text-muted">·</span>
            <span className="text-text-muted">© {currentYear} Jainam Shah</span>
          </div>

          {/* Right: Message */}
          <p className="text-text-secondary text-sm">
            Thanks for scrolling this far :)!
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
