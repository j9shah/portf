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
      className="bg-surface-elevated rounded-lg p-6 border border-border-color hover:border-accent transition-colors h-full flex flex-col"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <h3 className="text-xl font-bold mb-2 text-text-primary">
        {name}
      </h3>
      <p className="text-text-secondary mb-4 flex-grow">
        {description}
      </p>

      {/* Tech Stack */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="px-2 py-1 text-xs bg-accent/10 text-accent rounded font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-3 pt-4 border-t border-border-color">
        {github && (
          <Link href={github} target="_blank" rel="noopener noreferrer">
            <motion.a
              className="flex items-center gap-1 px-3 py-2 rounded bg-accent-slate/20 dark:bg-accent-slate/20 hover:bg-accent-slate/30 dark:hover:bg-accent-slate/30 transition-colors text-sm font-medium text-accent-slate"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code className="w-4 h-4" />
              Code
            </motion.a>
          </Link>
        )}
        {demo && (
          <Link href={demo} target="_blank" rel="noopener noreferrer">
            <motion.a
              className="flex items-center gap-1 px-3 py-2 rounded bg-accent hover:opacity-90 text-white transition-opacity text-sm font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Demo
            </motion.a>
          </Link>
        )}
      </div>
    </motion.div>
  );
}
