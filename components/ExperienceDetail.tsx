'use client';

import { experiences } from '@/lib/data';
import { motion } from 'framer-motion';

interface ExperienceDetailProps {
  selectedId: string;
}

export function ExperienceDetail({ selectedId }: ExperienceDetailProps) {
  const experience = experiences.find((exp) => exp.id === selectedId);

  if (!experience) {
    return null;
  }

  return (
    <motion.div
      key={selectedId}
      className="bg-surface-elevated rounded-lg p-8 border border-[var(--border-color)]"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-text-primary mb-1 tracking-wide">
          {experience.company}
        </h3>
        <p className="text-lg text-taupe mb-2">
          {experience.position}
        </p>
        <p className="text-sm text-text-secondary">
          {experience.period}
        </p>
      </div>

      <p className="text-text-secondary mb-6">
        {experience.description}
      </p>

      <div>
        <h4 className="font-semibold text-text-primary mb-4">
          Key Achievements & Responsibilities
        </h4>
        <ul className="space-y-3">
          {experience.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              className="flex gap-3 text-text-secondary"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-taupe font-bold min-w-fit">
                ▸
              </span>
              <span>{highlight}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
