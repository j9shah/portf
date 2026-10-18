import { personalInfo } from '@/lib/data';

export function Footer() {
  return (
    <footer className="site-footer layout-container">
      <span>© {new Date().getFullYear()} {personalInfo.name}</span>
      <a href="/#about">Back to top <span aria-hidden="true">↑</span></a>
    </footer>
  );
}
