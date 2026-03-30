'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { Code, ExternalLink, Award } from 'lucide-react';

export function ProjectShowcase() {
  return (
    <section id="projects" className="section">
      <div className="section-container">
        <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-12 tracking-wide">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group card p-6 flex flex-col h-full"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -2 }}
            >
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-taupe transition-colors mb-2">
                {project.name}
              </h3>
              
              <p className="text-text-secondary text-sm mb-4 flex-grow">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium rounded-full bg-taupe/10 text-taupe border border-taupe/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border-color)]">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-text-muted hover:text-taupe transition-colors text-sm"
                    aria-label="GitHub"
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
                    className="flex items-center gap-1.5 text-text-muted hover:text-taupe transition-colors text-sm"
                    aria-label="Live Demo"
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
                    className="flex items-center gap-1.5 text-text-muted hover:text-taupe transition-colors text-sm"
                    aria-label="Devpost"
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
