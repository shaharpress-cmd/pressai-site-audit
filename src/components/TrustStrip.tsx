const badges = [
  { label: 'אבטחת מידע', sub: 'העברת פרטים מאובטחת' },
  { label: 'פרטיות', sub: 'לא נמכור את המידע' },
  { label: 'שקיפות', sub: 'ללא הבטחת דירוג' },
  { label: 'ללא התחייבות', sub: 'אבחון לפני הצעה' },
]

const placeholders = [
  'משרד עו״ד',
  'קליניקה',
  'סוכנות נדל״ן',
  'חברת שירותים',
  'מרפאה',
]

export function TrustStrip() {
  return (
    <section aria-label="סימני אמון" className="border-y border-navy/6 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-muted/80">
          סימני אמון · לדוגמה
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center rounded-xl border border-navy/6 bg-cream/60 px-3 py-3.5 text-center"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal/10 text-[13px] font-bold text-teal" aria-hidden>
                ✓
              </span>
              <span className="mt-2 text-[13px] font-bold text-navy">{b.label}</span>
              <span className="mt-0.5 text-[11px] text-slate-muted">{b.sub}</span>
            </div>
          ))}
        </div>

        <div className="trust-marquee mt-8 overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5">
            {placeholders.map((name) => (
              <span
                key={name}
                className="inline-flex items-center gap-2 rounded-full border border-dashed border-navy/15 bg-cream/40 px-4 py-2 text-[12px] font-medium text-slate-muted"
              >
                <span className="h-5 w-5 rounded-md bg-navy/8" aria-hidden />
                {name}
                <span className="text-[10px] text-slate-muted/60">לדוגמה</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
