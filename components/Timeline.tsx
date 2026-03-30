'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/lib/data';

export function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section id="experience" className="section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-12 tracking-wide">Experience</h2>

        {/* Timeline container */}
        <motion.div
          className="relative max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical timeline bar */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-beigeGrey/50 md:-translate-x-1/2" />

          {/* Experience cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <motion.div
                  key={exp.id}
                  variants={cardVariants}
                  className="relative"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 top-8 w-4 h-4 rounded-full bg-taupe border-4 border-[var(--bg-primary)] md:-translate-x-1/2" />

                  {/* Card - mobile: always right, desktop: alternating */}
                  <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                    <motion.div
                      className="bg-surface-elevated border border-[var(--border-color)] rounded-xl p-6 md:p-8 hover:border-taupe/50 transition-all duration-300"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Company name with emoji */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🏢</span>
                        <h3 className="text-lg font-semibold text-text-secondary">
                          {exp.company}
                        </h3>
                      </div>

                      {/* Position title */}
                      <h4 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                        {exp.position}
                      </h4>

                      {/* Period */}
                      <p className="text-sm text-text-muted mb-4">
                        {exp.period}
                      </p>

                      {/* Description */}
                      <p className="text-text-secondary leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Tech tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-taupe/10 text-taupe border border-taupe/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
