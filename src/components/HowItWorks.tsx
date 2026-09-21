import { Reveal } from './Reveal'
const steps = [
  {
    n: '01',
    title: 'שולחים את כתובת האתר',
    body: 'מדביקים URL וממלאים פרטי קשר. זה הצעד לדוח הבדיקה.',
  },
  {
    n: '02',
    title: 'דוח בדיקה',
    body: 'מצב האתר, מה מפסידים, ואיך המתחרים עוקפים — ב־SEO ו־UX.',
  },
  {
    n: '03',
    title: 'דוח עומק (לפי צורך)',
    body: 'מעמיקים בממצאים ומסמנים מה לתקן קודם — בלי ניחושים.',
  },
  {
    n: '04',
    title: 'תיקון + אופציה חודשית',
    body: 'SEO, UX או ביחד. ואפשר להמשיך בקידום SEO חודשי אחרי התיקונים.',
  },
]

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
            <Reveal as="li"
              key={s.n}
              className="card-lift relative rounded-2xl border border-navy/6 bg-white p-5 shadow-sm sm:p-6"
            >
              <span className="text-[28px] font-extrabold tracking-tight text-teal/20">{s.n}</span>
              <h3 className="mt-2 text-[15px] font-bold text-navy">{s.title}</h3>
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
