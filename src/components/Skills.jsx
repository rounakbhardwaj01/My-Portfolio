import { skillGroups } from '../data/skills'
import { SectionHeading } from './SectionHeading'

export function Skills() {
  return (
    <section className="section skills-section" id="skills" aria-labelledby="skills-title">
      <SectionHeading eyebrow="Technical skills" title="A practical, modern toolkit.">Technologies I use to take an idea from interface to infrastructure.</SectionHeading>
      <div className="skills-grid" id="skills-title">
        {skillGroups.map((group) => (
          <article className="skill-group" key={group.category}>
            <h3>{group.category}</h3>
            <ul>{group.skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  )
}
