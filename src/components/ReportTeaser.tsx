const scores = [
  { label: 'SEO / גוגל', value: 4.2, color: 'bg-teal' },
  { label: 'UX / המרה', value: 5.1, color: 'bg-amber-400' },
  { label: 'מהירות', value: 3.8, color: 'bg-rose-400' },
  { label: 'אמון / בהירות', value: 5.5, color: 'bg-orange-400' },
]


export function ReportTeaser() {
  return (
    <section id="report" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-label text-teal">תצוגת הדוח</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            כך נראה דוח הבדיקה — בלי לתת לכם לתקן לבד
          </h2>
          <p className="mt-4 text-[15px] text-slate-muted">
            ציונים לדוגמה, פער מול מתחרים, ומה נראה בדוח. הפתרונות והיישום — אחרי הדוח, איתנו.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-[0_28px_70px_-24px_rgba(11,31,58,0.28)]">
          <div className="relative bg-navy px-5 py-6 text-white sm:px-7 sm:py-7">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(13,148,136,0.25),transparent_55%)]" aria-hidden />
            <div className="relative flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium text-teal-light/70">דוח בדיקת אתר · Press AI · דוגמה</p>
                <h3 className="mt-1 text-lg font-bold sm:text-xl">סיכום ממצאים לדוגמה</h3>
                <p className="mt-1 font-mono text-[12px] text-teal-light/80" dir="ltr">
                  https://example-business.co.il
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
                <div className="text-3xl font-extrabold text-gold-soft">4.7</div>
                <div className="text-[10px] text-white/55">ציון כללי / 10</div>
              </div>
            </div>
            <p className="relative mt-4 max-w-xl text-[13px] leading-relaxed text-white/65">
              האתר פעיל — אבל בדוגמה הזו הפער מול מתחרים בנראות ובהמרה משאיר פניות על השולחן.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 border-b border-navy/5 bg-cream/50 p-4 sm:grid-cols-4 sm:p-5">
            {scores.map((s) => (
              <div key={s.label} className="min-w-0 rounded-xl border border-navy/6 bg-white p-2.5 text-center shadow-sm sm:p-3">
                <div className="text-xl font-extrabold text-navy">{s.value.toFixed(1)}</div>
                <div className="mt-0.5 text-[10px] font-medium leading-snug text-slate-muted sm:text-[11px]">{s.label}</div>
                <div className="score-track mt-2 h-1.5 overflow-hidden rounded-full bg-navy/5">
                  <div className={`score-bar h-full max-w-full rounded-full ${s.color}`} style={{ width: `${s.value * 10}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="min-w-0 border-b border-navy/5 p-4 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h4 className="text-[14px] font-bold text-navy">פער נראות מול מתחרים (דוגמה)</h4>
              <span className="rounded-full bg-navy/5 px-2.5 py-0.5 text-[10px] font-semibold text-slate-muted">
                נתונים לדוגמה · לא האתר שלכם
              </span>
            </div>
            <p className="mt-1 text-[12px] text-slate-muted">מדד יחסי 0–100 לפי סיגנלי נראות/המרה בדוח הבדיקה.</p>
            <div className="mt-5 min-w-0 space-y-3">
              {[
                { label: 'האתר שלכם', pct: 42, tone: 'bg-rose-400' },
                { label: 'מתחרה א׳', pct: 78, tone: 'bg-teal' },
                { label: 'מתחרה ב׳', pct: 71, tone: 'bg-teal/70' },
                { label: 'מתחרה ג׳', pct: 65, tone: 'bg-teal/50' },
              ].map((row) => (
                <div key={row.label} className="min-w-0">
                  <div className="mb-1 flex justify-between gap-2 text-[12px]">
                    <span className="min-w-0 font-medium text-navy">{row.label}</span>
                    <span className="shrink-0 font-bold tabular-nums text-navy">{row.pct}</span>
                  </div>
                  <div className="gap-track h-3 overflow-hidden rounded-full bg-navy/5">
                    <div className={`h-full max-w-full rounded-full ${row.tone}`} style={{ width: `${row.pct}%` }} />
                  </div>
                </div>
              ))}
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
                <li>• חיכוך במובייל</li>
                <li>• סיגנלי SEO חלשים</li>
                <li>• CTA לא חד</li>
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
              <div key={x.t} className="rounded-xl border border-navy/6 bg-white px-3 py-3 text-center shadow-sm">
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
