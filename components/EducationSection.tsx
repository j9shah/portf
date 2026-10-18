import { education, skillGroups } from '@/lib/data';

export function EducationSection() {
  return (
    <section id="education" className="content-section" aria-labelledby="education-heading">
      <div className="section-heading"><h2 id="education-heading">Education &amp; skills</h2></div>
      <div className="education-entry">
        <div><h3>{education.institution}</h3><p className="education-degree">{education.degree}</p></div>
        <p className="education-graduation">{education.graduation}</p>
      </div>
      <p className="education-gpa">CGPA <span>{education.gpa}</span></p>
      <p className="coursework"><span>Coursework</span> {education.coursework.join(' · ')}</p>
      <dl className="skill-groups">
        {skillGroups.map((group) => (
          <div key={group.label} className="skill-group"><dt>{group.label}</dt><dd>{group.skills.join(', ')}</dd></div>
        ))}
      </dl>
    </section>
  );
}
