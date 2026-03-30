'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ReactNode } from 'react';

interface GradientButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  icon?: ReactNode;
}

const variants = {
  primary: 'bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-glow-sm hover:shadow-glow-md',
  secondary: 'bg-surface-elevated border border-[var(--border-color)] text-text-primary hover:border-accent-purple hover:bg-accent-purple/10',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-secondary',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function GradientButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  icon,
}: GradientButtonProps) {
  const baseStyles = `inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <Link href={href} {...linkProps}>
        <motion.span
          className={baseStyles}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {content}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={baseStyles}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {content}
    </motion.button>
  );
}
