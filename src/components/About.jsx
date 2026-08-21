import { personal } from '../data/personal'
import { SectionHeading } from './SectionHeading'

export function About() {
  const focus = ['MERN stack', 'Secure APIs', 'Generative AI', 'Thoughtful UX']
  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <SectionHeading eyebrow="About" title="Building useful software with care." />
      <div className="about-grid">
        <p className="about-copy" id="about-title">{personal.about}</p>
        <div className="about-aside">
          <p>Focused on the craft</p>
          <ul>{focus.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>
  )
}
