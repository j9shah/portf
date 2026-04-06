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
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
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
        dark:border-0 border border-black/20
      `}
      whileHover={{ y: -2, borderColor: 'var(--accent)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle accent indicator */}
      <div className={`
        absolute top-4 bottom-4 w-0.5 bg-accent/30 rounded-full
        ${align === 'left' ? 'left-0' : 'right-0'}
      `} />

      {/* Role title and link button in same row */}
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="text-lg font-semibold text-text-primary leading-tight">
          {exp.position}
        </h3>
        
        {exp.link && (
          <motion.a 
            href={exp.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-accent/10 hover:bg-accent hover:text-white border border-accent/30 hover:border-accent text-accent text-xs font-medium transition-all duration-150 group/link relative overflow-hidden hover:shadow-lg hover:shadow-accent/30"
            title="Visit Lab"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/link:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-3 h-3 relative z-10"
            >
              <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z" clipRule="evenodd" />
            </svg>
            <span className="relative z-10">Visit Lab</span>
          </motion.a>
        )}
      </div>

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
          {exp.technologies.slice(0, 5).map((tech: string) => (
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
      className="bg-surface-elevated rounded-xl p-4 h-full transition-all duration-200 dark:border-0 border border-black/20"
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
