import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, History, Sparkles } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { getDestinationByKey, getPlaceById } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'

function buildFunFactContext(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `${place.funFact} Beyond the quick reveal, ${place.name} stands out in ${destination.name} because ${place.detail
    .charAt(0)
    .toLowerCase()}${place.detail.slice(1)}`
}

function buildTruthContext(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `${place.truth} In the wider context of ${destination.name}, this matters because ${place.shortDescription
    .charAt(0)
    .toLowerCase()}${place.shortDescription.slice(1)}`
}

function buildCulturalRelevance(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `${place.name} carries weight inside ${destination.name} because visitors are not just looking at a landmark. They are stepping into a place that still shapes how the district is remembered, photographed, and explained today.`
}

export function FunFactPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { recordGameSession } = useAuth()
  const { state, completeRound } = useGameFlow()

  const destination = state.destinationKey ? getDestinationByKey(state.destinationKey) : null
  const place = getPlaceById(state.placeId)

  if (!destination || !place || !state.mode) {
    return <Navigate to="/app/play" replace />
  }

  if (state.mode === 'dare') {
    return <Navigate to="/app/play/shuffle" replace />
  }

  const activeDestination = destination
  const activePlace = place
  const expandedFunFact = buildFunFactContext(activePlace, activeDestination)
  const expandedTruth = buildTruthContext(activePlace, activeDestination)
  const culturalRelevance = buildCulturalRelevance(activePlace, activeDestination)

  async function handleTruthComplete() {
    try {
      completeRound({ title: 'Truth', prompt: activePlace.truth })
      await recordGameSession({
        destination: activeDestination.name,
        placeName: activePlace.name,
        mode: 'truth',
        revealedCard: activePlace.truth,
      })
      navigate('/app/play/completion', { state: { sessionSaved: true } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save game session')
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="Step 5 - Truth reveal"
          title={activePlace.name}
          description="A place-based story sequence before you close the round."
        />

        <div className="grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
          <Card className="rounded-[36px] p-6 sm:p-7">
            <Badge>{destination.name}</Badge>
            <h1 className="mt-4 font-display text-5xl text-cream sm:text-6xl">{activePlace.name}</h1>
            <p className="mt-4 text-sm leading-7 text-cream/68">{activePlace.shortDescription}</p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/45">Short fact</p>
                <p className="mt-3 text-base leading-8 text-cream">{activePlace.funFact}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/45">Expanded context</p>
                <p className="mt-3 text-sm leading-7 text-cream/82">{expandedFunFact}</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cream/45">Cultural relevance</p>
                <p className="mt-3 text-sm leading-7 text-cream/82">{culturalRelevance}</p>
              </div>
            </div>
          </Card>

          <Card className="section-orb relative overflow-hidden rounded-[38px] p-6 sm:p-7">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-white/0 via-gold/50 to-white/0" />
            <Badge>Truth panel</Badge>
            <div className="mt-5 flex items-start gap-3">
              <History className="mt-1 size-5 text-azure" />
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cream/42">Editorial reveal</p>
                  <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">A historical lens on this place.</h2>
                </div>
                <div className="rounded-[30px] border border-gold/16 bg-[linear-gradient(180deg,rgba(229,195,154,0.08),rgba(255,248,245,0.04))] p-5 shadow-[0_20px_52px_rgba(20,12,18,0.18)]">
                  <p className="font-display text-3xl leading-[1.1] text-cream sm:text-4xl">{activePlace.truth}</p>
                  <p className="mt-4 text-sm leading-7 text-cream/82">{expandedTruth}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/5 p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blush">
                <Sparkles className="size-4" />
                Reading the context
              </div>
              <p className="mt-3 text-sm leading-7 text-cream/82">
                This truth is meant to give the place more weight than a quick visual stop. It connects the site to the wider
                story, mood, and identity of {activeDestination.name}.
              </p>
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.72, 1, 0.72] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-cream/72"
            >
              Continue when you are ready
              <ArrowRight className="size-4" />
            </motion.div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => void handleTruthComplete()}>
                Finish truth round
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/app/play')}>
                Change mode
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
