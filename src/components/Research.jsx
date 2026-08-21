import { research } from '../data/research'
import { ExternalIcon } from './icons'
import { SectionHeading } from './SectionHeading'

export function Research() {
  return (
    <section className="section research-section" id="research" aria-labelledby="research-title">
      <SectionHeading eyebrow="Research & publication" title="Curiosity, investigated.">A published exploration of practical cloud-computing strategy.</SectionHeading>
      <article className="research-card" id="research-title">
        <div className="research-mark">R</div>
        <div className="research-copy"><p className="eyebrow">{research.role}</p><h3>{research.journal}</h3><p>{research.summary}</p></div>
        <div className="research-meta"><p>{research.date}</p><ul>{research.themes.map((theme) => <li key={theme}>{theme}</li>)}</ul><a className="text-link" href={research.doiUrl} target="_blank" rel="noreferrer">Read publication <ExternalIcon /></a></div>
      </article>
    </section>
  )
}
