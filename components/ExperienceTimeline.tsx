'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

export function ExperienceTimeline() {
  // Separate featured (technical) and other experiences
  const featuredExperiences = experiences.filter(exp => exp.featured);
  const otherExperiences = experiences.filter(exp => !exp.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section id="experience" className="pt-8 pb-20 sm:pb-24 md:pb-28">
      <div className="layout-container">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-text-primary mb-12 tracking-tight text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Experience
        </motion.h2>

        {/* Timeline Container */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical center line - visible on desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border-color/60 -translate-x-1/2 pointer-events-none" />

          {/* Featured/Technical Experience - Alternating Layout */}
          <div className="space-y-12 md:space-y-16 mb-16">
            {featuredExperiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              const isLast = index === featuredExperiences.length - 1;

              return (
                <motion.div
                  key={exp.id}
                  variants={cardVariants}
                  className="relative"
                >
                  {/* Desktop: Alternating left/right positions, but always left-aligned text */}
                  <div className="hidden md:grid md:grid-cols-2 gap-8 items-start">
                    {isLeft ? (
                      <>
                        <div className="pr-8">
                          <TimelineCard exp={exp} align="left" featured />
                        </div>
                        <div className="pl-8" />
                      </>
                    ) : (
                      <>
                        <div className="pr-8" />
                        <div className="pl-8">
                          <TimelineCard exp={exp} align="left" featured />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Mobile: Single column */}
                  <div className="md:hidden pl-8 relative">
                    {/* Mobile timeline line */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-border-color/60" />
                    <TimelineCard exp={exp} align="left" featured />
                  </div>

                  {/* Timeline node */}
                  <div className="
                    absolute top-6
                    left-0 md:left-1/2
                    md:-translate-x-1/2
                    w-3 h-3 rounded-full
                    bg-accent border-2 border-bg-primary
                    z-10
                  " />
                </motion.div>
              );
            })}
          </div>

          {/* Other Experience - Compact Grid */}
          {otherExperiences.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border-color/40">
              <motion.h3
                className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-8 text-center"
                variants={cardVariants}
              >
                Additional Experience
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                {otherExperiences.map((exp) => (
                  <motion.div
                    key={exp.id}
                    variants={cardVariants}
                  >
                    <CompactCard exp={exp} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// Featured timeline card component
function TimelineCard({ exp, align, featured }: {
  exp: any;
  align: 'left' | 'right';
  featured?: boolean;
}) {
  return (
    <motion.div
      className={`
        card p-6 relative group
        ${align === 'left' ? 'text-left' : 'text-right'}
      `}
      whileHover={{ y: -2, borderColor: 'var(--accent)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle accent indicator */}
      <div className={`
        absolute top-4 bottom-4 w-0.5 bg-accent/30 rounded-full
        ${align === 'left' ? 'left-0' : 'right-0'}
      `} />

      {/* Role title */}
      <h3 className="text-lg font-semibold text-text-primary mb-1 leading-tight">
        {exp.position}
      </h3>

      {/* Company */}
      <div className="text-sm text-accent font-medium mb-3">
        {exp.company}
      </div>

      {/* Date */}
      <div className="text-xs text-text-muted mb-4">
        {exp.period}
      </div>

      {/* Description - concise */}
      {exp.description && (
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {exp.description}
        </p>
      )}

      {/* Tech tags - only if relevant */}
      {exp.technologies && exp.technologies.length > 0 && (
        <div className={`
          flex flex-wrap gap-1.5
          ${align === 'right' ? 'justify-end' : 'justify-start'}
        `}>
          {exp.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/15"
            >
              {tech}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// Compact card for non-technical roles
function CompactCard({ exp }: { exp: any }) {
  return (
    <motion.div
      className="bg-surface-elevated rounded-xl p-4 h-full transition-all duration-200"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <h4 className="text-sm font-semibold text-text-primary leading-tight mb-1">
        {exp.position}
      </h4>
      <div className="text-xs text-text-secondary mb-2">
        {exp.company}
      </div>
      <div className="text-xs text-text-muted">
        {exp.period}
      </div>
    </motion.div>
  );
}
