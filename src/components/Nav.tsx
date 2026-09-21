import { useEffect, useId, useState } from 'react'
import { Logo } from './Logo'

const WA =
  'https://wa.me/972538401100?text=' +
  encodeURIComponent('שלום, אשמח לקבל דוח בדיקה לאתר שלי')

const secondaryLinks = [
  { href: '#pain', label: 'הבעיה' },
  { href: '#solution', label: 'הפתרון' },
  { href: '#how', label: 'איך זה עובד' },
  { href: '#packages', label: 'חבילות' },
  { href: '#trust', label: 'אמון' },
]

/** Primary central service — site-audit report funnel */
const PRIMARY = {
  href: '#report',
  label: 'דוח בדיקת אתר',
  short: 'דוח בדיקה',
}

export function Nav() {
  const [open, setOpen] = useState(false)
  const menuId = useId()

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function close() {
    setOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy/5 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <div className="min-w-0 shrink">
          <Logo />
        </div>

        {/* Desktop nav — primary service centered/highlighted */}
        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:gap-2 lg:flex"
          aria-label="ניווט ראשי"
        >
          {secondaryLinks.slice(0, 2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-muted transition hover:text-navy"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PRIMARY.href}
            className="mx-1 inline-flex min-h-11 items-center rounded-full bg-teal/12 px-3.5 py-2 text-[13px] font-bold text-teal ring-1 ring-teal/25 transition hover:bg-teal/18 hover:ring-teal/40"
            aria-current="page"
          >
            {PRIMARY.label}
          </a>
          {secondaryLinks.slice(2).map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-2.5 py-2 text-[13px] font-medium text-slate-muted transition hover:text-navy"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* Primary service — visible on tablet/mobile when desktop nav hidden */}
          <a
            href={PRIMARY.href}
            className="inline-flex min-h-11 max-w-[9.5rem] items-center truncate rounded-full bg-teal/12 px-2.5 py-2 text-[12px] font-bold text-teal ring-1 ring-teal/25 transition hover:bg-teal/18 sm:max-w-none sm:px-3.5 sm:text-[13px] lg:hidden"
          >
            <span className="sm:hidden">{PRIMARY.short}</span>
            <span className="hidden sm:inline">{PRIMARY.label}</span>
          </a>

          <a
            href="#lead-form"
            className="hidden min-h-11 items-center rounded-full border border-navy/10 bg-cream/80 px-3.5 py-2 text-[13px] font-semibold text-navy transition hover:border-teal/30 hover:text-teal xl:inline-flex"
          >
            לטופס
          </a>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-[#25D366] px-2.5 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:px-3.5"
            aria-label="פתחו שיחת WhatsApp"
          >
            <WhatsAppIcon />
            <span className="hidden min-[400px]:inline">WhatsApp</span>
          </a>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-navy/10 bg-white text-navy transition hover:border-teal/30 hover:text-teal lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          id={menuId}
          className="border-t border-navy/5 bg-white px-4 pb-4 pt-2 shadow-lg lg:hidden"
          role="dialog"
          aria-label="תפריט ניווט"
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="ניווט מובייל">
            <a
              href={PRIMARY.href}
              onClick={close}
              className="flex min-h-11 items-center justify-between rounded-xl bg-teal/10 px-4 py-3 text-[15px] font-bold text-teal ring-1 ring-teal/20"
            >
              <span>{PRIMARY.label}</span>
              <span className="text-[11px] font-semibold text-teal/70">שירות מרכזי</span>
            </a>
            {secondaryLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={close}
                className="flex min-h-11 items-center rounded-xl px-4 py-3 text-[15px] font-medium text-navy transition hover:bg-cream"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#lead-form"
              onClick={close}
              className="mt-1 flex min-h-12 items-center justify-center rounded-xl bg-navy px-4 py-3 text-[15px] font-semibold text-white"
            >
              קבלו דוח בדיקה
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 6.045L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
