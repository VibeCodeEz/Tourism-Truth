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
    <Card className="relative overflow-hidden rounded-[34px] p-0 shadow-[0_28px_80px_rgba(47,76,104,0.24)] sm:rounded-[40px]">
      <div className="overflow-hidden">
        <div className="relative aspect-[4/3.38] overflow-hidden sm:aspect-[4/4.6] lg:aspect-[5/6]">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeDestination.key}
              src={activeDestination.imagePath}
              alt={activeDestination.name}
              className="absolute inset-0 h-full w-full object-cover brightness-[0.88] saturate-[0.9]"
              style={{ objectPosition: imagePositions[activeDestination.key] ?? 'center center' }}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1.01 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.02 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: luxuryEase }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,54,77,0.18),rgba(38,62,88,0.12)_42%,rgba(29,49,72,0.56)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(223,241,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(35,56,78,0.16),transparent_32%)]" />
          <div className="absolute inset-0 soft-vignette opacity-84" />

          <div className="relative flex h-full flex-col justify-between p-4 sm:p-7 lg:p-8">
            <div className="flex items-start justify-between gap-3">
              <Badge
                className={cn(
                  activeDestination.premiumOnly
                    ? 'border-white/50 bg-white/24 text-cream'
                    : 'border-white/32 bg-white/16 text-cream',
                )}
              >
                {activeDestination.premiumOnly ? 'Premium route' : 'Free route'}
              </Badge>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="interactive-outline rounded-full border border-white/42 bg-[linear-gradient(180deg,rgba(37,60,84,0.5),rgba(68,98,128,0.32))] p-3 text-cream transition hover:border-white/56 hover:bg-[linear-gradient(180deg,rgba(41,66,91,0.58),rgba(74,104,134,0.38))]"
                  onClick={showPrevious}
                  aria-label="Show previous destination"
                >
                  <ChevronLeft className="size-4.5" />
                </button>
                <button
                  type="button"
                  className="interactive-outline rounded-full border border-white/42 bg-[linear-gradient(180deg,rgba(37,60,84,0.5),rgba(68,98,128,0.32))] p-3 text-cream transition hover:border-white/56 hover:bg-[linear-gradient(180deg,rgba(41,66,91,0.58),rgba(74,104,134,0.38))]"
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
                  className="max-w-[13.5rem] rounded-[22px] border border-white/40 bg-[linear-gradient(180deg,rgba(34,56,78,0.62),rgba(72,103,133,0.38))] px-3.5 py-2.5 shadow-[0_18px_42px_rgba(31,52,72,0.24)] backdrop-blur-xl sm:max-w-[16rem] sm:rounded-[26px] sm:px-4 sm:py-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-cream/90">
                    Route mood
                  </p>
                  <p className="mt-2 text-sm leading-6 text-cream">
                    {activeDestination.premiumOnly
                      ? 'An expanded passport stop with a more exclusive travel tone.'
                      : 'The signature first route for a cinematic city-day start.'}
                  </p>
                </motion.div>
              </AnimatePresence>
              <div className="rounded-full border border-white/34 bg-[linear-gradient(180deg,rgba(34,56,78,0.48),rgba(72,103,133,0.26))] px-3.5 py-2 text-xs font-medium text-cream backdrop-blur-md">
                Swipe the route mood
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(219,232,243,0.08))] p-4 sm:space-y-6 sm:p-7 lg:p-8">
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
                  <MapPinned className="size-4 text-cream" />
                  <span>{activeDestination.location}</span>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cream/78">Featured route</p>
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
              <Badge className="border-white/50 bg-white/24 text-cream lg:mt-1">
                <Crown className="mr-2 size-3.5" />
                Premium
              </Badge>
            ) : null}
          </div>

          <div className="glass-panel-strong rounded-[26px] p-4 shadow-[0_22px_56px_rgba(47,76,104,0.18)] sm:rounded-[30px] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-cream sm:text-base">{activeDestination.highlight}</p>
                <p className="mt-2 text-sm leading-7 text-cream/76 sm:text-base">
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
                  className="rounded-[22px] border border-white/30 bg-white/18 px-3.5 py-2.5 text-right sm:rounded-[24px] sm:px-4 sm:py-3"
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-cream/76">Route index</p>
                  <p className="mt-1 font-display text-3xl text-cream">{progressLabel}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/22">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(190,228,255,0.92),rgba(220,223,253,0.88))]"
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
                    index === activeIndex ? 'bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(190,228,255,0.92),rgba(220,223,253,0.88))]' : 'bg-white/22 hover:bg-white/34',
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
                      ? 'border-white/54 bg-white/26 text-cream'
                      : 'border-white/24 bg-white/12 text-cream/78 hover:bg-white/18 hover:text-cream',
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
