import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import { siteConfig } from './config/site'

export default function App() {
  return (
    <div className="page-shell">
      <Header />
      <main>
        <Hero profileImageUrl={siteConfig.profileImageUrl} resumeUrl={siteConfig.resumeUrl} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Research />
        <Education />
        <Contact endpoint={siteConfig.contactEndpoint} />
      </main>
      <Footer />
    </div>
  )
}
