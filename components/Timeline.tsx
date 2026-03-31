'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

export function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section id="experience" className="section">
      <div className="section-container">
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-text-primary mb-10 tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Experience
        </motion.h2>

        <motion.div
          className="relative max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Vertical timeline bar */}
          <div className="absolute left-3 md:left-4 top-3 bottom-3 w-px bg-[var(--border-color)]" />

          {/* Experience cards */}
          <div className="space-y-8">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
                className="relative pl-10 md:pl-12"
              >
                {/* Timeline dot */}
                <div className="absolute left-1.5 md:left-2.5 top-2 w-3 h-3 rounded-full bg-accent border-2 border-[var(--bg-primary)]" />

                <motion.div
                  className="bg-surface-elevated border border-[var(--border-color)] rounded-2xl p-5 md:p-6 hover:border-accent/40 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary">
                        {exp.position}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-sm text-text-muted">
                      {exp.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-accent-subtle text-accent border border-accent/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
