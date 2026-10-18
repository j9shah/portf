import { projects, type Project } from '@/lib/data';

function ProjectEntry({ project, archived = false }: { project: Project; archived?: boolean }) {
  return (
    <article className={archived ? 'project archive-project' : 'project'} aria-labelledby={`project-${project.id}`}>
      <h3 id={`project-${project.id}`}>{project.name}</h3>
      <p className="project-description">{project.description}</p>
      <ul className="project-highlights">{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
      <p className="technology-list">{project.tech.join(' · ')}</p>
      <div className="project-links" aria-label={`${project.name} links`}>
        {project.github && <a className="text-link" href={project.github} aria-label={`${project.name} source on GitHub`}>Source <span aria-hidden="true">↗</span></a>}
        {project.demo && <a className="text-link" href={project.demo} aria-label={`${project.name} live site`}>Live site <span aria-hidden="true">↗</span></a>}
        {project.devpost && <a className="text-link" href={project.devpost} aria-label={`${project.name} on Devpost`}>Devpost <span aria-hidden="true">↗</span></a>}
      </div>
    </article>
  );
}

export function ProjectsGrid() {
  return (
    <section id="projects" className="content-section" aria-labelledby="projects-heading">
      <div className="section-heading"><h2 id="projects-heading">Projects</h2><p>Selected work</p></div>
      <div className="selected-projects">
        {projects.filter((project) => project.display === 'featured').map((project) => <ProjectEntry key={project.id} project={project} />)}
      </div>
      <div className="project-archive" aria-labelledby="archive-heading">
        <h3 id="archive-heading" className="archive-heading">Earlier projects</h3>
        {projects.filter((project) => project.display === 'archive').map((project) => <ProjectEntry key={project.id} project={project} archived />)}
      </div>
    </section>
  );
}
