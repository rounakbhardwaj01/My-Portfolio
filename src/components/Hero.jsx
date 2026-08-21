import { personal } from '../data/personal'
import { ArrowIcon, GithubIcon, LinkedinIcon } from './icons'
import { ResumeLink } from './ResumeLink'

export function Hero({ profileImageUrl, resumeUrl }) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy reveal">
        <p className="eyebrow">Full-Stack Software Developer</p>
        <h1 id="hero-title">Rounak<br /><em>Bhardwaj.</em></h1>
        <p className="hero-description">{personal.intro}</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#projects"><span>View My Work</span><ArrowIcon /></a>
          <ResumeLink resumeUrl={resumeUrl} />
        </div>
        <div className="hero-socials" aria-label="Social links">
          <a href={personal.social.github} target="_blank" rel="noreferrer" aria-label="Rounak Bhardwaj on GitHub"><GithubIcon /></a>
          <a href={personal.social.linkedin} target="_blank" rel="noreferrer" aria-label="Rounak Bhardwaj on LinkedIn"><LinkedinIcon /></a>
          <span>{personal.location}</span>
        </div>
      </div>
      <div className="hero-portrait reveal" aria-label={profileImageUrl ? 'Portrait of Rounak Bhardwaj' : 'Profile photo placeholder'}>
        <div className="portrait-aura" />
        <div className="portrait-frame">
          {profileImageUrl ? <img src={profileImageUrl} alt="Rounak Bhardwaj" /> : <div className="portrait-placeholder"><span>RB</span><small>Profile photo</small></div>}
        </div>
        <p className="portrait-caption"><span />Available for opportunities</p>
      </div>
      <a className="scroll-cue" href="#about">Scroll to explore <span>↓</span></a>
    </section>
  )
}
