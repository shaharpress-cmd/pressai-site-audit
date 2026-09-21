import { Reveal } from './Reveal'

const pains = [
  {
    title: 'לא יודעים איפה האתר עומד',
    body: 'יש אתר, יש פרסום — אבל בלי תמונה ברורה של SEO ו־UX אי אפשר לדעת למה הפניות לא מגיעות.',
    icon: '◎',
  },
  {
    title: 'מפסידים לקוחות בלי לראות',
    body: 'חיכוך במובייל, מסר מבלבל או טעינה איטית — והמבקר עוזב לפני שמשאיר פרטים.',
    icon: '⏱',
  },
  {
    title: 'המתחרים עוקפים בגוגל',
    body: 'כשמישהו מחפש את השירות — הם מופיעים קודם. האתר שלכם נשאר מאחור בלי אבחון מדויק.',
    icon: '⌕',
  },
  {
    title: 'מתקנים בלי סדר עדיפויות',
    body: 'שינויי עיצוב או «קידום» בלי דוח — מבזבזים כסף על הדבר הלא נכון.',
    icon: '◇',
  },
]

export function Pain() {
  return (
    <section id="pain" className="scroll-mt-20 overflow-x-clip bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-gold">למה דוח בדיקה</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            השירות חזק — האתר מפספס כסף
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-muted sm:text-base">
            הדוח מראה בדיוק איפה האתר שלכם נמצא, מה אתם מפסידים, ואיך המתחרים עוקפים —
            ב־SEO ובחוויית משתמש — לפני שמתחילים לתקן.
          </p>
        </div>

        <Reveal className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_20px_50px_-24px_rgba(11,31,58,0.25)]">
          <figure className="m-0">
            <img
              src={`${import.meta.env.BASE_URL}customers-flee.png`}
              alt="איור: לקוחות בורחים מהאתר שלכם אל המתחרה — כסף ופניות נשארים על השולחן"
              className="block h-auto w-full"
              loading="lazy"
              decoding="async"
            />
            <figcaption className="border-t border-navy/6 bg-gradient-to-l from-rose-50/90 to-cream px-4 py-4 text-center sm:px-6 sm:py-5">
              <p className="text-[15px] font-bold text-navy sm:text-base">
                הלקוחות לא «נעלמים» — הם עוברים למתחרה
              </p>
              <p className="mx-auto mt-1.5 max-w-2xl text-[13px] leading-relaxed text-slate-muted sm:text-[14px]">
                אתר איטי, מבלבל או חלש בגוגל משאיר כסף על השולחן. דוח הבדיקה מראה איפה זה קורה —
                לפני שממשיכים לאבד פניות.
              </p>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p) => (
            <Reveal
              as="article"
              key={p.title}
              className="card-lift rounded-2xl border border-navy/6 bg-white p-5 shadow-sm sm:p-6"
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-teal/15 to-gold/10 text-lg text-teal"
                aria-hidden
              >
                {p.icon}
              </div>
              <h3 className="mt-4 text-[16px] font-bold text-navy">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-muted">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
