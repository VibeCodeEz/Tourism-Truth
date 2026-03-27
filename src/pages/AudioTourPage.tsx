import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Headphones, History, Sparkles } from 'lucide-react'
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

function buildAudioOpening(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `Welcome to ${place.name} in ${destination.name}. This stop is best understood slowly, because ${place.shortDescription
    .charAt(0)
    .toLowerCase()}${place.shortDescription.slice(1)}`
}

function buildAudioScene(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `${place.funFact} As you move through ${destination.name}, ${place.name} stands out because ${place.detail
    .charAt(0)
    .toLowerCase()}${place.detail.slice(1)}`
}

function buildAudioMeaning(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `${place.truth} Inside the wider story of ${destination.name}, this matters because visitors are not only seeing a landmark. They are stepping into a place that still shapes memory, identity, and how the district is explained today.`
}

function buildAudioClosing(place: NonNullable<ReturnType<typeof getPlaceById>>, destination: NonNullable<ReturnType<typeof getDestinationByKey>>) {
  return `Before you leave ${place.name}, carry one idea with you: places like this give ${destination.name} its texture because they turn history into something you can still feel in the present.`
}

export function AudioTourPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { recordGameSession } = useAuth()
  const { state, completeRound } = useGameFlow()

  const destination = state.destinationKey ? getDestinationByKey(state.destinationKey) : null
  const place = getPlaceById(state.placeId)

  if (!destination || !place || !state.mode) {
    return <Navigate to="/app/play" replace />
  }

  if (state.mode === 'truth') {
    return <Navigate to="/app/play/fact" replace />
  }

  if (state.mode === 'dare') {
    return <Navigate to="/app/play/shuffle" replace />
  }

  const activeDestination = destination
  const activePlace = place
  const audioOpening = buildAudioOpening(activePlace, activeDestination)
  const audioScene = buildAudioScene(activePlace, activeDestination)
  const audioMeaning = buildAudioMeaning(activePlace, activeDestination)
  const audioClosing = buildAudioClosing(activePlace, activeDestination)
  const audioSummary = `Audio Tour: ${activePlace.name} in ${activeDestination.name}`

  async function handleAudioTourComplete() {
    try {
      completeRound({ title: 'Audio Tour', prompt: audioSummary })
      await recordGameSession({
        destination: activeDestination.name,
        placeName: activePlace.name,
        mode: 'audio-tour',
        revealedCard: audioSummary,
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
          badge="Step 5 - Audio tour"
          title={activePlace.name}
          description="A guided-stop version of the reveal, written like a polished walking tour segment."
        />

        <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
          <Card className="rounded-[36px] p-6 sm:p-7">
            <Badge>{activeDestination.name}</Badge>
            <h1 className="mt-4 font-display text-5xl text-cocoa sm:text-6xl">{activePlace.name}</h1>
            <p className="mt-4 text-sm leading-7 text-cocoa/80">{activePlace.shortDescription}</p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[28px] border border-white/24 bg-white/16 p-5">
                <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-cocoa">
                  <Headphones className="size-4" />
                  Opening cue
                </div>
                <p className="mt-3 text-base leading-8 text-cocoa">{audioOpening}</p>
              </div>
              <div className="rounded-[28px] border border-white/24 bg-white/16 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa/68">What you are noticing</p>
                <p className="mt-3 text-sm leading-7 text-cocoa/82">{audioScene}</p>
              </div>
              <div className="rounded-[28px] border border-white/24 bg-white/16 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cocoa/68">Why it matters</p>
                <p className="mt-3 text-sm leading-7 text-cocoa/82">{audioMeaning}</p>
              </div>
            </div>
          </Card>

          <Card className="section-orb relative overflow-hidden rounded-[38px] p-6 sm:p-7">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-white/0 via-white/72 to-white/0" />
            <Badge>Guide script</Badge>

            <div className="mt-5 flex items-start gap-3">
              <History className="mt-1 size-5 text-azure" />
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Tour pacing</p>
                  <h2 className="mt-3 font-display text-4xl text-cocoa sm:text-5xl">A guide-style reading of this place.</h2>
                </div>
                <div className="rounded-[30px] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(223,241,255,0.08))] p-5 shadow-[0_20px_52px_rgba(89,136,180,0.18)]">
                  <p className="font-display text-3xl leading-[1.1] text-cocoa sm:text-4xl">{audioSummary}</p>
                  <p className="mt-4 text-sm leading-7 text-cocoa/82">{audioClosing}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[28px] border border-white/24 bg-white/16 p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa">
                <Sparkles className="size-4" />
                Guided-stop feel
              </div>
              <p className="mt-3 text-sm leading-7 text-cocoa/82">
                This mode is designed to feel like a host is walking you through the site in sequence: first the setting, then
                the visual cue, then the cultural meaning, and finally the takeaway.
              </p>
            </div>

            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -4, 0], opacity: [0.72, 1, 0.72] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/12 px-4 py-2 text-sm text-cocoa/78"
            >
              Continue when you are ready
              <ArrowRight className="size-4" />
            </motion.div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => void handleAudioTourComplete()}>
                Finish audio tour
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
