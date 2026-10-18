import { personalInfo } from '@/lib/data';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
    <header className="site-header layout-container">
      <a className="wordmark" href="#about" aria-label={`${personalInfo.name}, back to introduction`}>
        <img src="/icon.svg" alt="" width={32} height={32} />
        <span>JS<span className="wordmark-dot">.</span></span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#experience">Experience</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <ThemeToggle />
    </header>
  );
}
