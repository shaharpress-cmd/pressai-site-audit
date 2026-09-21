import { useEffect, useId, useRef, useState } from 'react'
import { industries, type IndustrySample } from '../lib/industries'

const badges = [
  { label: 'אבטחת מידע', sub: 'העברת פרטים מאובטחת' },
  { label: 'פרטיות', sub: 'לא נמכור את המידע' },
  { label: 'שקיפות', sub: 'ללא הבטחת דירוג' },
  { label: 'ללא התחייבות', sub: 'אבחון לפני הצעה' },
]

type Props = {
  onSelectVertical?: (industry: IndustrySample) => void
}

export function TrustStrip({ onSelectVertical }: Props) {
  const [active, setActive] = useState<IndustrySample | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const descId = useId()

  useEffect(() => {
    if (!active) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => {
      dialogRef.current?.querySelector<HTMLElement>('button, a')?.focus()
    }, 50)
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  function openIndustry(ind: IndustrySample) {
    setActive(ind)
    onSelectVertical?.(ind)
  }

  function goToFullReport() {
    const id = active?.id
    setActive(null)
    requestAnimationFrame(() => {
      const el = document.getElementById('report')
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (id) {
        el?.setAttribute('data-vertical', id)
        el?.classList.add('report-highlight')
        window.setTimeout(() => el?.classList.remove('report-highlight'), 2200)
      }
    })
  }

  return (
    <section aria-label="סימני אמון" className="overflow-x-clip border-y border-navy/6 bg-white py-8 sm:py-10">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-muted/80">
          סימני אמון · לדוגמה לפי תחום
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center rounded-xl border border-navy/6 bg-cream/60 px-3 py-3.5 text-center"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-[13px] font-bold text-teal"
                aria-hidden
              >
                ✓
              </span>
              <span className="mt-2 text-[13px] font-bold text-navy">{b.label}</span>
              <span className="mt-0.5 text-[11px] text-slate-muted">{b.sub}</span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <p className="mb-3 text-center text-[12px] text-slate-muted">
            לחצו על תחום לראות דוגמת ציונים מתוך דוח בדיקה (לא מדריך תיקון)
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            {industries.map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => openIndustry(ind)}
                aria-haspopup="dialog"
                aria-expanded={active?.id === ind.id}
                className="industry-chip group inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-navy/20 bg-white px-3.5 py-2 text-[12px] font-semibold text-navy shadow-sm transition duration-200 hover:border-teal/50 hover:bg-teal/5 hover:text-teal hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal active:scale-[0.98] sm:px-4 sm:text-[13px]"
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-md bg-navy/8 text-[10px] font-bold text-navy/55 transition group-hover:bg-teal/15 group-hover:text-teal"
                  aria-hidden
                >
                  ◈
                </span>
                <span className="max-w-[10rem] truncate sm:max-w-none">{ind.label}</span>
                <span className="hidden text-[10px] font-medium text-slate-muted/70 sm:inline group-hover:text-teal/70">
                  דוגמה
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-navy/45 backdrop-blur-[2px]"
            aria-label="סגירת חלון"
            onClick={() => setActive(null)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            className="relative z-[61] flex max-h-[min(92vh,640px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border border-navy/10 bg-white shadow-2xl sm:rounded-2xl"
          >
            <div className="shrink-0 border-b border-navy/6 bg-navy px-5 py-4 text-white sm:px-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-teal-light/75">דוח בדיקה · דוגמה לפי תחום</p>
                  <h3 id={titleId} className="mt-1 truncate text-lg font-bold">
                    {active.label}
                  </h3>
                </div>
                <div className="shrink-0 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-center">
                  <div className="text-2xl font-extrabold text-gold-soft">{active.overall.toFixed(1)}</div>
                  <div className="text-[9px] text-white/55">ציון / 10</div>
                </div>
              </div>
              <p id={descId} className="mt-3 text-[13px] leading-relaxed text-white/70">
                {active.blurb}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-4 sm:px-6">
              <div className="grid grid-cols-2 gap-2.5">
                {active.scores.map((s) => (
                  <div
                    key={s.label}
                    className="min-w-0 rounded-xl border border-navy/8 bg-cream/50 p-2.5 text-center"
                  >
                    <div className="text-lg font-extrabold text-navy">{s.value.toFixed(1)}</div>
                    <div className="mt-0.5 text-[10px] font-medium leading-snug text-slate-muted">{s.label}</div>
                    <div className="score-track mt-2 h-1.5 overflow-hidden rounded-full bg-navy/5">
                      <div
                        className={`score-bar h-full max-w-full rounded-full ${s.color}`}
                        style={{ width: `${s.value * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-xl border border-orange-200/60 bg-orange-50/50 p-3.5">
                <h4 className="text-[12px] font-bold text-orange-800">איפה מפסידים (דוגמה)</h4>
                <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-navy/80">
                  {active.losses.map((l) => (
                    <li key={l}>• {l}</li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] text-slate-muted">
                  הציונים לדוגמה בלבד — לא מדריך עשה־זאת־בעצמך. התיקון איתנו אחרי הדוח שלכם.
                </p>
              </div>
            </div>

            <div className="shrink-0 space-y-2 border-t border-navy/6 bg-cream/40 px-5 py-4 sm:px-6">
              <a
                href="#lead-form"
                onClick={() => setActive(null)}
                className="btn-primary btn-teal flex min-h-12 w-full items-center justify-center rounded-xl bg-teal px-3 text-[14px] font-bold text-white hover:bg-teal-bright"
              >
                קבלו דוח בדיקה לאתר שלכם
              </a>
              <button
                type="button"
                onClick={goToFullReport}
                className="flex min-h-11 w-full items-center justify-center rounded-xl border border-navy/12 bg-white px-3 text-[13px] font-semibold text-navy transition hover:border-teal/35 hover:text-teal"
              >
                ראו דוגמת דוח מלאה ↓
              </button>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mx-auto block min-h-10 px-3 text-[12px] font-medium text-slate-muted underline-offset-2 hover:text-navy hover:underline"
              >
                סגירה
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
