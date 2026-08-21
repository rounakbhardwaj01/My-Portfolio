import { ArrowIcon } from './icons'

export function ResumeLink({ resumeUrl, compact = false }) {
  if (!resumeUrl) {
    return <span className={compact ? 'text-link unavailable' : 'button button-secondary unavailable'} aria-disabled="true" title="Add your PDF path in src/config/site.js to enable downloads">{compact ? 'Resume not uploaded yet' : 'Download Resume'}</span>
  }

  return <a className={compact ? 'text-link' : 'button button-secondary'} href={resumeUrl} download><span>Download Resume</span>{!compact && <ArrowIcon />}</a>
}
