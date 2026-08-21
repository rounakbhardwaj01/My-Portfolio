import { personal } from '../data/personal'

export function Footer() {
  return <footer className="site-footer"><p>© {new Date().getFullYear()} {personal.name}</p><a href="#top">Back to top ↑</a></footer>
}
