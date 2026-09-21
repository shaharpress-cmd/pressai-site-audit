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

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pains.map((p) => (
            <article
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
