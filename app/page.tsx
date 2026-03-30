'use client';

import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Timeline } from '@/components/Timeline';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { ContactSection } from '@/components/ContactSection';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Timeline />
      <ProjectShowcase />
      <ContactSection />
    </>
  );
}
