import { useEffect, useMemo, useState, type FormEvent, type ChangeEvent } from 'react'
import { saveLead } from '../lib/leads'

type Props = {
  initialUrl?: string
}

type Errors = Partial<Record<'url' | 'phone' | 'email' | 'consent' | 'businessName' | 'contactName', string>>

function stripScheme(raw: string): string {
  return raw.trim().replace(/^https?:\/\//i, '')
}

function normalizeUrl(raw: string): string {
  const t = stripScheme(raw)
  if (!t) return ''
  return `https://${t}`
}

function isValidUrl(raw: string): boolean {
  try {
    const u = new URL(normalizeUrl(raw))
    return (u.protocol === 'http:' || u.protocol === 'https:') && u.hostname.includes('.')
  } catch {
    return false
  }
}

function isValidPhone(raw: string): boolean {
  const digits = raw.replace(/\D/g, '')
  return digits.length >= 9 && digits.length <= 12
}

function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim())
}

export function LeadForm({ initialUrl = '' }: Props) {
  const [url, setUrl] = useState(stripScheme(initialUrl))
  const [businessName, setBusinessName] = useState('')
  const [contactName, setContactName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<keyof Errors, boolean>>>({})
  const [errors, setErrors] = useState<Errors>({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (initialUrl) setUrl(stripScheme(initialUrl))
  }, [initialUrl])

  const progress = useMemo(() => {
    let filled = 0
    const total = 4 // url, phone, email, consent (required)
    if (url.trim() && isValidUrl(url)) filled++
    if (phone.trim() && isValidPhone(phone)) filled++
    if (email.trim() && isValidEmail(email)) filled++
    if (consent) filled++
    return Math.round((filled / total) * 100)
  }, [url, phone, email, consent])

  function fieldError(key: keyof Errors, value: string | boolean): string | undefined {
    if (key === 'url') {
      if (!String(value).trim() || !isValidUrl(String(value))) return 'נא להזין כתובת אתר תקינה (למשל yoursite.co.il)'
    }
    if (key === 'phone') {
      if (!String(value).trim() || !isValidPhone(String(value))) return 'נא להזין טלפון תקין (9–12 ספרות)'
    }
    if (key === 'email') {
      if (!String(value).trim() || !isValidEmail(String(value))) return 'נא להזין אימייל תקין'
    }
    if (key === 'consent' && !value) return 'יש לאשר יצירת קשר ושיווק במייל'
    return undefined
  }

  function validate(): Errors {
    const e: Errors = {}
    const urlErr = fieldError('url', url)
    const phoneErr = fieldError('phone', phone)
    const emailErr = fieldError('email', email)
    const consentErr = fieldError('consent', consent)
    if (urlErr) e.url = urlErr
    if (phoneErr) e.phone = phoneErr
    if (emailErr) e.email = emailErr
    if (consentErr) e.consent = consentErr
    return e
  }

  function blurField(key: keyof Errors, value: string | boolean) {
    setTouched((t) => ({ ...t, [key]: true }))
    const err = fieldError(key, value)
    setErrors((prev) => {
      const next = { ...prev }
      if (err) next[key] = err
      else delete next[key]
      return next
    })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const errs = validate()
    setErrors(errs)
    setTouched({ url: true, phone: true, email: true, consent: true })
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    try {
      saveLead({
        url: normalizeUrl(url),
        businessName: businessName.trim(),
        contactName: contactName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        consent: true,
      })
      setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  function fieldClass(hasError?: string) {
    return `min-h-12 w-full rounded-xl border bg-cream/90 px-4 py-3 text-[15px] text-navy placeholder:text-slate-muted/55 focus:outline-none focus:ring-2 focus:ring-teal/20 transition ${
      hasError ? 'border-rose-400 focus:border-rose-400' : 'border-navy/10 focus:border-teal'
    }`
  }

  if (success) {
    return (
      <section id="lead-form" className="py-16 sm:py-20" aria-live="polite">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="rounded-2xl border border-teal/25 bg-white p-8 text-center shadow-lg sm:p-10">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-2xl text-teal"
              aria-hidden
            >
              ✓
            </div>
            <h2 className="mt-5 text-2xl font-extrabold text-navy">הבקשה התקבלה</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-muted">
              תודה! הדוח יישלח למייל לאחר הכנה מקצועית.
              נחזור אליכם עם ממצאים והצעת יישום — לפי הצורך.
            </p>
            <a
              href="https://wa.me/972538401100"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-[14px] font-semibold text-white transition hover:brightness-105"
            >
              שאלה דחופה? WhatsApp · 053-8401100
            </a>
          </div>
        </div>
      </section>
    )
  }

  const show = (key: keyof Errors) => (touched[key] ? errors[key] : undefined)

  return (
    <section id="lead-form" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <div className="text-center">
          <p className="section-label text-teal">טופס אבחון</p>
          <h2 className="mt-3 text-2xl font-extrabold text-navy sm:text-3xl">
            קבלו דוח אבחון למייל — בלי DIY
          </h2>
          <p className="mt-3 text-[14px] text-slate-muted">
            כ־60 שניות. שדות עם * חובה. הדוח נשלח לאחר הכנה מקצועית.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-8 space-y-4 rounded-2xl border border-navy/8 bg-white p-5 shadow-[0_24px_56px_-24px_rgba(11,31,58,0.22)] sm:p-7"
        >
          {/* Progress */}
          <div className="mb-2" aria-hidden={progress === 0}>
            <div className="mb-1.5 flex items-center justify-between text-[11px] font-medium text-slate-muted">
              <span>התקדמות הטופס</span>
              <span className="tabular-nums text-teal">{progress}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-navy/6">
              <div className="progress-fill h-full rounded-full" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div>
            <label htmlFor="f-url" className="mb-1.5 block text-[13px] font-semibold text-navy">
              כתובת האתר *
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[12px] text-slate-muted/55"
                dir="ltr"
                aria-hidden
              >
                https://
              </span>
              <input
                id="f-url"
                type="text"
                dir="ltr"
                inputMode="url"
                autoComplete="url"
                placeholder="www.your-business.co.il"
                value={url}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(stripScheme(e.target.value))}
                onBlur={() => blurField('url', url)}
                className={`${fieldClass(show('url'))} !pl-[4.5rem] pr-4`}
                aria-invalid={!!show('url')}
                aria-describedby={show('url') ? 'err-url' : 'hint-url'}
              />
            </div>
            <p id="hint-url" className="mt-1 text-[11px] text-slate-muted">
              אפשר להדביק עם או בלי https:// — נוסיף אוטומטית
            </p>
            {show('url') && (
              <p id="err-url" className="mt-1 text-[12px] text-rose-600" role="alert">
                {show('url')}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-business" className="mb-1.5 block text-[13px] font-semibold text-navy">
                שם העסק
              </label>
              <input
                id="f-business"
                type="text"
                autoComplete="organization"
                placeholder="למשל: משרד כהן ושות׳"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className={fieldClass()}
              />
            </div>
            <div>
              <label htmlFor="f-contact" className="mb-1.5 block text-[13px] font-semibold text-navy">
                שם איש קשר
              </label>
              <input
                id="f-contact"
                type="text"
                autoComplete="name"
                placeholder="השם שלכם"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className={fieldClass()}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-phone" className="mb-1.5 block text-[13px] font-semibold text-navy">
                טלפון *
              </label>
              <input
                id="f-phone"
                type="tel"
                dir="ltr"
                inputMode="tel"
                autoComplete="tel"
                placeholder="05X-XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onBlur={() => blurField('phone', phone)}
                className={fieldClass(show('phone'))}
                aria-invalid={!!show('phone')}
                aria-describedby={show('phone') ? 'err-phone' : undefined}
              />
              {show('phone') && (
                <p id="err-phone" className="mt-1 text-[12px] text-rose-600" role="alert">
                  {show('phone')}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="f-email" className="mb-1.5 block text-[13px] font-semibold text-navy">
                אימייל *
              </label>
              <input
                id="f-email"
                type="email"
                dir="ltr"
                autoComplete="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => blurField('email', email)}
                className={fieldClass(show('email'))}
                aria-invalid={!!show('email')}
                aria-describedby={show('email') ? 'err-email' : undefined}
              />
              {show('email') && (
                <p id="err-email" className="mt-1 text-[12px] text-rose-600" role="alert">
                  {show('email')}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-navy/8 bg-cream/80 p-4">
            <label className="flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked)
                  blurField('consent', e.target.checked)
                }}
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-navy/20 text-teal focus:ring-teal"
                aria-invalid={!!show('consent')}
                aria-describedby={show('consent') ? 'err-consent' : 'consent-hint'}
              />
              <span className="text-[13px] leading-relaxed text-navy/90">
                אני מאשר/ת ל־Press AI ליצור איתי קשר (טלפון / WhatsApp / מייל) ולשלוח אליי
                דוח האבחון ומידע שיווקי הקשור לשירותי הסוכנות. ניתן לבטל בכל עת. *
              </span>
            </label>
            {show('consent') && (
              <p id="err-consent" className="mt-2 text-[12px] text-rose-600" role="alert">
                {show('consent')}
              </p>
            )}
            <p id="consent-hint" className="mt-2 text-[11px] leading-relaxed text-slate-muted">
              הפרטיות חשובה לנו. הפרטים ישמשו ליצירת קשר ולשליחת הדוח בלבד —
              לא נמכור ולא נעביר את המידע לצד שלישי למטרות שיווק שלהם.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary btn-teal flex min-h-12 w-full items-center justify-center rounded-xl bg-teal py-3.5 text-[15px] font-bold text-white hover:bg-teal-bright disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
          >
            {submitting ? 'שולח…' : 'שלחו בקשה לדוח אבחון'}
          </button>

          <p className="text-center text-[11px] text-slate-muted">
            או ב־WhatsApp:{' '}
            <a
              href="https://wa.me/972538401100"
              className="font-semibold text-teal hover:underline"
              dir="ltr"
            >
              053-8401100
            </a>
          </p>
        </form>
      </div>
    </section>
  )
}
