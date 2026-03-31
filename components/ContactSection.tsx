'use client';

import { motion } from 'framer-motion';
import { socials, personalInfo } from '@/lib/data';

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="layout-container">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 tracking-tight">
            Let's connect
          </h2>
          <p className="text-text-secondary mb-8 text-sm md:text-base leading-relaxed">
            {personalInfo.bio}
          </p>
          
          <div className="flex items-center justify-center gap-6 sm:gap-8 text-sm">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200 font-medium tracking-wide relative group"
            >
              LinkedIn
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="text-text-secondary hover:text-accent transition-colors duration-200 font-medium tracking-wide relative group"
            >
              Email
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent transition-colors duration-200 font-medium tracking-wide relative group"
            >
              GitHub
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent transition-all duration-200 group-hover:w-full" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
