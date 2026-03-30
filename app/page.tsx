'use client';

import { Hero } from '@/components/Hero';
import { Timeline } from '@/components/Timeline';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <Timeline />
      <ProjectShowcase />
      <ContactSection />
    </>
  );
}
