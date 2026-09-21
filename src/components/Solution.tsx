import { Reveal } from './Reveal'
export function Solution() {
  return (
    <section id="solution" className="scroll-mt-20 overflow-x-clip py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="section-label text-teal">המוצר</p>
            <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
              דוח בדיקה → עומק → תיקון SEO / UX
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-slate-muted sm:text-base">
              זה המוצר: דוח בדיקת אתר לעסקים. רואים מצב, הפסדים ופער מול מתחרים —
              ואז בוחרים איך לתקן: SEO, UX, או את שניהם. אופציה להמשך קידום SEO חודשי.
              לא התאמת כלי AI.
            </p>
            <ul className="mt-7 space-y-3.5">
              {[
                'דוח בדיקה: איפה האתר עומד ומה דולף',
                'דוח עומק: סדרי עדיפויות ברורים לתקן',
                'תיקון: SEO · UX · או ביחד (+ קידום חודשי)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px] text-navy">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/15 text-[11px] font-bold text-teal"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#lead-form"
              className="btn-primary btn-press btn-teal mt-8 inline-flex min-h-12 items-center rounded-xl bg-teal px-6 py-3 text-[14px] font-semibold text-white hover:bg-teal-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              התחילו בדוח בדיקה
            </a>
          </div>

          <div className="relative min-w-0 overflow-hidden">
            <div
              className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-teal/15 via-transparent to-gold/15 blur-2xl"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-navy p-6 text-white shadow-2xl sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.2),transparent_50%)]" aria-hidden />
              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium text-teal-light/80">Press AI · דוח אתר</p>
                  <h3 className="mt-1 text-lg font-bold">בדיקה → עומק → תיקון</h3>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-center backdrop-blur-sm">
                  <div className="text-2xl font-extrabold text-gold-soft">PDF</div>
                  <div className="text-[10px] text-white/60">למייל</div>
                </div>
              </div>
              <div className="relative mt-6 grid grid-cols-2 gap-3">
                {[
                  { t: 'SEO', d: 'נראות בגוגל' },
                  { t: 'UX', d: 'המרה ואמון' },
                  { t: 'מתחרים', d: 'איפה עוקפים' },
                  { t: 'תיקונים', d: 'מה קודם' },
                ].map((c) => (
                  <div
                    key={c.t}
                    className="rounded-xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition hover:bg-white/10"
                  >
                    <div className="text-[13px] font-semibold text-teal-light">{c.t}</div>
                    <div className="mt-0.5 text-[11px] text-white/50">{c.d}</div>
                  </div>
                ))}
              </div>
              <p className="relative mt-6 border-t border-white/10 pt-4 text-[12px] leading-relaxed text-white/55">
                התוצאה: אתר תקין יותר, חוויה טובה יותר, לקוחות מרוצים יותר — והמרות גבוהות יותר.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
