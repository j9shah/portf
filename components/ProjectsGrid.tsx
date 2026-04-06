'use client';

import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/data';
import { Code2, ExternalLink, Zap, Award } from 'lucide-react';

export function ProjectsGrid() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
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
    <section id="projects" className="pt-8 pb-20 sm:pb-24 md:pb-28 mb-16">
      <div className="layout-container">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold text-text-primary mb-12 tracking-tight text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          Projects
        </motion.h2>

        {/* Consistent grid layout */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto"
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
      className="card p-6 h-full flex flex-col group"
      style={{ minHeight: '340px' }}
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

      {/* Features - 2 bullet highlights with consistent height */}
      <div className="mb-4 min-h-[52px] flex flex-col justify-start">
        {project.features && project.features.length > 0 ? (
          <ul className="space-y-1.5">
            {project.features.slice(0, 2).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                <Zap size={12} className="w-3 h-3 text-accent/60 shrink-0 mt-1" />
                <span className="leading-relaxed">{feature}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="h-full"></div>
        )}
      </div>

      {/* Tech stack + Divider + Action buttons - all pushed to bottom */}
      <div className="mt-auto">
        {/* Tech stack - concise, max 5-6 tags */}
        <div className="flex flex-wrap gap-1.5 pb-4 border-b border-border-color/40">
          {project.tech.slice(0, 6).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-accent-subtle text-accent border border-accent/15"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action buttons - styled as clickable buttons */}
        <div className="flex items-center gap-2 pt-4">
        {project.github && (
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-all duration-150 text-xs font-medium tracking-wide border border-accent/30 hover:border-accent relative overflow-hidden group/btn hover:shadow-lg hover:shadow-accent/30"
            title="View source code"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <Code2 className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Code</span>
          </motion.a>
        )}
        {project.devpost && (
          <motion.a
            href={project.devpost}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-all duration-150 text-xs font-medium tracking-wide border border-accent/30 hover:border-accent relative overflow-hidden group/btn hover:shadow-lg hover:shadow-accent/30"
            title="View on Devpost"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <Award className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Devpost</span>
          </motion.a>
        )}
        {project.demo && (
          <motion.a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/10 hover:bg-accent hover:text-white text-accent transition-all duration-150 text-xs font-medium tracking-wide border border-accent/30 hover:border-accent relative overflow-hidden group/btn hover:shadow-lg hover:shadow-accent/30"
            title="View live demo"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
            
            <span className="relative z-10">Live</span>
            <ExternalLink className="w-4 h-4 relative z-10" />
          </motion.a>
        )}
        </div>
      </div>
    </motion.div>
  );
}
