'use client';

import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <motion.div
      className={`mb-16 ${align === 'center' ? 'text-center' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-display-sm md:text-display-md font-semibold text-accent mb-4 tracking-wide">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-text-secondary max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
