export function AuroraBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 soft-vignette" />
      <div className="absolute left-[-12%] top-[6%] h-56 w-56 animate-drift-slow rounded-full bg-blush/14 blur-3xl md:h-[26rem] md:w-[26rem]" />
      <div className="absolute right-[-10%] top-[4%] h-64 w-64 animate-drift-wide rounded-full bg-gold/14 blur-3xl md:h-[30rem] md:w-[30rem]" />
      <div className="absolute bottom-[-10%] left-[16%] h-52 w-52 animate-drift rounded-full bg-azure/12 blur-3xl md:h-[22rem] md:w-[22rem]" />
      <div className="absolute bottom-[14%] right-[14%] h-36 w-36 animate-drift-slow rounded-full bg-white/6 blur-3xl md:h-52 md:w-52" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,249,246,0.08),transparent_34%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(255,249,246,0.03),transparent)]" />
    </div>
  )
}
