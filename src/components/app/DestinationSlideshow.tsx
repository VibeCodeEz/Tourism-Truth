import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Crown, MapPinned } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { destinations } from '@/data/experienceData'
import { luxuryEase } from '@/lib/motion'
import { cn } from '@/lib/utils'

const imagePositions: Record<string, string> = {
  intramuros: 'center 58%',
  binondo: 'center 42%',
  ilocos: 'center 52%',
  boracay: 'center 62%',
}

export function DestinationSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % destinations.length)
    }, 4500)

    return () => window.clearInterval(intervalId)
  }, [reduceMotion])

  const activeDestination = destinations[activeIndex]
  const progressLabel = `${String(activeIndex + 1).padStart(2, '0')} / ${String(destinations.length).padStart(2, '0')}`

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + destinations.length) % destinations.length)
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % destinations.length)
  }

  return (
    <Card className="relative overflow-hidden rounded-[34px] p-0 sm:rounded-[40px]">
      <div className="overflow-hidden">
        <div className="relative aspect-[4/3.38] overflow-hidden sm:aspect-[4/4.6] lg:aspect-[5/6]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeDestination.key}
              src={activeDestination.imagePath}
              alt={activeDestination.name}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: imagePositions[activeDestination.key] ?? 'center center' }}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1.01 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: luxuryEase }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,18,0.14),rgba(18,12,18,0.08)_48%,rgba(18,12,18,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(215,160,178,0.14),transparent_30%)]" />
          <div className="absolute inset-0 soft-vignette opacity-70" />

          <div className="relative flex h-full flex-col justify-between p-4 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <Badge
                className={cn(
                  activeDestination.premiumOnly
                    ? 'border-gold/30 bg-ink/35 text-gold'
                    : 'border-white/14 bg-ink/30 text-cream',
                )}
              >
                {activeDestination.premiumOnly ? 'Premium route' : 'Free route'}
              </Badge>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="interactive-outline rounded-full border border-white/14 bg-ink/35 p-3 text-cream transition hover:bg-ink/50"
                  onClick={showPrevious}
                  aria-label="Show previous destination"
                >
                  <ChevronLeft className="size-4.5" />
                </button>
                <button
                  type="button"
                  className="interactive-outline rounded-full border border-white/14 bg-ink/35 p-3 text-cream transition hover:bg-ink/50"
                  onClick={showNext}
                  aria-label="Show next destination"
                >
                  <ChevronRight className="size-4.5" />
                </button>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`overlay-${activeDestination.key}`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14, filter: 'blur(8px)' }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.55, ease: luxuryEase }}
                  className="max-w-[13.5rem] rounded-[22px] border border-white/12 bg-ink/48 px-3.5 py-2.5 backdrop-blur-xl sm:max-w-[16rem] sm:rounded-[26px] sm:px-4 sm:py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cream/70">
                    Route mood
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream/94">
                    {activeDestination.premiumOnly
                      ? 'An expanded passport stop with a more exclusive travel tone.'
                      : 'The signature first route for a cinematic city-day start.'}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="rounded-full border border-white/12 bg-ink/44 px-3.5 py-2 text-xs font-medium text-cream/88 backdrop-blur-md">
                Swipe the route mood
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 sm:space-y-6 sm:p-7 lg:p-8">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),auto] lg:items-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={`caption-${activeDestination.key}`}
                initial={reduceMotion ? false : { opacity: 0, y: 16, filter: 'blur(10px)' }}
                animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: luxuryEase }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-sm text-cream/82 sm:text-base">
                  <MapPinned className="size-4 text-blush" />
                  <span>{activeDestination.location}</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cream/56">Featured route</p>
                  <h2 className="mt-2 font-display text-[2.5rem] text-cream sm:text-6xl lg:text-7xl">{activeDestination.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-cream/90 sm:text-lg sm:leading-8">
                    {activeDestination.tagline}
                  </p>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-cream/78 sm:text-base sm:leading-8">
                    {activeDestination.description}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {activeDestination.premiumOnly ? (
              <Badge className="border-gold/30 bg-gold/12 text-gold lg:mt-1">
                <Crown className="mr-2 size-3.5" />
                Premium
              </Badge>
            ) : null}
          </div>

          <div className="glass-panel-strong rounded-[26px] p-4 sm:rounded-[30px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cream sm:text-base">{activeDestination.highlight}</p>
                <p className="mt-2 text-sm leading-7 text-cream/68 sm:text-base">
                  {activeDestination.premiumOnly
                    ? 'Upgrade to open this route and move through the app without locked states.'
                    : 'Start here for free and move straight into the place-based experience.'}
                </p>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`progress-${activeDestination.key}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: luxuryEase }}
                  className="rounded-[22px] border border-white/14 bg-white/10 px-3.5 py-2.5 text-right sm:rounded-[24px] sm:px-4 sm:py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cream/58">Route index</p>
                  <p className="mt-1 font-display text-3xl text-cream">{progressLabel}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(245,221,228,0.95),rgba(229,195,154,0.9))]"
                animate={{ width: `${((activeIndex + 1) / destinations.length) * 100}%` }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.6, ease: luxuryEase }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {destinations.map((destination, index) => (
                <button
                  key={`${destination.key}-dot`}
                  type="button"
                  aria-label={`Jump to ${destination.name}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'interactive-outline h-2.5 rounded-full transition',
                    index === activeIndex ? 'bg-[linear-gradient(90deg,rgba(245,221,228,0.95),rgba(229,195,154,0.9))]' : 'bg-white/10 hover:bg-white/18',
                  )}
                />
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {destinations.map((destination, index) => (
                <button
                  key={destination.key}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${destination.name}`}
                  aria-pressed={activeIndex === index}
                  aria-current={activeIndex === index ? 'true' : undefined}
                  className={cn(
                    'interactive-outline rounded-full border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition',
                    activeIndex === index
                      ? 'border-blush/35 bg-blush/12 text-mist'
                      : 'border-white/10 bg-white/6 text-cream/64 hover:bg-white/10 hover:text-cream',
                  )}
                >
                  {destination.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
