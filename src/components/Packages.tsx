import { Reveal } from './Reveal'
const packages = [
  {
    id: 'seo',
    name: 'תיקון SEO',
    tagline: 'אחרי דוח הבדיקה / העומק',
    meta: 'נראות בגוגל, מבנה, כותרות, אינדקס',
    features: [
      'יישום לפי ממצאי הדוח',
      'תיקונים טכניים ו־on-page',
      'עדיפויות לפי כסף אבוד',
      'אופציה: קידום SEO חודשי',
    ],
    featured: false,
    cta: 'קבלו דוח — ואז SEO',
  },
  {
    id: 'both',
    name: 'SEO + UX ביחד',
    tagline: 'המסלול השלם לאתר שממיר',
    meta: 'נראות + חוויה + המרות',
    features: [
      'הכול מתיקון SEO ו־UX',
      'מסר, CTA ומובייל',
      'פחות נטישה — יותר פניות',
      'אפשרות להמשך קידום חודשי',
    ],
    featured: true,
    cta: 'קבלו דוח — ואז שניהם',
  },
  {
    id: 'ux',
    name: 'תיקון UX',
    tagline: 'אחרי דוח הבדיקה / העומק',
    meta: 'מסע לקוח, בהירות, המרה',
    features: [
      'יישום לפי ממצאי הדוח',
      'חיכוך, טפסים, מובייל',
      'אמון וקריאות',
      'בלי לערבב עם קידום גוגל',
    ],
    featured: false,
    cta: 'קבלו דוח — ואז UX',
  },
]

export function Packages() {
  return (
    <section id="packages" className="scroll-mt-20 overflow-x-clip bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-gold">אחרי הדוח</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            קודם דוח → אחר כך תיקון SEO, UX או ביחד
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-muted">
            אין מחירים גלויים כאן. אחרי דוח הבדיקה (ולפי הצורך דוח עומק) —
            בוחרים מסלול תיקון. קידום SEO חודשי רק כאופציה אחרי תיקונים.
          </p>
        </div>

        <Reveal className="mt-12 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {packages.map((p) => (
            <article
              key={p.id}
              className={`card-lift relative flex min-w-0 flex-col overflow-hidden rounded-2xl border bg-white p-5 pt-7 sm:p-7 sm:pt-8 ${
                p.featured
                  ? 'border-teal/40 shadow-[0_24px_56px_-20px_rgba(13,148,136,0.4)] lg:-translate-y-3'
                  : 'border-navy/8 shadow-sm'
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 max-w-[calc(100%-1.5rem)] -translate-x-1/2 truncate rounded-full bg-gradient-to-l from-teal to-teal-bright px-3 py-1 text-center text-[10px] font-bold text-white shadow-md sm:text-[11px] sm:px-3.5">
                  הכי מתאים לרוב העסקים
                </span>
              )}
              <h3 className="text-xl font-extrabold text-navy">{p.name}</h3>
              <p className="mt-1 text-[13px] font-medium text-teal">{p.tagline}</p>
              <p className="mt-3 text-[12px] text-slate-muted">{p.meta}</p>
              <div className="gold-line my-5 opacity-40" />
              <ul className="flex-1 space-y-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-navy/85">
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal/12 text-[10px] font-bold text-teal"
                      aria-hidden
                    >
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#lead-form"
                className={`btn-primary mt-7 flex min-h-12 items-center justify-center rounded-xl px-3 py-3.5 text-center text-[13px] font-semibold leading-snug focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:text-[14px] ${
                  p.featured
                    ? 'btn-teal bg-teal text-white hover:bg-teal-bright'
                    : 'bg-navy text-white hover:bg-navy-soft'
                }`}
              >
                {p.cta}
              </a>
            </article>
          ))}
        </Reveal>

        <div className="glass mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl px-5 py-6 shadow-sm sm:flex-row sm:px-8">
          <div>
            <p className="font-bold text-navy">הצעד הראשון: דוח הבדיקה</p>
            <p className="mt-1 text-[13px] text-slate-muted">
              מלאו את הטופס — הדוח למייל אחרי הכנה מקצועית. הצעת תיקון רק אחרי הממצאים.
            </p>
          </div>
          <a
            href="#lead-form"
            className="btn-primary inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-navy px-6 py-3 text-[14px] font-semibold text-white hover:bg-navy-soft"
          >
            התחילו בדוח
          </a>
        </div>
      </div>
    </section>
  )
}
