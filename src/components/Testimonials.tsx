const quotes = [
  {
    quote: 'קיבלנו דוח ברור — לא רשימת באגים, אלא מה באמת פוגע בפניות. אחר כך יישמו את מה שסוכם.',
    role: 'בעל משרד שירותים',
    note: 'דוגמת ניסוח',
  },
  {
    quote: 'סוף סוף מישהו שלא שלח אותנו לתקן לבד. האבחון וההצעה היו בשפה עסקית, לא טכנית מדי.',
    role: 'מנהלת קליניקה',
    note: 'דוגמת ניסוח',
  },
  {
    quote: 'קודם קיבלנו דוח ברור, ורק אחר כך הצעה מותאמת — בלי הבטחות דירוג ובלי לחץ.',
    role: 'יזם בתחום הנדל״ן',
    note: 'דוגמת ניסוח',
  },
]

export function Testimonials() {
  return (
    <section id="trust" className="bg-cream py-16 sm:py-20" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-gold">אמון</p>
          <h2 id="testimonials-heading" className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            מה אומרים לקוחות — כשיש ביקורות אמיתיות
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-slate-muted sm:text-[14px]">
            הכרטיסים למטה הם{' '}
            <strong className="font-semibold text-navy/80">דוגמאות ניסוח</strong>
            {' '}עד שיש ביקורות אמיתיות. ניתן להחליף בקלות.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.role}
              className="card-lift relative flex flex-col rounded-2xl border border-navy/6 bg-white p-5 shadow-sm sm:p-6"
            >
              <span className="absolute start-4 top-4 rounded-md bg-gold/15 px-2 py-0.5 text-[10px] font-bold text-navy/70">
                {q.note}
              </span>
              <blockquote className="mt-7 flex-1 text-[14px] leading-relaxed text-navy/85">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-5 border-t border-navy/6 pt-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-navy/8 text-[12px] font-bold text-navy/50"
                    aria-hidden
                  >
                    —
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-navy">{q.role}</div>
                    <div className="text-[11px] text-slate-muted">שם יוחלף בביקורת אמיתית</div>
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
