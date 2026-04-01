'use client';

import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/data';
import { Code2, ExternalLink, Zap } from 'lucide-react';

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
    <section id="projects" className="section mb-16">
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="card p-5 h-full flex flex-col group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header with icon */}
      <div className="mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-accent-subtle flex items-center justify-center shrink-0">
            <Code2 size={16} className="text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 flex-1">
            {project.name}
          </h3>
        </div>

        {/* Description - single strong sentence */}
        <p className="text-sm text-text-secondary leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Features - 2-3 bullet highlights */}
      {project.features && project.features.length > 0 && (
        <ul className="mb-4 space-y-2 flex-grow">
          {project.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
              <Zap size={12} className="w-3 h-3 text-accent/60 shrink-0 mt-1" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Tech stack - concise, max 5-6 tags */}
      <div className="flex flex-wrap gap-1.5 mb-4 pb-4 border-b border-border-color/40">
        {project.tech.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/15"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Action buttons - clean, minimal */}
      <div className="flex items-center gap-3 mt-auto">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-xs font-medium tracking-wide group/link"
            title="View source code"
          >
            <Code2 className="w-4 h-4" />
            <span>Code</span>
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-text-muted hover:text-accent transition-colors duration-200 text-xs font-medium tracking-wide group/link ml-auto"
            title="View live demo"
          >
            <span>Demo</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
