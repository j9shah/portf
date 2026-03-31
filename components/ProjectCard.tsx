'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
}

export function ProjectCard({
  name,
  description,
  tech,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <motion.div
      className="bg-surface-elevated rounded-2xl p-5 border border-[var(--border-color)] hover:border-accent/40 transition-all duration-200 h-full flex flex-col group"
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-lg font-semibold mb-2 text-text-primary group-hover:text-accent transition-colors duration-200">
        {name}
      </h3>
      <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
        {description}
      </p>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1.5">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/10"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-3 border-t border-[var(--border-color)]">
        {github && (
          <Link href={github} target="_blank" rel="noopener noreferrer">
            <motion.span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-subtle hover:bg-accent/15 transition-colors duration-200 text-sm font-medium text-accent"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Code className="w-4 h-4" />
              Code
            </motion.span>
          </Link>
        )}
        {demo && (
          <Link href={demo} target="_blank" rel="noopener noreferrer">
            <motion.span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-[var(--bg-primary)] hover:opacity-90 transition-opacity duration-200 text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink className="w-4 h-4" />
              Demo
            </motion.span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
