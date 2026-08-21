export function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

export function ExternalIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 5h5v5M19 5l-9 9M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4" /></svg>
}

export function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-3.87c.04-1.08-.36-2.13-1.1-2.92 3.6-.4 7.38-1.77 7.38-8a6.27 6.27 0 0 0-1.67-4.36A5.82 5.82 0 0 0 19.45.4S18.1 0 15 2.1a15.29 15.29 0 0 0-8 0C3.9 0 2.55.4 2.55.4a5.82 5.82 0 0 0-.16 2.45A6.27 6.27 0 0 0 .72 7.21c0 6.22 3.78 7.6 7.38 8-.73.78-1.12 1.83-1.08 2.9V22M8.1 19c-3 .92-3.63-1.28-3.63-1.28-.5-1.25-1.2-1.58-1.2-1.58-.98-.67.07-.66.07-.66 1.08.08 1.65 1.11 1.65 1.11.96 1.64 2.52 1.17 3.14.9" /></svg>
}

export function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 9.5V18M6.5 6.2v.1M10.5 18v-4.7a3.8 3.8 0 0 1 7.6 0V18M10.5 9.5V18M3.5 3.5h17a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1Z" /></svg>
}

export function MailIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm0 2 8 5 8-5" /></svg>
}

export function MenuIcon({ open }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={open ? 'M6 6l12 12M18 6 6 18' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
}
