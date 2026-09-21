import { useCallback, useEffect, useId, useRef, useState } from 'react'

const STORAGE_KEY = 'pressai-site-audit-a11y'
const A11Y_STATEMENT = 'https://pressai.co.il/legal/accessibility'

type A11yFlag = 'largeText' | 'contrast' | 'underline' | 'reduceMotion'

const FLAG_CLASS: Record<A11yFlag, string> = {
  largeText: 'a11y-large-text',
  contrast: 'a11y-contrast',
  underline: 'a11y-underline',
  reduceMotion: 'a11y-reduce-motion',
}

type A11yState = Record<A11yFlag, boolean>

const DEFAULT_STATE: A11yState = {
  largeText: false,
  contrast: false,
  underline: false,
  reduceMotion: false,
}

const OPTIONS: {
  id: A11yFlag
  title: string
  hint: string
}[] = [
  {
    id: 'largeText',
    title: 'הגדלת טקסט',
    hint: 'מגדיל גופן בתוכן הראשי לקריאה נוחה יותר',
  },
  {
    id: 'contrast',
    title: 'ניגודיות גבוהה',
    hint: 'טקסט כהה יותר על רקע בהיר וחד',
  },
  {
    id: 'underline',
    title: 'הדגשת קישורים',
    hint: 'מוסיף קו תחתון לקישורים בתוכן',
  },
  {
    id: 'reduceMotion',
    title: 'עצירת אנימציות',
    hint: 'מכבה אנימציות ומעברים באתר',
  },
]

function readStored(): A11yState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw) as Partial<A11yState>
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

function applyToHtml(state: A11yState) {
  const root = document.documentElement
  ;(Object.keys(FLAG_CLASS) as A11yFlag[]).forEach((key) => {
    root.classList.toggle(FLAG_CLASS[key], Boolean(state[key]))
  })
}

function AccessibilityIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
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
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </svg>
  )
}

export function AccessibilityLauncher() {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<A11yState>(DEFAULT_STATE)
  const [ready, setReady] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initial = readStored()
    setState(initial)
    applyToHtml(initial)
    setReady(true)
  }, [])

  const persist = useCallback((next: A11yState) => {
    setState(next)
    applyToHtml(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* ignore quota / private mode */
    }
  }, [])

  function toggle(flag: A11yFlag) {
    persist({ ...state, [flag]: !state[flag] })
  }

  function reset() {
    persist({ ...DEFAULT_STATE })
  }

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

  const anyOn = Object.values(state).some(Boolean)

  return (
    <div className="accessibility-dock pointer-events-none fixed z-[46] max-w-[calc(100vw-1.5rem)]">
      {open && (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="כלי נגישות"
          className="accessibility-sheet pointer-events-auto mb-3 w-[min(22rem,calc(100vw-1.5rem))] overflow-hidden rounded-2xl border border-navy/10 bg-cream shadow-[0_24px_60px_-16px_rgba(11,31,58,0.35)]"
          dir="rtl"
        >
          <div className="flex items-start justify-between gap-3 border-b border-navy/8 bg-white px-4 py-3.5">
            <div className="min-w-0">
              <h2 className="text-[17px] font-extrabold text-navy">נגישות</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-slate-muted">
                התאמות תצוגה במכשיר זה בלבד. הבחירה נשמרת אוטומטית.
              </p>
            </div>
            <button
              type="button"
              className="btn-press inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg text-navy/70 transition hover:bg-navy/5 hover:text-navy"
              aria-label="סגירת כלי נגישות"
              onClick={() => setOpen(false)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="space-y-2 p-3.5" role="group" aria-label="אפשרויות נגישות">
            {OPTIONS.map((opt) => {
              const on = state[opt.id]
              return (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn-press flex w-full items-center gap-3 rounded-xl border px-3 py-3 text-start transition ${
                    on
                      ? 'border-teal/40 bg-teal/10'
                      : 'border-navy/10 bg-white hover:border-teal/25'
                  }`}
                  aria-pressed={on}
                  onClick={() => toggle(opt.id)}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      on ? 'bg-teal text-white' : 'bg-navy/6 text-navy'
                    }`}
                    aria-hidden
                  >
                    <OptionGlyph id={opt.id} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-bold text-navy">{opt.title}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-slate-muted">{opt.hint}</span>
                  </span>
                  <span
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      on ? 'bg-teal' : 'bg-navy/15'
                    }`}
                    aria-hidden
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
                        on ? 'inset-inline-start-5' : 'inset-inline-start-0.5'
                      }`}
                      style={{
                        insetInlineStart: on ? '1.25rem' : '0.125rem',
                      }}
                    />
                  </span>
                </button>
              )
            })}
          </div>

          <div className="space-y-2 border-t border-navy/8 bg-white px-3.5 py-3">
            <button
              type="button"
              className="btn-press flex min-h-11 w-full items-center justify-center rounded-xl border border-navy/12 bg-cream text-[13px] font-semibold text-navy transition hover:border-teal/30 hover:text-teal disabled:opacity-40"
              onClick={reset}
              disabled={!ready || !anyOn}
            >
              איפוס התאמות
            </button>
            <a
              href={A11Y_STATEMENT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press flex min-h-10 w-full items-center justify-center rounded-xl text-[13px] font-semibold text-teal underline-offset-2 hover:underline"
            >
              הצהרת נגישות
            </a>
            <p className="px-1 pb-1 text-center text-[11px] leading-relaxed text-slate-muted">
              הכלי הוא שכבת עזר ואינו מחליף קוד נגיש או בדיקה עם טכנולוגיות מסייעות.
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        className="accessibility-launcher btn-press pointer-events-auto relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-navy/10 bg-white/95 text-navy shadow-[0_10px_28px_-12px_rgba(11,31,58,0.45)] backdrop-blur-md ring-1 ring-navy/5 transition hover:border-teal/30 hover:text-teal"
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        aria-label={open ? 'סגירת כלי נגישות' : 'פתיחת כלי נגישות'}
        title={open ? 'סגירת כלי נגישות' : 'פתיחת כלי נגישות'}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/12 text-teal"
          aria-hidden
        >
          <AccessibilityIcon />
        </span>
        {anyOn && (
          <span
            className="absolute end-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-teal"
            aria-hidden
          />
        )}
      </button>
    </div>
  )
}

function OptionGlyph({ id }: { id: A11yFlag }) {
  if (id === 'largeText') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M4 20V8h4v12M6 8V4h8v4M14 20V10h6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (id === 'contrast') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18a9 9 0 0 0 0-18z" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  if (id === 'underline') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d="M6 4v7a6 6 0 0 0 12 0V4M4 20h16" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 9v6M14 9v6" strokeLinecap="round" />
    </svg>
  )
}
