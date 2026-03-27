import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Compass, Crown, RotateCcw, Sparkles } from 'lucide-react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { getDestinationByKey, getPlaceById } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'
import { fadeUpItem, luxuryEase, staggerContainer } from '@/lib/motion'

export function CompletionPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const location = useLocation()
  const { profile } = useAuth()
  const { state, resetPlaceSelection, resetRound } = useGameFlow()
  const sessionSaved = (location.state as { sessionSaved?: boolean } | null)?.sessionSaved ?? false

  const destination = state.destinationKey ? getDestinationByKey(state.destinationKey) : null
  const place = getPlaceById(state.placeId)

  if (!destination || !place || !state.revealedPrompt || !state.mode) {
    return <Navigate to="/app" replace />
  }

  const activeDestination = destination
  const activePlace = place
  const isDare = state.mode === 'dare'
  const isAudioTour = state.mode === 'audio-tour'
  const modeLabel = isDare ? 'Dare' : isAudioTour ? 'Audio Tour' : 'Truth'
  const roundLabel = isDare ? 'Dare round' : isAudioTour ? 'Audio Tour round' : 'Truth round'
  const completionTitle = isDare ? 'Challenge locked in.' : isAudioTour ? 'Tour captured.' : 'Story captured.'
  const revealLabel = isDare ? state.revealedCardTitle : isAudioTour ? 'Audio Tour' : 'Truth reveal'

  function handlePlayAgain() {
    resetRound()
    navigate('/app/play')
  }

  function handleChooseAnotherPlace() {
    resetPlaceSelection()
    navigate(`/app/destinations/${activeDestination.key}`)
  }

  const nextActions = [
    {
      title: state.mode === 'truth' ? 'Try the dare path' : state.mode === 'audio-tour' ? 'Try another mode' : 'Try another reveal',
      copy:
        state.mode === 'truth'
          ? 'Stay in the same place and switch the mood by moving directly back into the choice screen.'
          : state.mode === 'audio-tour'
            ? 'Return to the mode screen and switch this place into a truth reveal or a dare sequence.'
            : 'Keep the same destination and run another truth or dare round immediately.',
      icon: RotateCcw,
      onClick: handlePlayAgain,
    },
    {
      title: 'Choose another place',
      copy: 'Stay inside the route but switch the exact location for a fresh result.',
      icon: ArrowRight,
      onClick: handleChooseAnotherPlace,
    },
  ]

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="Round complete"
          title="Your Tourism Truth round is complete."
          description={
            isDare
              ? 'The card is revealed, the moment is saved, and you can launch another round whenever you want.'
              : isAudioTour
                ? 'Your guided stop is stored, and the route is ready for another place or another mode.'
                : 'Your truth reveal is stored, and the route is ready for another place or another mode.'
          }
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-6 lg:grid-cols-[1.06fr,0.94fr]"
        >
          <motion.div variants={fadeUpItem}>
            <Card className="section-orb relative overflow-hidden rounded-[38px] p-6 md:p-8">
              <div className="absolute inset-0 panel-grid opacity-75" />
              <motion.div
                className="absolute inset-x-[18%] top-10 h-28 rounded-full bg-[radial-gradient(circle,rgba(190,228,255,0.28),transparent_72%)] blur-3xl"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: luxuryEase }}
              />
              <div className="relative">
                <div className="mb-6 flex flex-wrap items-center gap-3">
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 12, scale: 0.94 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { delay: 0.08, duration: 0.45, ease: luxuryEase }}
                    className="rounded-full border border-white/44 bg-white/24 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream"
                  >
                    Round complete
                  </motion.div>
                  <div className="rounded-full border border-white/24 bg-white/16 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cocoa/80">
                    {roundLabel}
                  </div>
                  {sessionSaved ? (
                    <div className="rounded-full border border-white/34 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(223,241,255,0.1))] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cocoa">
                      Session saved
                    </div>
                  ) : null}
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-cocoa/68">Latest reveal</p>
                    <h2 className="mt-3 font-display text-5xl text-cocoa sm:text-6xl">
                      {completionTitle}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-cocoa/80 sm:text-base sm:leading-8">
                      Your latest route moment is summarized below, ready for another round whenever you want it.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Destination</p>
                      <h3 className="mt-2 font-display text-3xl text-cocoa">{activeDestination.name}</h3>
                    </Card>
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Place</p>
                      <h3 className="mt-2 font-display text-3xl text-cocoa">{activePlace.name}</h3>
                    </Card>
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Mode</p>
                      <h3 className="mt-2 font-display text-3xl text-cocoa">{modeLabel}</h3>
                    </Card>
                  </div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { delay: 0.18, duration: 0.55, ease: luxuryEase }}
                    className="relative overflow-hidden rounded-[30px] border border-white/24 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(223,241,255,0.08))] p-6 shadow-[0_24px_64px_rgba(89,136,180,0.26)]"
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/0 via-white/72 to-white/0" />
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-cocoa">
                      <Sparkles className="size-4" />
                      {revealLabel}
                    </div>
                    <p className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-cocoa sm:text-5xl">
                      {state.revealedPrompt}
                    </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUpItem} className="space-y-4">
            <Card className="rounded-[38px] p-6">
              <Badge className="border-white/56 bg-white/34 text-cocoa">Replay shortcuts</Badge>
              <h2 className="mt-4 font-display text-4xl text-cocoa">Keep the momentum.</h2>
              <p className="mt-3 text-sm leading-7 text-cocoa/80">
                Continue the same route, switch locations, or return home and start a new sequence.
              </p>

              <div className="mt-6 grid gap-3">
                {nextActions.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <button key={item.title} type="button" className="interactive-outline text-left" onClick={item.onClick}>
                      <Card className="card-shell hover-lift rounded-[28px] p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-3xl text-cocoa">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-cocoa/80">{item.copy}</p>
                          </div>
                          <div className="rounded-[22px] border border-white/24 bg-white/16 p-3 text-cocoa">
                            <Icon className="size-5" />
                          </div>
                        </div>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-cocoa/68">
                          {index === 0 ? 'Fastest next step' : 'Switch path'}
                        </p>
                      </Card>
                    </button>
                  )
                })}
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <Link to="/app" className={buttonStyles({ variant: 'outline', size: 'lg' })}>
                  <ArrowLeft className="size-4" />
                  Go back home
                </Link>
                {!profile?.isPremium ? (
                  <Link to="/premium" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                    <Crown className="size-4" />
                    Upgrade to premium
                  </Link>
                ) : null}
              </div>
            </Card>

            <Card className="rounded-[34px] p-6">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-cocoa">
                <Compass className="size-4" />
                Round recap
              </div>
              <p className="mt-3 text-sm leading-7 text-cocoa/80">
                {isDare
                  ? 'You completed the suspense path. Another reshuffle or a new place will give the route a different personality.'
                  : isAudioTour
                    ? 'You completed the guided-stop path. Switch modes or move to another place to keep building the route like a curated tour.'
                    : 'You completed the story path. Switch modes or move to another place to broaden the route narrative.'}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
