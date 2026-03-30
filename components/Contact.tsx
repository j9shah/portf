'use client';

import { socials } from '@/lib/data';
import { motion } from 'framer-motion';
import { Mail, Share2, Code, Phone } from 'lucide-react';
import Link from 'next/link';

export function Contact() {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: socials.email,
      href: `mailto:${socials.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: socials.phone,
      href: `tel:${socials.phone}`,
    },
    {
      icon: Share2,
      label: 'LinkedIn',
      value: 'j0shah',
      href: socials.linkedin,
    },
    {
      icon: Code,
      label: 'GitHub',
      value: 'j0shah',
      href: socials.github,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8">
      {/* Contact Intro */}
      <motion.div
        className="bg-surface-elevated rounded-lg p-8 border border-[var(--border-color)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-text-primary tracking-wide">
          Let's Connect
        </h2>
        <p className="text-text-secondary leading-relaxed">
          I'm always interested in discussing cybersecurity, machine learning,
          and full-stack development opportunities. Feel free to reach out
          through any of the channels below, and I'll be happy to chat!
        </p>
      </motion.div>

      {/* Contact Links */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {contactLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} target="_blank">
              <motion.div
                className="bg-surface-elevated rounded-lg p-6 border border-[var(--border-color)] hover:border-taupe transition-colors cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-taupe" />
                  <h3 className="font-semibold text-text-primary">
                    {link.label}
                  </h3>
                </div>
                <p className="text-text-secondary">
                  {link.value}
                </p>
              </motion.div>
            </Link>
          );
        })}
      </motion.div>

      {/* Social Links Summary */}
      <motion.div
        className="flex justify-center gap-4 pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Link href={socials.github} target="_blank">
          <motion.a
            className="p-3 rounded-lg bg-surface-elevated border border-[var(--border-color)] hover:border-taupe transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="GitHub"
          >
            <Code className="w-6 h-6 text-taupe" />
          </motion.a>
        </Link>
        <Link href={socials.linkedin} target="_blank">
          <motion.a
            className="p-3 rounded-lg bg-surface-elevated border border-[var(--border-color)] hover:border-taupe transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn"
          >
            <Share2 className="w-6 h-6 text-taupe" />
          </motion.a>
        </Link>
        <Link href={`mailto:${socials.email}`}>
          <motion.a
            className="p-3 rounded-lg bg-surface-elevated border border-[var(--border-color)] hover:border-taupe transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-taupe" />
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
}
