'use client';

import { experiences } from '@/lib/data';
import { motion } from 'framer-motion';

interface ExperienceSidebarProps {
  selectedId: string;
  onSelect: (id: string) => void;
}

export function ExperienceSidebar({
  selectedId,
  onSelect,
}: ExperienceSidebarProps) {
  return (
    <div className="flex flex-col gap-2">
      {experiences.map((exp) => (
        <motion.button
          key={exp.id}
          onClick={() => onSelect(exp.id)}
          className={`p-4 rounded-lg text-left transition-all ${
            selectedId === exp.id
              ? 'bg-sky-500 dark:bg-sky-600 text-white'
              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="font-semibold">{exp.company}</div>
          <div className="text-sm opacity-75">{exp.position}</div>
        </motion.button>
      ))}
    </div>
  );
}
