'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { TechTag } from './TechTag';
import { experiences } from '@/lib/data';
import { Briefcase, Calendar } from 'lucide-react';

export function Timeline() {
  return (
    <section id="experience" className="section">
      <div className="section-container">
        <SectionHeading
          title="Experience"
          subtitle="My professional journey in cybersecurity and software development"
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-purple via-accent-blue to-transparent" />

          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <motion.div
                  className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-violet transform -translate-x-1/2 mt-8 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  style={{
                    boxShadow: '0 0 20px var(--accent-violet)',
                  }}
                />

                {/* Content */}
                <div className={`flex-1 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    className={`card p-6 md:p-8 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? 'md:items-end' : 'md:items-start'}`}>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-accent-purple md:order-last" />
                        <h3 className="text-xl font-bold text-text-primary">{experience.company}</h3>
                      </div>
                      <p className="text-accent-blue font-medium">{experience.position}</p>
                      <div className="flex items-center gap-2 text-text-muted text-sm">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{experience.period}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-text-secondary mb-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {experience.description}
                    </p>

                    {/* Highlights */}
                    <ul className={`space-y-3 mb-6 ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {experience.highlights.map((highlight, hIndex) => (
                        <motion.li
                          key={hIndex}
                          className={`flex items-start gap-3 text-text-secondary text-sm ${
                            index % 2 === 0 ? 'md:flex-row-reverse' : ''
                          }`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + hIndex * 0.05 }}
                        >
                          <span className="text-accent-violet mt-1 flex-shrink-0">▹</span>
                          <span>{highlight}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Technologies - if we have them */}
                    {experience.technologies && (
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        {experience.technologies.map((tech) => (
                          <TechTag key={tech} name={tech} size="sm" />
                        ))}
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
