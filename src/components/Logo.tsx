type Props = { className?: string; compact?: boolean; dark?: boolean }

export function Logo({ className = '', compact = false, dark = false }: Props) {
  return (
    <a href="#top" className={`inline-flex items-center gap-2.5 group ${className}`} aria-label="Press AI — דף הבית">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-bold tracking-wide shadow-sm transition ${
          dark
            ? 'bg-white/10 text-teal-light group-hover:bg-white/15'
            : 'bg-navy text-teal-light group-hover:bg-navy-soft'
        }`}
      >
        PA
      </span>
      {!compact && (
        <span className="flex flex-col leading-tight">
          <span className={`text-[15px] font-bold tracking-tight ${dark ? 'text-white' : 'text-navy'}`}>
            Press AI
          </span>
          <span className={`text-[10px] font-medium hidden sm:block ${dark ? 'text-white/45' : 'text-slate-muted'}`}>
            pressai.co.il
          </span>
        </span>
      )}
    </a>
  )
}
