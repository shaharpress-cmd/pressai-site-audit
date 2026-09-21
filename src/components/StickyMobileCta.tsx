import { useEffect, useState } from 'react'

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      const form = document.getElementById('lead-form')
      if (!form) return
      const formTop = form.getBoundingClientRect().top
      const pastHero = window.scrollY > 420
      const formInView = formTop < window.innerHeight * 0.85
      setVisible(pastHero && !formInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (!visible) return null

  return (
    <div className="sticky-cta-bar fixed inset-x-0 bottom-0 z-40 max-w-full border-t border-navy/8 bg-white/95 px-4 pb-3 pt-3 backdrop-blur-md md:hidden">
      <a
        href="#lead-form"
        className="btn-primary btn-press btn-teal flex min-h-12 w-full items-center justify-center rounded-xl bg-teal px-3 text-center text-[14px] font-bold leading-snug text-white hover:bg-teal-bright sm:text-[15px]"
      >
        קבלו דוח אבחון למייל
      </a>
    </div>
  )
}
