import { useEffect, useId, useRef, useState } from 'react'

const WA =
  'https://wa.me/972538401100?text=' +
  encodeURIComponent('שלום, אשמח לקבל דוח בדיקה לאתר שלי')

type TipId = 'home' | 'report' | 'packages' | 'lead' | 'whatsapp' | 'what'

const tips: Record<
  TipId,
  { title: string; body: string; action?: { label: string; href?: string; scroll?: string } }
> = {
  home: {
    title: 'איך אפשר לעזור?',
    body: 'אני עוזר ניווט בעמוד הזה בלבד — בלי בוט חי. בחרו לאן לגלול, או שאלו מה בדוח.',
  },
  report: {
    title: 'תצוגת הדוח',
    body: 'כאן רואים דוגמה לדוח בדיקה: ציונים, פער מול מתחרים, ומה מסומן לתיקון.',
    action: { label: 'גלילה לדוח', scroll: 'report' },
  },
  packages: {
    title: 'חבילות אחרי הדוח',
    body: 'אחרי הדוח בוחרים תיקון SEO, UX, או את שניהם. אין מחירים גלויים — הצעה לפי הממצאים.',
    action: { label: 'גלילה לחבילות', scroll: 'packages' },
  },
  lead: {
    title: 'טופס דוח הבדיקה',
    body: 'מלאו כתובת אתר ופרטי קשר — הדוח נשלח למייל אחרי הכנה מקצועית.',
    action: { label: 'גלילה לטופס', scroll: 'lead-form' },
  },
  whatsapp: {
    title: 'שיחה ב־WhatsApp',
    body: 'מעדיפים לדבר? פתחו WhatsApp עם הודעה מוכנה על דוח בדיקה.',
    action: { label: 'פתיחת WhatsApp', href: WA },
  },
  what: {
    title: 'מה בדוח?',
    body: 'הדוח מראה איפה האתר עומד ב־SEO וב־UX, מה דולף כסף, ואיך המתחרים עוקפים — לפני שמתחילים לתקן.',
    action: { label: 'ראו דוגמה בדוח', scroll: 'report' },
  },
}

const quickReplies: { id: TipId; label: string }[] = [
  { id: 'report', label: 'לדוח לדוגמה' },
  { id: 'packages', label: 'לחבילות' },
  { id: 'lead', label: 'לטופס' },
  { id: 'what', label: 'מה בדוח?' },
  { id: 'whatsapp', label: 'WhatsApp' },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function BotIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 8V4H8" />
      <rect width="16" height="12" x="4" y="8" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M9 13v2" />
      <path d="M15 13v2" />
    </svg>
  )
}

export function SiteAssistant() {
  const [open, setOpen] = useState(false)
  const [tip, setTip] = useState<TipId>('home')
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (!open) return
    const first = panelRef.current?.querySelector<HTMLElement>('button, a')
    first?.focus()
  }, [open])

  function pick(id: TipId) {
    setTip(id)
    const t = tips[id]
    if (t.action?.scroll) {
      window.setTimeout(() => scrollToId(t.action!.scroll!), 120)
    }
  }

  const current = tips[tip]

  return (
    <div className="site-assistant pointer-events-none fixed z-[45] max-w-[calc(100vw-1.5rem)]">
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-label="עוזר PRESS AI — ניווט בעמוד"
          className="pointer-events-auto mb-3 w-[min(20.5rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_24px_60px_-16px_rgba(11,31,58,0.35)]"
        >
          <div className="flex items-center justify-between gap-2 bg-navy px-4 py-3 text-white">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal/25 text-teal-light">
                <BotIcon />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[14px] font-bold">עוזר PRESS AI</p>
                <p className="truncate text-[11px] text-white/60">ניווט בעמוד · בלי בוט חי</p>
              </div>
            </div>
            <button
              type="button"
              className="btn-press inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="סגירת העוזר"
              onClick={() => setOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 p-4">
            <div className="rounded-xl border border-navy/6 bg-cream/80 px-3.5 py-3">
              <p className="text-[14px] font-bold text-navy">{current.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-muted">{current.body}</p>
              {current.action?.href && (
                <a
                  href={current.action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-press mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#25D366] px-4 text-[13px] font-semibold text-white"
                >
                  {current.action.label}
                </a>
              )}
              {current.action?.scroll && tip !== 'home' && (
                <button
                  type="button"
                  className="btn-primary btn-press btn-teal mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-teal px-4 text-[13px] font-semibold text-white hover:bg-teal-bright"
                  onClick={() => scrollToId(current.action!.scroll!)}
                >
                  {current.action.label}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="קיצורי ניווט">
              {quickReplies.map((q) => (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => pick(q.id)}
                  className={`btn-press inline-flex min-h-10 items-center rounded-full border px-3 text-[12px] font-semibold transition ${
                    tip === q.id
                      ? 'border-teal/40 bg-teal/12 text-teal'
                      : 'border-navy/10 bg-white text-navy hover:border-teal/30 hover:text-teal'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        className="btn-press pointer-events-auto inline-flex min-h-14 items-center gap-2 rounded-full bg-navy px-4 py-3 text-white shadow-[0_16px_40px_-12px_rgba(11,31,58,0.55)] ring-2 ring-teal/40 transition hover:bg-navy-soft hover:ring-teal/60"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? 'סגירת עוזר PRESS AI' : 'פתיחת עוזר PRESS AI'}
        onClick={() => {
          setOpen((v) => !v)
          if (!open) setTip('home')
        }}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-white">
          <BotIcon />
        </span>
        <span className="pe-1 text-[13px] font-bold leading-tight">
          עוזר
          <span className="block text-[11px] font-medium text-teal-light/90">PRESS AI</span>
        </span>
      </button>
    </div>
  )
}
