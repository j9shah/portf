import { Hero } from '@/components/Hero';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ContactSection } from '@/components/ContactSection';
import { EducationSection } from '@/components/EducationSection';

export default function Home() {
  return (
    <div className="layout-container">
      <Hero />
      <ExperienceTimeline />
      <ProjectsGrid />
      <EducationSection />
      <ContactSection />
    </div>
  );
}
