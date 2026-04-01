'use client';

import { motion } from 'framer-motion';
import { socials } from '@/lib/data';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 sm:py-40 min-h-[70vh] flex items-center">
      <div className="layout-container w-full">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold text-text-primary mb-4 tracking-tight text-center">
            Let's connect
          </h2>

          {/* Subheading */}
          <p className="text-text-secondary text-center text-base leading-relaxed mb-12">
            Feel free to reach out for opportunities, collaborations, or just to chat.
          </p>

          {/* Email with copy */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="text-text-primary font-medium">{socials.email}</span>
            <button
              onClick={copyEmail}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-accent hover:bg-accent-subtle transition-colors duration-200"
            >
              {copied ? (
                <>
                  <Check size={14} />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy
                </>
              )}
            </button>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-color text-text-secondary hover:border-accent hover:text-accent transition-colors duration-200 font-medium text-sm"
            >
              GitHub
            </a>
            <a
              href={socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-color text-text-secondary hover:border-accent hover:text-accent transition-colors duration-200 font-medium text-sm"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
