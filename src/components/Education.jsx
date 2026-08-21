import { education } from '../data/education'
import { SectionHeading } from './SectionHeading'

export function Education() {
  return (
    <section className="section education-section" id="education" aria-labelledby="education-title">
      <SectionHeading eyebrow="Education" title="A strong base for what’s next." />
      <article className="education-card" id="education-title">
        <div><p className="education-date">Completing {education.graduation}</p><h3>{education.degree}</h3><p>{education.institution}</p><p>{education.location}</p></div>
        <div className="gpa"><span>GPA</span><strong>{education.gpa}</strong></div>
      </article>
    </section>
  )
}
