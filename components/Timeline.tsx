'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

export function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  // Separate featured (tech) and other experiences
  const featuredExperiences = experiences.filter(exp => exp.featured);
  const otherExperiences = experiences.filter(exp => !exp.featured);

  return (
    <section id="experience" className="section">
      <div className="layout-container">
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary mb-8 sm:mb-10 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Experience
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Featured/Technical Experience */}
          <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-10">
            {featuredExperiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={cardVariants}
              >
                <motion.div
                  className="card p-4 sm:p-5 md:p-6 relative overflow-hidden"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Subtle left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-accent/40 rounded-full" />
                  
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 sm:gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-text-primary leading-tight">
                        {exp.position}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5">
                        <span className="text-sm text-text-secondary">{exp.company}</span>
                        {exp.type && (
                          <>
                            <span className="text-text-muted text-xs">·</span>
                            <span className="text-xs text-text-muted">{exp.type}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-0.5">
                      <span className="text-xs sm:text-sm text-text-muted whitespace-nowrap">
                        {exp.period}
                      </span>
                      {exp.duration && (
                        <span className="text-xs text-text-muted/70">{exp.duration}</span>
                      )}
                    </div>
                  </div>

                  {/* Location */}
                  {exp.location && (
                    <p className="text-xs text-text-muted mb-2 flex items-center gap-1">
                      <span>{exp.location}</span>
                      {exp.workMode && (
                        <>
                          <span>·</span>
                          <span>{exp.workMode}</span>
                        </>
                      )}
                    </p>
                  )}

                  {/* Description */}
                  {exp.description && (
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {exp.description}
                    </p>
                  )}

                  {/* Tech tags */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-[var(--accent)]/15"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Other Experience - More compact */}
          {otherExperiences.length > 0 && (
            <>
              <motion.h3
                className="text-sm font-medium text-text-muted uppercase tracking-wider mb-4"
                variants={cardVariants}
              >
                Other Experience
              </motion.h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {otherExperiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={cardVariants}
                  >
                    <motion.div
                      className="card p-4 h-full"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-sm sm:text-base font-semibold text-text-primary leading-tight">
                        {exp.position}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 mb-2">
                        <span className="text-sm text-text-secondary">{exp.company}</span>
                        {exp.type && (
                          <>
                            <span className="text-text-muted text-xs">·</span>
                            <span className="text-xs text-text-muted">{exp.type}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-xs text-text-muted">
                        <span>{exp.period}</span>
                        {exp.duration && <span>{exp.duration}</span>}
                      </div>
                      {exp.description && (
                        <p className="text-text-muted text-xs leading-relaxed mt-2 line-clamp-2">
                          {exp.description}
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
