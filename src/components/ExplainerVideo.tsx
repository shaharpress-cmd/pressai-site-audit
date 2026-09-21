import { useEffect, useRef, useState } from 'react'

const SKIP_STORAGE_KEY = 'pressai-explainer-video-skipped'
const VIDEO_SRC = `${import.meta.env.BASE_URL}explainer/why-audit.mp4`
const POSTER_SRC = `${import.meta.env.BASE_URL}explainer/poster.png`

function readSkipPreference() {
  try {
    return sessionStorage.getItem(SKIP_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

function getReducedMotionPreference() {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('a11y-reduce-motion')
  )
}

export function ExplainerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVisible, setIsVisible] = useState(() => !readSkipPreference())
  const [isPlaying, setIsPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(getReducedMotionPreference)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotionPreference = () => setReducedMotion(getReducedMotionPreference())
    const observer = new MutationObserver(updateMotionPreference)

    mediaQuery.addEventListener('change', updateMotionPreference)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    updateMotionPreference()

    return () => {
      mediaQuery.removeEventListener('change', updateMotionPreference)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause()
      setIsPlaying(false)
    }
  }, [reducedMotion])

  if (!isVisible) return null

  function skipExplainer() {
    try {
      sessionStorage.setItem(SKIP_STORAGE_KEY, 'true')
    } catch {
      /* Ignore unavailable session storage. */
    }
    setIsVisible(false)
  }

  async function startPlayback() {
    const video = videoRef.current
    if (!video) return

    try {
      await video.play()
    } catch {
      // Native controls remain available if playback needs another user gesture.
    }
  }

  return (
    <section
      className="mx-auto mb-10 w-full max-w-3xl text-center sm:mb-12"
      aria-labelledby="explainer-heading"
      dir="rtl"
    >
      <h2 id="explainer-heading" className="sr-only">
        למה דוח הבדיקה חשוב
      </h2>

      <div className="overflow-hidden rounded-3xl border border-navy/10 bg-navy shadow-[0_24px_60px_-24px_rgba(11,31,58,0.42)]">
        <div className="relative aspect-video w-full">
          {reducedMotion ? (
            <img
              src={POSTER_SRC}
              alt="תצוגה מקדימה של סרטון ההסבר על דוח בדיקת האתר"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <>
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                playsInline
                controls
                preload="metadata"
                aria-label="סרטון הסבר בעברית: למה דוח בדיקת האתר חשוב"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />
              {!isPlaying && (
                <button
                  type="button"
                  className="btn-press absolute inset-1/2 z-10 inline-flex min-h-14 min-w-[min(90%,22rem)] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-center text-[15px] font-bold text-navy shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] hover:bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal"
                  onClick={startPlayback}
                  aria-label="הפעלת סרטון: למה דוח הבדיקה חשוב"
                >
                  <span aria-hidden>▶</span>
                  <span>צפו: למה הדוח חשוב · כ־18 שנ׳</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-slate-muted sm:text-sm">
        דוח בדיקה טוב מראה איפה האתר מאבד חשיפה, אמון ולקוחות — ומה כדאי לתקן קודם כדי להפוך יותר ביקורים לפניות.
      </p>

      <button
        type="button"
        className="mt-2 min-h-11 rounded-lg px-3 text-[13px] font-semibold text-teal underline underline-offset-4 hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
        onClick={skipExplainer}
      >
        דלגו
      </button>
    </section>
  )
}
