export function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 soft-vignette" />
      <div className="absolute left-[-12%] top-[4%] h-56 w-56 animate-drift-slow rounded-full bg-azure/18 blur-3xl md:h-[28rem] md:w-[28rem]" />
      <div className="absolute right-[-10%] top-[2%] h-64 w-64 animate-drift-wide rounded-full bg-gold/18 blur-3xl md:h-[32rem] md:w-[32rem]" />
      <div className="absolute bottom-[-10%] left-[16%] h-52 w-52 animate-drift rounded-full bg-royal/14 blur-3xl md:h-[24rem] md:w-[24rem]" />
      <div className="absolute bottom-[14%] right-[14%] h-36 w-36 animate-drift-slow rounded-full bg-white/18 blur-3xl md:h-56 md:w-56" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent)]" />
    </div>
  )
}
