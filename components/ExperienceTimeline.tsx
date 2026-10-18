import { experiences, type Experience } from '@/lib/data';

function ExperienceHeader({ experience }: { experience: Experience }) {
  const status = experience.status === 'past' ? null : experience.status;

  return (
    <>
      <span className="experience-title">
        <span className="role-title">
          {experience.position}
          {status && <span className="experience-status">{status}</span>}
        </span>
        <span className="organization">{experience.company}</span>
        {experience.status === 'incoming' && (
          <span className="incoming-location">{experience.location}</span>
        )}
      </span>
      <span className="experience-period">
        {experience.status === 'incoming' && <span className="sr-only">Starts </span>}
        {experience.period}
      </span>
      {experience.status !== 'incoming' && <span className="disclosure-icon" aria-hidden="true" />}
    </>
  );
}

function ExperienceDetails({ experience }: { experience: Experience }) {
  return (
    <div className="experience-details">
      <p className="detail-location">{experience.location}</p>
      <ul className="experience-highlights">
        {experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
      </ul>
      {experience.technologies.length > 0 && (
        <p className="technology-list">{experience.technologies.join(' · ')}</p>
      )}
      {experience.link && (
        <a className="text-link" href={experience.link} target="_blank" rel="noopener noreferrer">
          Visit organization <span aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}

export function ExperienceTimeline() {
  return (
    <section id="experience" className="content-section" aria-labelledby="experience-heading">
      <div className="section-heading">
        <h2 id="experience-heading">Experience</h2>
        <p>Work &amp; research</p>
      </div>
      <ol className="experience-timeline">
        {experiences.map((experience) => (
          <li key={experience.id} className={`experience-entry experience-${experience.status}`}>
            <span className="timeline-marker" aria-hidden="true" />
            {experience.status === 'incoming' ? (
              <div className="experience-summary incoming-summary">
                <ExperienceHeader experience={experience} />
              </div>
            ) : (
              <details>
                <summary className="experience-summary">
                  <ExperienceHeader experience={experience} />
                </summary>
                <ExperienceDetails experience={experience} />
              </details>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
