import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-navy/8 bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-white/55">
              סוכנות דיגיטלית לקידום עסקים ושיפור ביצועים באינטרנט.
            </p>
            <a
              href="#lead-form"
              className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-teal px-4 py-2.5 text-[13px] font-semibold text-white transition hover:bg-teal-bright"
            >
              קבלו דוח אבחון
            </a>
          </div>
          <div className="flex flex-col gap-2.5 text-[13px] text-white/70 sm:items-end">
            <a
              href="https://pressai.co.il"
              className="transition hover:text-teal-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              pressai.co.il
            </a>
            <a href="https://wa.me/972538401100" className="transition hover:text-teal-light" dir="ltr">
              053-8401100
            </a>
            <a href="mailto:hello@pressai.co.il" className="transition hover:text-teal-light">
              hello@pressai.co.il
            </a>
            <a
              href="https://pressai.co.il/legal/accessibility"
              className="transition hover:text-teal-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              הצהרת נגישות
            </a>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-[11px] leading-relaxed text-white/40">
            הבהרה: האבחון והחבילות אינם מבטיחים דירוג בגוגל, מספר לידים או תוצאה עסקית ספציפית.
            הצעת המחיר נקבעת רק אחרי האבחון ולפי היקף העבודה. הדוח אינו מדריך עשה־זאת־בעצמך.
          </p>
          <p className="mt-3 text-[11px] text-white/30">
            © {new Date().getFullYear()} Press AI · כל הזכויות שמורות
          </p>
        </div>
      </div>
    </footer>
  )
}
