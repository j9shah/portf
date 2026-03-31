'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data';
import { Code, ExternalLink } from 'lucide-react';

export function ProjectsGrid() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <section id="projects" className="section">
      <div className="layout-container">
        <motion.h2 
          className="text-2xl md:text-3xl font-semibold text-text-primary mb-16 tracking-tight text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>

        {/* Consistent grid layout */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      className="card p-5 h-full flex flex-col group"
      whileHover={{ y: -3, borderColor: 'var(--accent)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 mb-2">
          {project.name}
        </h3>
        
        {/* Description - single strong sentence */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Features - 2-3 bullet highlights */}
      {project.features && project.features.length > 0 && (
        <ul className="mb-4 space-y-1.5 flex-grow">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
              <span className="w-1 h-1 rounded-full bg-accent/60 mt-1.5 shrink-0" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack - concise, max 5-6 tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="px-2 py-0.5 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/15"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons - clean, minimal */}
      <div className="flex items-center gap-4 pt-4 mt-auto border-t border-border-color/50">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm font-medium"
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
            className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Demo</span>
          </a>
        )}
      </div>
    </motion.div>
  );
}
