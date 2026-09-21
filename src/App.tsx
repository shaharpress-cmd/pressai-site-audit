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
import type { IndustrySample } from './lib/industries'

export default function App() {
  const [formUrl, setFormUrl] = useState('')
  const [verticalId, setVerticalId] = useState<string | null>(null)

  const handleHeroUrl = useCallback((url: string) => {
    setFormUrl(url)
    requestAnimationFrame(() => {
      document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.setTimeout(() => {
        document.getElementById('f-url')?.focus()
      }, 400)
    })
  }, [])

  const handleSelectVertical = useCallback((ind: IndustrySample) => {
    setVerticalId(ind.id)
  }, [])

  return (
    <div className="site-shell min-h-screen overflow-x-clip pb-20 md:pb-0">
      <a
        href="#lead-form"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
      >
        דלגו לטופס דוח הבדיקה
      </a>
      <Nav />
      <main className="min-w-0 max-w-full overflow-x-clip">
        <Hero onUrlSubmit={handleHeroUrl} />
        <TrustStrip onSelectVertical={handleSelectVertical} />
        <Pain />
        <Solution />
        <HowItWorks />
        <ReportTeaser verticalId={verticalId} />
        <Packages />
        <Testimonials />
        <LeadForm initialUrl={formUrl} />
      </main>
      <Footer />
      <StickyMobileCta />
    </div>
  )
}
