import { personalInfo } from '@/lib/data';

export function Hero() {
  return (
    <section id="about" className="intro" aria-labelledby="intro-heading">
      <p className="eyebrow"><span className="location-dot" aria-hidden="true" />{personalInfo.location}</p>
      <h1 id="intro-heading">{personalInfo.name}</h1>
      <p className="intro-description">{personalInfo.introduction}</p>
    </section>
  );
}
