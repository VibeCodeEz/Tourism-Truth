import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2, MapPinned, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { getDestinationByKey, getPlacesByDestination } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'
import { getIcon } from '@/lib/icons'
import { fadeUpItem, luxuryEase, staggerContainer } from '@/lib/motion'
import type { DestinationKey } from '@/types/models'

export function IntramurosPlacesPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { destinationKey } = useParams<{ destinationKey: DestinationKey }>()
  const { profile } = useAuth()
  const { state, setPlace, setDestination } = useGameFlow()

  const resolvedDestinationKey = destinationKey
  const destination = resolvedDestinationKey ? getDestinationByKey(resolvedDestinationKey) : null
  const places = resolvedDestinationKey ? getPlacesByDestination(resolvedDestinationKey) : []
  const [selectedPlaceId, setSelectedPlaceId] = useState(state.placeId)
  const [transitioning, setTransitioning] = useState(false)

  if (!resolvedDestinationKey || !destination) {
    return <Navigate to="/app/destinations" replace />
  }

  const activeDestinationKey = resolvedDestinationKey

  if (destination.premiumOnly && !profile?.isPremium) {
    return <Navigate to="/app/destinations" replace />
  }

  async function handleContinue() {
    if (!selectedPlaceId) {
      return
    }

    setTransitioning(true)
    setDestination(activeDestinationKey)
    setPlace(selectedPlaceId)
    await new Promise((resolve) => window.setTimeout(resolve, 500))
    navigate('/app/play')
  }

  const selectedPlace = places.find((place) => place.id === selectedPlaceId) ?? null

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge={`${destination.name} place selection`}
          title={`Pick one place inside ${destination.name}.`}
          description="Choose the exact spot that will shape your truth or dare round. Once selected, the next screens become fully place-aware."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          role="radiogroup"
          aria-label={`${destination.name} places`}
          className="grid gap-4 lg:grid-cols-2"
        >
          {places.map((place, index) => {
            const Icon = getIcon(place.iconKey)
            const isSelected = selectedPlaceId === place.id
            return (
              <motion.button
                key={place.id}
                variants={fadeUpItem}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-describedby={`${place.id}-place-context`}
                className="interactive-outline text-left"
                onClick={() => setSelectedPlaceId(place.id)}
              >
                <Card
                  className={`card-shell hover-lift relative overflow-hidden rounded-[36px] bg-gradient-to-br ${place.accent} p-6 sm:p-7 ${
                    isSelected ? 'border-blush/42 shadow-[0_28px_70px_rgba(215,160,178,0.18)]' : ''
                  }`}
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/0 via-white/24 to-white/0" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={isSelected ? 'border-blush/30 bg-blush/12 text-mist' : 'border-white/10 bg-white/6 text-cream/62'}>
                          {isSelected ? 'Selected' : destination.name}
                        </Badge>
                        <Badge className="border-white/10 bg-white/6 text-cream/52">Place {String(index + 1).padStart(2, '0')}</Badge>
                      </div>
                      <div>
                        <h2 className="font-display text-3xl text-cream sm:text-4xl">{place.name}</h2>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-cream/68">{place.shortDescription}</p>
                      </div>
                    </div>
                    <div className={`rounded-[24px] border p-3 text-blush ${
                      isSelected ? 'border-blush/24 bg-blush/10' : 'border-white/12 bg-white/10'
                    }`}>
                      <Icon className="size-5 text-blush" />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-3">
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/40">Type</p>
                      <p className="mt-2 text-sm font-semibold text-cream/76">Heritage stop</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/40">Round access</p>
                      <p className="mt-2 text-sm font-semibold text-cream/76">Truth + Dare</p>
                    </div>
                    <div className="rounded-[22px] border border-white/10 bg-white/6 px-4 py-3">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/40">Included</p>
                      <p className="mt-2 text-sm font-semibold text-cream/76">Free in route</p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-[26px] border border-white/10 bg-white/6 p-4">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-blush">
                      <Sparkles className="size-4" />
                      Place context
                    </div>
                    <p id={`${place.id}-place-context`} className="mt-3 text-sm leading-7 text-cream/76">
                      {place.detail}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-4">
                    <div className="inline-flex items-center gap-2 text-sm text-cream/58">
                      <MapPinned className="size-4 text-blush" />
                      {destination.name}
                    </div>
                    <AnimatePresence>
                      {isSelected ? (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: luxuryEase }}
                          className="inline-flex items-center gap-2 rounded-full border border-blush/22 bg-blush/12 px-3 py-1.5 text-sm font-semibold text-mist"
                        >
                          <CheckCircle2 className="size-4" />
                          Ready
                        </motion.div>
                      ) : (
                        <p className="text-sm font-semibold text-cream/52">Tap to choose this place</p>
                      )}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.button>
            )
          })}
        </motion.div>

        <Card className="rounded-[36px] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cream/45">Selected place</p>
              <p className="mt-1 font-display text-3xl text-cream">{selectedPlace?.name ?? 'Choose one place'}</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedPlace?.id ?? 'empty-place'}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 0.32, ease: luxuryEase }}
                  className="mt-2 max-w-2xl text-sm leading-7 text-cream/62"
                >
                  {selectedPlace
                    ? `${selectedPlace.shortDescription} Continue when you want this exact place to drive the next truth or dare round.`
                    : 'Choose the one stop that should shape the next truth or dare reveal.'}
                </motion.p>
              </AnimatePresence>
            </div>
            <Button size="lg" loading={transitioning} disabled={!selectedPlaceId || transitioning} onClick={() => void handleContinue()}>
              {transitioning ? 'Opening Truth or Dare' : 'Continue to Truth or Dare'}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
