import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-3">
      <div className="flex size-14 items-center justify-center overflow-hidden rounded-[22px] border border-white/20 bg-[linear-gradient(135deg,rgba(245,221,228,0.96),rgba(229,195,154,0.96),rgba(253,241,235,0.96))] shadow-soft sm:size-16">
        <img src="/asset/logo/logo.png" alt="Tourism Truth logo" className="h-full w-full scale-125 object-contain p-0.5 sm:scale-[1.35]" />
      </div>
      <div className="space-y-0.5">
        <p className="font-display text-2xl font-semibold leading-none text-cream">Tourism Truth</p>
        <p className="text-[11px] uppercase tracking-[0.24em] text-cream/45">Editorial travel play</p>
      </div>
    </Link>
  )
}
