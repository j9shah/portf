'use client';

import { Hero } from '@/components/Hero';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <ExperienceTimeline />
      <ProjectsGrid />
      <ContactSection />
    </>
  );
}
