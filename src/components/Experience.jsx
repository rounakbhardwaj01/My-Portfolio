import { experiences } from '../data/experience'
import { ExternalIcon } from './icons'
import { SectionHeading } from './SectionHeading'

export function Experience() {
  return (
    <section className="section experience-section" id="experience" aria-labelledby="experience-title">
      <SectionHeading eyebrow="Experience" title="The next chapter is ahead." />
      {experiences.length === 0 ? (
        <div className="empty-experience" id="experience-title"><span>+</span><p>Currently building, learning, and looking for opportunities to create meaningful products.</p></div>
      ) : (
        <div className="experience-list" id="experience-title">
          {experiences.map((experience) => <article className="experience-card" key={`${experience.company}-${experience.role}`}>
            <div><p className="experience-dates">{experience.startDate} — {experience.endDate || 'Present'}</p><h3>{experience.role}</h3><p>{experience.company} · {experience.employmentType} · {experience.location}</p></div>
            {experience.companyUrl && <a href={experience.companyUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${experience.company}`}><ExternalIcon /></a>}
            <p>{experience.description}</p>
            {experience.technologies?.length > 0 && <ul className="tech-list">{experience.technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
          </article>)}
        </div>
      )}
    </section>
  )
}
