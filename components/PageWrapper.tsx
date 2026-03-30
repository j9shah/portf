'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageWrapper({ children, title, subtitle }: PageWrapperProps) {
  return (
    <motion.div
      className="min-h-screen py-12 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto">
        {title && (
          <motion.div
            className="mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-accent tracking-wide mb-2">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg text-text-secondary">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.div>
  );
}
