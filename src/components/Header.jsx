import { useState } from 'react'
import { MenuIcon } from './icons'

const links = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Research', '#research'],
  ['Contact', '#contact'],
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Rounak Bhardwaj home">RB<span>.</span></a>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-navigation" aria-label={open ? 'Close menu' : 'Open menu'}>
        <MenuIcon open={open} />
      </button>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} id="site-navigation" aria-label="Main navigation">
        {links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
    </header>
  )
}
