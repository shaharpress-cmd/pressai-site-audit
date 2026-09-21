import { useEffect, useRef, useState } from 'react'
import { industries } from '../lib/industries'

const defaultScores = [
  { label: 'SEO / גוגל', value: 4.2, color: 'bg-teal' },
  { label: 'UX / המרה', value: 5.1, color: 'bg-amber-400' },
  { label: 'מהירות', value: 3.8, color: 'bg-rose-400' },
  { label: 'אמון / בהירות', value: 5.5, color: 'bg-orange-400' },
]

const gapSets = {
  seo: [
    { label: 'האתר שלכם', pct: 38, tone: 'bg-rose-400' },
    { label: 'מתחרה א׳', pct: 82, tone: 'bg-teal' },
    { label: 'מתחרה ב׳', pct: 74, tone: 'bg-teal/70' },
    { label: 'מתחרה ג׳', pct: 68, tone: 'bg-teal/50' },
  ],
  ux: [
    { label: 'האתר שלכם', pct: 45, tone: 'bg-rose-400' },
    { label: 'מתחרה א׳', pct: 79, tone: 'bg-amber-400' },
    { label: 'מתחרה ב׳', pct: 72, tone: 'bg-amber-400/80' },
    { label: 'מתחרה ג׳', pct: 66, tone: 'bg-amber-400/60' },
  ],
} as const

type GapMode = keyof typeof gapSets

type Props = {
  verticalId?: string | null
}

function useCountUp(target: number, active: boolean, duration = 1200) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) {
      setValue(0)
      return
    }
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return value
}

export function ReportTeaser({ verticalId = null }: Props) {
  const [animated, setAnimated] = useState(false)
  const [gapMode, setGapMode] = useState<GapMode>('seo')
  const sectionRef = useRef<HTMLElement>(null)

  const industry = verticalId ? industries.find((i) => i.id === verticalId) : undefined
  const scores = industry?.scores ?? defaultScores
  const overall = industry?.overall ?? 4.7
  const verticalLabel = industry?.label ?? null
  const gaps = gapSets[gapMode]
  const lossExample = gapMode === 'seo' ? 4200 : 3100
  const lossShown = useCountUp(lossExample, animated, 1100)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setAnimated(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimated(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!verticalId) return
    setAnimated(false)
    const t = window.setTimeout(() => setAnimated(true), 40)
    return () => window.clearTimeout(t)
  }, [verticalId])

  function switchGap(mode: GapMode) {
    setGapMode(mode)
    setAnimated(false)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.setTimeout(() => setAnimated(true), reduce ? 0 : 40)
  }

  return (
    <section
      id="report"
      ref={sectionRef}
      className="scroll-mt-20 overflow-x-clip py-16 sm:py-20"
      data-vertical={verticalId ?? undefined}
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-teal">תצוגת הדוח</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            כך נראה דוח הבדיקה — בלי לתת לכם לתקן לבד
          </h2>
          <p className="mt-4 text-[15px] text-slate-muted">
            ציונים לדוגמה, פער מול מתחרים, ומה נראה בדוח. הפתרונות והיישום — אחרי הדוח, איתנו.
          </p>
          {verticalLabel && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/8 px-3.5 py-1.5 text-[12px] font-semibold text-teal">
              דוגמה מותאמת לתחום: {verticalLabel}
            </p>
          )}
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_28px_70px_-24px_rgba(11,31,58,0.28)]">
          <div className="relative bg-navy px-5 py-6 text-white sm:px-7 sm:py-7">
            <div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.25),transparent_55%)]"
              aria-hidden
            />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[11px] font-medium text-teal-light/70">
                  דוח בדיקת אתר · Press AI · דוגמה
                  {verticalLabel ? ` · ${verticalLabel}` : ''}
                </p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">סיכום ממצאים לדוגמה</h3>
                <p className="mt-1 break-all font-mono text-[12px] text-teal-light/80" dir="ltr">
                  https://example-business.co.il
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <div className="text-3xl font-extrabold text-gold-soft">{overall.toFixed(1)}</div>
                <div className="text-[10px] text-white/55">ציון כללי / 10</div>
              </div>
            </div>
            <p className="relative mt-4 max-w-xl text-[13px] leading-relaxed text-white/65">
              {industry?.blurb ??
                'האתר פעיל — אבל בדוגמה הזו הפער מול מתחרים בנראות ובהמרה משאיר פניות על השולחן.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-navy/5 bg-cream/50 p-4 sm:grid-cols-4 sm:p-5">
            {scores.map((s) => (
              <div
                key={s.label}
                className="min-w-0 rounded-xl border border-navy/6 bg-white p-2.5 text-center shadow-sm sm:p-3"
              >
                <div className="text-xl font-extrabold text-navy">{s.value.toFixed(1)}</div>
                <div className="mt-0.5 text-[10px] font-medium leading-snug text-slate-muted sm:text-[11px]">
                  {s.label}
                </div>
                <div className="score-track mt-2 h-1.5 overflow-hidden rounded-full bg-navy/5">
                  <div
                    className={`score-bar h-full max-w-full rounded-full ${s.color}`}
                    style={{ width: animated ? `${s.value * 10}%` : '0%' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0 border-b border-navy/5 p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h4 className="text-[14px] font-bold text-navy">פער מול מתחרים (דוגמה)</h4>
                <p className="mt-1 text-[12px] text-slate-muted">
                  לחצו להחלפה בין פער SEO לפער UX — הגרפים מתעדכנים.
                </p>
              </div>
              <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-muted">
                נתונים לדוגמה · לא האתר שלכם
              </span>
            </div>

            <div
              className="mt-4 inline-flex rounded-xl border border-navy/10 bg-cream/80 p-1"
              role="group"
              aria-label="בחירת סוג פער"
            >
              {(
                [
                  { id: 'seo' as const, label: 'פער SEO / גוגל' },
                  { id: 'ux' as const, label: 'פער UX / המרה' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => switchGap(opt.id)}
                  aria-pressed={gapMode === opt.id}
                  className={`btn-press min-h-11 rounded-lg px-3.5 text-[13px] font-semibold transition sm:px-4 ${
                    gapMode === opt.id
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-slate-muted hover:bg-white hover:text-navy'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-5 min-w-0 space-y-3" key={gapMode}>
              {gaps.map((row) => (
                <div key={row.label} className="min-w-0">
                  <div className="mb-1 flex justify-between gap-2 text-[12px]">
                    <span className="min-w-0 font-medium text-navy">{row.label}</span>
                    <span className="shrink-0 font-bold tabular-nums text-navy">{row.pct}</span>
                  </div>
                  <div className="gap-track h-3 overflow-hidden rounded-full bg-navy/5">
                    <div
                      className={`score-bar h-full max-w-full rounded-full ${row.tone}`}
                      style={{ width: animated ? `${row.pct}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-rose-200/70 bg-gradient-to-l from-rose-50 to-orange-50/80 p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-rose-700/80">
                    הפסד חודשי לדוגמה
                  </p>
                  <p className="mt-1 text-[13px] text-navy/75">
                    {gapMode === 'seo'
                      ? 'כשנראות בגוגל חלשה — פחות פניות נכנסות.'
                      : 'כשהחוויה מבלבלת — מבקרים עוזבים בלי להשאיר פרטים.'}
                  </p>
                </div>
                <div className="rounded-xl bg-white/90 px-4 py-3 text-center shadow-sm ring-1 ring-rose-200/60">
                  <div className="text-2xl font-extrabold tabular-nums text-rose-600 sm:text-3xl">
                    ₪{lossShown.toLocaleString('he-IL')}
                  </div>
                  <div className="mt-0.5 text-[10px] font-semibold text-slate-muted">לחודש · כדוגמה בלבד</div>
                </div>
              </div>
              <p className="mt-3 text-[11px] leading-relaxed text-slate-muted">
                המספר להמחשה בלבד — לא חישוב על האתר שלכם. בדוח האמיתי נסמן איפה הכסף דולף אצלכם.
              </p>
            </div>
          </div>

          <div className="grid gap-4 p-4 sm:grid-cols-3 sm:p-5">
            <div className="rounded-xl border border-teal/25 bg-teal/5 p-4">
              <h4 className="text-[13px] font-bold text-teal">מה כבר עובד</h4>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-navy/80">
                <li>• מסר בסיסי קיים</li>
                <li>• יש עמודי שירות</li>
                <li>• פרטי קשר זמינים</li>
              </ul>
            </div>
            <div className="rounded-xl border border-orange-300/40 bg-orange-50/60 p-4">
              <h4 className="text-[13px] font-bold text-orange-700">איפה מפסידים</h4>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-navy/80">
                {(industry?.losses ?? ['חיכוך במובייל', 'סיגנלי SEO חלשים', 'CTA לא חד']).map((l) => (
                  <li key={l}>• {l.replace(/^•\s*/, '')}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-navy/10 bg-navy/[0.03] p-4">
              <h4 className="text-[13px] font-bold text-navy">מה הדוח מסמן</h4>
              <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-navy/80">
                <li>• עדיפות SEO או UX</li>
                <li>• האם צריך דוח עומק</li>
                <li>• כיוון תיקון — לא מדריך DIY</li>
              </ul>
            </div>
          </div>

          <div className="grid gap-3 border-t border-navy/5 bg-cream/40 px-4 py-4 sm:grid-cols-3 sm:px-6">
            {[
              { t: 'דוח בדיקה', d: 'תמונת מצב + פער' },
              { t: 'דוח עומק', d: 'פירוט לפי צורך' },
              { t: 'תיקון', d: 'SEO · UX · ביחד' },
            ].map((x) => (
              <div
                key={x.t}
                className="rounded-xl border border-navy/6 bg-white px-3 py-3 text-center shadow-sm"
              >
                <div className="text-[13px] font-bold text-navy">{x.t}</div>
                <div className="mt-0.5 text-[11px] text-slate-muted">{x.d}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-navy/5 bg-teal/5 px-5 py-4 text-center text-[12px] text-slate-muted sm:px-7">
            הגרפים למעלה הם דוגמה בלבד. הדוח שלכם יהיה על האתר שלכם — והיישום איתנו, לא רשימת משימות לבד.
          </div>
        </div>
      </div>
    </section>
  )
}
