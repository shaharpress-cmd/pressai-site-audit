import { useState, type FormEvent } from 'react'

type Props = {
  onUrlSubmit: (url: string) => void
}

const funnelSteps = [
  {
    value: '1',
    label: 'דוח בדיקה',
    body: 'תמונת מצב: SEO, UX ופער מול מתחרים',
    href: '#report',
    aria: 'לדוגמת דוח הבדיקה',
    delayClass: 'delay-3',
  },
  {
    value: '2',
    label: 'דוח עומק',
    body: 'מעמיקים בממצאים ומסמנים מה לתקן קודם',
    href: '#how',
    aria: 'איך עובד המשפך',
    delayClass: 'delay-4',
  },
  {
    value: '3',
    label: 'תיקון / קידום',
    body: 'SEO, UX או ביחד — ואפשר קידום חודשי',
    href: '#packages',
    aria: 'לחבילות תיקון וקידום',
    delayClass: 'delay-5',
  },
] as const

export function Hero({ onUrlSubmit }: Props) {
  const [url, setUrl] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = url.trim()
    if (!trimmed) {
      document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    onUrlSubmit(trimmed)
  }

  return (
    <section id="top" className="hero-glow relative overflow-x-clip overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-20">
      <div className="hero-orb start-0 top-10 h-56 w-56 -translate-x-1/4 bg-teal/20 sm:h-64 sm:w-64" aria-hidden />
      <div className="hero-orb end-0 top-32 h-56 w-56 translate-x-1/4 bg-gold/15 sm:h-64 sm:w-64" style={{ animationDelay: '2s' }} aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px gold-line opacity-70" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-teal/25 bg-white/70 px-3.5 py-1.5 text-[12px] font-semibold text-teal shadow-sm backdrop-blur-sm">
            <span className="dot-live h-1.5 w-1.5 rounded-full bg-teal" aria-hidden />
            דוח בדיקת אתר · SEO + UX · לא כלי AI
          </p>

          <h1 className="animate-fade-up delay-1 mt-7 text-[1.9rem] font-extrabold leading-[1.2] tracking-tight text-navy break-words sm:text-5xl sm:leading-[1.12]">
            דוח בדיקה לאתר —
            <br className="hidden sm:block" />
            <span className="text-teal">
              איפה אתם, מה{' '}
              <span className="loss-strike">מפסידים</span>
              , ואיך המתחרים עוקפים
            </span>
          </h1>

          <p className="animate-fade-up delay-2 mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-muted break-words sm:text-lg">
            הדביקו את כתובת האתר וקבלו דוח בדיקה מקצועי: מצב האתר, פער מול מתחרים,
            ונקודות שדולפות כסף ב־SEO ובחוויית משתמש. אחר כך — דוח עומק ותיקונים
            (SEO / UX / ביחד) כדי להמיר יותר.
          </p>

          <form
            onSubmit={handleSubmit}
            className="animate-fade-up delay-3 glass mx-auto mt-10 max-w-xl rounded-2xl p-3.5 shadow-[0_24px_60px_-20px_rgba(11,31,58,0.22)] sm:p-4"
          >
            <label htmlFor="hero-url" className="sr-only">
              כתובת האתר שלכם
            </label>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch">
              <div className="relative flex-1">
                <span
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[11px] text-slate-muted/50"
                  dir="ltr"
                  aria-hidden
                >
                  https://
                </span>
                <input
                  id="hero-url"
                  type="text"
                  inputMode="url"
                  dir="ltr"
                  placeholder="www.your-business.co.il"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="min-h-12 w-full rounded-xl border border-navy/10 bg-cream/90 py-0 pl-[4.25rem] pr-4 text-[15px] text-navy placeholder:text-slate-muted/50 focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
                />
              </div>
              <button
                type="submit"
                className="btn-primary btn-press cta-spotlight inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-navy px-4 text-[14px] font-semibold text-white hover:bg-navy-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:w-auto sm:px-7 sm:text-[15px]"
              >
                קבלו דוח בדיקה
              </button>
            </div>
            <p className="mt-3.5 text-center text-[12px] text-slate-muted">
              דוח → עומק → תיקון SEO / UX · בלי הבטחת מקום 1 בגוגל
            </p>
          </form>

          <div className="mt-14 grid grid-cols-3 gap-2.5 sm:gap-6" role="navigation" aria-label="שלבי המשפך">
            {funnelSteps.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.aria}
                className={`hero-step-card card-lift animate-fade-up group block rounded-2xl border border-navy/6 bg-white/70 px-2 py-4 text-center shadow-sm backdrop-blur-sm outline-none transition-colors focus-visible:border-teal focus-visible:ring-2 focus-visible:ring-teal/25 sm:px-4 sm:py-5 ${s.delayClass}`}
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-lg font-extrabold text-teal transition-colors group-hover:bg-teal group-hover:text-white sm:h-10 sm:w-10 sm:text-xl">
                  {s.value}
                </div>
                <div className="mt-2.5 text-[12px] font-bold text-navy sm:text-[14px]">{s.label}</div>
                <p className="mt-1.5 text-[11px] leading-snug text-slate-muted sm:text-[12px]">{s.body}</p>
                <span className="mt-2 inline-block text-[11px] font-semibold text-teal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-[12px]" aria-hidden>
                  המשך ↓
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
