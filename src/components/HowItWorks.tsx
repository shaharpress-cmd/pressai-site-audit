import { Reveal } from './Reveal'

const steps = [
  {
    n: '01',
    title: 'שולחים את כתובת האתר',
    body: 'מדביקים URL וממלאים פרטי קשר. זה הצעד לדוח הבדיקה.',
    icon: 'link',
  },
  {
    n: '02',
    title: 'דוח בדיקה',
    body: 'מצב האתר, מה מפסידים, ואיך המתחרים עוקפים — ב־SEO ו־UX.',
    icon: 'report',
  },
  {
    n: '03',
    title: 'דוח עומק (לפי צורך)',
    body: 'מעמיקים בממצאים ומסמנים מה לתקן קודם — בלי ניחושים.',
    icon: 'depth',
  },
  {
    n: '04',
    title: 'תיקון + אופציה חודשית',
    body: 'SEO, UX או ביחד. ואפשר להמשיך בקידום SEO חודשי אחרי התיקונים.',
    icon: 'fix',
  },
] as const

function StepIcon({ name }: { name: (typeof steps)[number]['icon'] }) {
  const common = {
    className: 'how-step-icon h-5 w-5',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
  }
  switch (name) {
    case 'link':
      return (
        <svg {...common}>
          <path d="M10 13a5 5 0 0 0 7.54.54l1.92-1.92a5 5 0 0 0-7.07-7.07L10.8 6.1" />
          <path d="M14 11a5 5 0 0 0-7.54-.54L4.54 12.38a5 5 0 0 0 7.07 7.07L13.2 17.9" />
        </svg>
      )
    case 'report':
      return (
        <svg {...common}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      )
    case 'depth':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
          <path d="M8 11h6M11 8v6" />
        </svg>
      )
    case 'fix':
      return (
        <svg {...common}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      )
  }
}

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-20 bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-gold">המשפך</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            מדוח בדיקה — עד אתר שממיר יותר
          </h2>
          <p className="mt-4 text-[15px] text-slate-muted">
            ארבעה שלבים ברורים. מתחילים תמיד בדוח — לא בקניית חבילה בעיוור.
          </p>
        </div>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal
              as="li"
              key={s.n}
              delay={i * 90}
              className="card-lift how-step relative rounded-2xl border border-navy/6 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className="how-step-badge flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal"
                  aria-hidden
                >
                  <StepIcon name={s.icon} />
                </span>
                <span className="text-[22px] font-extrabold tracking-tight text-teal/25">{s.n}</span>
              </div>
              <h3 className="mt-3.5 text-[15px] font-bold text-navy">{s.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-muted">{s.body}</p>
              {i < steps.length - 1 && (
                <span
                  className="absolute -start-2.5 top-1/2 hidden h-px w-5 -translate-y-1/2 bg-gradient-to-l from-gold/50 to-transparent lg:block"
                  aria-hidden
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
