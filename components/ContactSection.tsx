'use client';

import { motion } from 'framer-motion';
import { socials, personalInfo } from '@/lib/data';

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="section-container">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4 tracking-wide">Let's connect.</h2>
          <p className="text-text-secondary mb-8">{personalInfo.bio}</p>
          
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-taupe transition-colors tracking-wide"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${socials.email}`}
              className="text-text-secondary hover:text-taupe transition-colors tracking-wide"
            >
              Email
            </a>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-taupe transition-colors tracking-wide"
            >
              Github
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
