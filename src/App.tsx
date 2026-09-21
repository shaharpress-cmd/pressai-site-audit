import { useState, useCallback } from 'react'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { Pain } from './components/Pain'
import { Solution } from './components/Solution'
import { HowItWorks } from './components/HowItWorks'
import { ReportTeaser } from './components/ReportTeaser'
import { Packages } from './components/Packages'
import { Testimonials } from './components/Testimonials'
import { LeadForm } from './components/LeadForm'
import { Footer } from './components/Footer'
import { StickyMobileCta } from './components/StickyMobileCta'

export default function App() {
  const [formUrl, setFormUrl] = useState('')

  const handleHeroUrl = useCallback((url: string) => {
    setFormUrl(url)
    requestAnimationFrame(() => {
      document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => {
        document.getElementById('f-url')?.focus()
      }, 400)
    })
  }, [])

  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <a
        href="#lead-form"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
      >
        דלגו לטופס דוח הבדיקה
      </a>
      <Nav />
      <main>
        <Hero onUrlSubmit={handleHeroUrl} />
        <TrustStrip />
        <Pain />
        <Solution />
        <HowItWorks />
        <ReportTeaser />
        <Packages />
        <Testimonials />
        <LeadForm initialUrl={formUrl} />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
