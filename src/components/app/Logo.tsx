import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <div className="flex size-14 items-center justify-center overflow-hidden rounded-[22px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(223,241,255,0.98),rgba(190,228,255,0.98))] shadow-soft sm:size-16">
        <img src="/asset/logo/logo.png" alt="Tourism Truth logo" className="h-full w-full scale-125 object-contain p-0.5 sm:scale-[1.35]" />
      </div>
      <div className="space-y-0.5">
        <p className="font-display text-2xl font-semibold leading-none text-cream">Tourism Truth</p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-cream/58">Refined travel lounge</p>
      </div>
    </Link>
  )
}
