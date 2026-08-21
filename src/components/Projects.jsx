import { projects } from '../data/projects'
import { ArrowIcon, ExternalIcon, GithubIcon } from './icons'
import { SectionHeading } from './SectionHeading'

function ProjectLink({ href, type }) {
  if (!href) return <span className="project-link unavailable" title="Link will be added when available">{type === 'github' ? 'Code link pending' : 'Live link pending'}</span>
  const Icon = type === 'github' ? GithubIcon : ExternalIcon
  return <a className="project-link" href={href} target="_blank" rel="noreferrer"><Icon />{type === 'github' ? 'Source' : 'Live demo'}</a>
}

export function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <SectionHeading eyebrow="Selected work" title="Projects with purpose.">Full-stack builds that pair robust application architecture with intelligent user experiences.</SectionHeading>
      <div className="projects-list" id="projects-title">
        {projects.map((project) => (
          <article className={project.featured ? 'project-card featured' : 'project-card'} key={project.title}>
            <div className="project-card-top">
              {project.featured && <span className="feature-label">Featured project</span>}
            </div>
            {project.image && <img className="project-image" src={project.image} alt={`${project.title} preview`} />}
            <div className="project-content">
              <p className="project-subtitle">{project.subtitle}</p>
              <h3>{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <ul className="feature-list">{project.features.map((feature) => <li key={feature}><ArrowIcon />{feature}</li>)}</ul>
            </div>
            <div className="project-bottom">
              <ul className="tech-list">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
              <div className="project-links"><ProjectLink href={project.githubUrl} type="github" /><ProjectLink href={project.liveUrl} type="live" /></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
