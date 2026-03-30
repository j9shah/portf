'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { TechTag } from './TechTag';
import { GradientButton } from './GradientButton';
import { projects } from '@/lib/data';
import { ExternalLink, Sparkles } from 'lucide-react';

// Custom GitHub icon
const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

export function ProjectShowcase() {
  // First project is featured
  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <section id="projects" className="section bg-surface-elevated/30">
      <div className="section-container">
        <SectionHeading
          title="Projects"
          subtitle="A selection of work I'm proud of"
        />

        {/* Featured Project */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative card overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple via-accent-blue to-accent-slate opacity-20 blur-xl" />
            
            <div className="relative p-8 md:p-12">
              <div className="flex items-center gap-2 text-accent-purple mb-4">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Project</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                {featuredProject.name}
              </h3>

              <p className="text-lg text-text-secondary mb-6 max-w-3xl">
                {featuredProject.fullDescription || featuredProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {featuredProject.tech.map((tech) => (
                  <TechTag key={tech} name={tech} size="md" />
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4">
                {featuredProject.github && (
                  <GradientButton
                    href={featuredProject.github}
                    variant="secondary"
                    size="sm"
                    external
                    icon={<GithubIcon className="w-4 h-4" />}
                  >
                    View Code
                  </GradientButton>
                )}
                {featuredProject.demo && (
                  <GradientButton
                    href={featuredProject.demo}
                    variant="primary"
                    size="sm"
                    external
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Live Demo
                  </GradientButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="card h-full p-6 flex flex-col"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
              >
                {/* Project Icon/Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-accent-purple/10 group-hover:bg-accent-purple/20 transition-colors">
                    <svg
                      className="w-6 h-6 text-accent-purple"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                      />
                    </svg>
                  </div>
                  
                  {/* Quick Links */}
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-text-muted hover:text-accent-purple hover:bg-accent-purple/10 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <GithubIcon className="w-5 h-5" />
                      </motion.a>
                    )}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg text-text-muted hover:text-accent-purple hover:bg-accent-purple/10 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent-purple transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-text-secondary mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <TechTag key={tech} name={tech} size="sm" />
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs text-text-muted self-center">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
