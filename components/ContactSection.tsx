import { socials } from '@/lib/data';

export function ContactSection() {
  return (
    <section id="contact" className="content-section contact-section" aria-labelledby="contact-heading">
      <div className="section-heading"><h2 id="contact-heading">Get in touch</h2></div>
      <p className="contact-description">Have something in mind? I’d be happy to hear from you.</p>
      <a className="contact-email text-link" href={`mailto:${socials.email}`}>{socials.email}<span aria-hidden="true">↗</span></a>
      <div className="social-links">
        <a className="text-link" href={socials.linkedin}>LinkedIn <span aria-hidden="true">↗</span></a>
        <a className="text-link" href={socials.github}>GitHub <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
}
