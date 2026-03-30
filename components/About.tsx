'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { TechTag } from './TechTag';
import { education, skills, personalInfo } from '@/lib/data';
import { GraduationCap, Award, Code, Wrench, Brain } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="section bg-surface-elevated/30">
      <div className="section-container">
        <SectionHeading
          title="About Me"
          subtitle="A brief introduction to who I am and what I do"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 lg:gap-16">
          {/* Bio Column */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-text-secondary leading-relaxed">
              I'm a Computer Science student at Toronto Metropolitan University with a deep passion for
              <span className="text-accent-purple font-medium"> cybersecurity</span> and
              <span className="text-accent-blue font-medium"> machine learning</span>.
              My work sits at the intersection of defensive security and intelligent automation.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              Currently, I'm working in the Security Operations Center at Ontario Power Generation, 
              where I investigate cyber threats, analyze phishing campaigns, and build automation tools 
              to streamline threat intelligence workflows. Previously, I conducted applied ML research 
              at TMU's Cybersecurity Research Lab, developing NLP models for security applications.
            </p>
            <p className="text-lg text-text-secondary leading-relaxed">
              When I'm not hunting threats or training models, I enjoy building full-stack applications, 
              contributing to open-source projects, and exploring new technologies. I believe in 
              crafting elegant solutions that make a real impact.
            </p>

            {/* Education Card */}
            <motion.div
              className="card p-6 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent-purple/10">
                  <GraduationCap className="w-6 h-6 text-accent-purple" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-text-primary text-lg">{education.school}</h3>
                  <p className="text-text-secondary mt-1">{education.degree}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span className="text-accent-slate font-medium">CGPA: {education.cgpa}</span>
                    <span className="text-text-muted">Expected {education.graduationYear}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {education.honors.map((honor, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-accent-blue/10 text-accent-blue border border-accent-blue/20"
                      >
                        <Award className="w-3 h-3" />
                        {honor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Languages */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-purple/10">
                  <Code className="w-4 h-4 text-accent-purple" />
                </div>
                <h3 className="font-semibold text-text-primary">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((lang) => (
                  <TechTag key={lang} name={lang} variant="purple" />
                ))}
              </div>
            </motion.div>

            {/* Frameworks */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-blue/10">
                  <Brain className="w-4 h-4 text-accent-blue" />
                </div>
                <h3 className="font-semibold text-text-primary">Frameworks & ML</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.frameworks.map((fw) => (
                  <TechTag key={fw} name={fw} variant="blue" />
                ))}
              </div>
            </motion.div>

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-accent-slate/10">
                  <Wrench className="w-4 h-4 text-accent-slate" />
                </div>
                <h3 className="font-semibold text-text-primary">Tools & Platforms</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((tool) => (
                  <TechTag key={tool} name={tool} variant="slate" />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
