'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { Code, ExternalLink, Award } from 'lucide-react';

export function ProjectShowcase() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-text-primary mb-10 tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group card p-5 flex flex-col h-full"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
            >
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 mb-2">
                {project.name}
              </h3>
              
              <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/10"
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
      </div>
    </section>
  );
}
