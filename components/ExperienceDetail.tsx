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
      className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg p-8 border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
          {experience.company}
        </h3>
        <p className="text-lg text-sky-600 dark:text-sky-400 mb-2">
          {experience.position}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {experience.period}
        </p>
      </div>

      <p className="text-slate-700 dark:text-slate-300 mb-6">
        {experience.description}
      </p>

      <div>
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          Key Achievements & Responsibilities
        </h4>
        <ul className="space-y-3">
          {experience.highlights.map((highlight, index) => (
            <motion.li
              key={index}
              className="flex gap-3 text-slate-700 dark:text-slate-300"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="text-sky-500 dark:text-sky-400 font-bold min-w-fit">
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
