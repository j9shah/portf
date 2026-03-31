'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { Code, ExternalLink, Award } from 'lucide-react';

export function ProjectShowcase() {
  // Separate featured and other projects
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <section id="projects" className="section">
      <div className="layout-container">
        <motion.h2 
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-text-primary mb-8 sm:mb-10 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>

        {/* Featured Projects - larger cards with more detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 mb-6 sm:mb-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group card p-5 sm:p-6 flex flex-col"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-lg sm:text-xl font-semibold text-text-primary group-hover:text-accent transition-colors duration-200">
                  {project.name}
                </h3>
                {/* Quick links in header */}
                <div className="flex items-center gap-2 shrink-0">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent-subtle transition-all duration-200"
                      aria-label="View source code"
                    >
                      <Code className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-text-muted hover:text-accent hover:bg-accent-subtle transition-all duration-200"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Description */}
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Features list */}
              {project.features && project.features.length > 0 && (
                <ul className="mb-4 space-y-1.5">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                      <span className="w-1 h-1 rounded-full bg-accent/60 mt-1.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-[var(--border-color)]">
                {project.tech.slice(0, 6).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-[var(--accent)]/15"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 6 && (
                  <span className="px-2 py-0.5 text-xs text-text-muted">
                    +{project.tech.length - 6} more
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects - smaller grid */}
        {otherProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group card p-4 sm:p-5 flex flex-col h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (featuredProjects.length + index) * 0.06 }}
                whileHover={{ y: -3 }}
              >
                <h3 className="text-base sm:text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 mb-2">
                  {project.name}
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-[var(--accent)]/15"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4 pt-3 border-t border-[var(--border-color)]">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                      aria-label="View source code"
                    >
                      <Code className="w-4 h-4" />
                      <span>Code</span>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                      aria-label="View live demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Demo</span>
                    </a>
                  )}
                  {project.devpost && (
                    <a
                      href={project.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm"
                      aria-label="View on Devpost"
                    >
                      <Award className="w-4 h-4" />
                      <span>Devpost</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
