'use client';

import { motion } from 'framer-motion';

interface TechTagProps {
  name: string;
  variant?: 'default' | 'purple' | 'blue' | 'slate';
  size?: 'sm' | 'md';
}

const variantStyles = {
  default: 'bg-taupe/10 text-taupe border-taupe/20',
  purple: 'bg-taupe/10 text-taupe border-taupe/20',
  blue: 'bg-taupe/10 text-taupe border-taupe/20',
  slate: 'bg-taupe/10 text-taupe border-taupe/20',
};

const sizeStyles = {
  sm: 'px-2.5 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function TechTag({ name, variant = 'default', size = 'sm' }: TechTagProps) {
  return (
    <motion.span
      className={`inline-flex items-center font-medium rounded-full border transition-colors duration-200 ${variantStyles[variant]} ${sizeStyles[size]}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {name}
    </motion.span>
  );
}
