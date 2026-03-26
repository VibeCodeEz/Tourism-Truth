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
      title: state.mode === 'truth' ? 'Try the dare path' : 'Try another reveal',
      copy:
        state.mode === 'truth'
          ? 'Stay in the same place and switch the mood by moving directly back into the choice screen.'
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
            state.mode === 'dare'
              ? 'The card is revealed, the moment is saved, and you can launch another round whenever you want.'
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
                className="absolute inset-x-[18%] top-10 h-28 rounded-full bg-[radial-gradient(circle,rgba(229,195,154,0.22),transparent_72%)] blur-3xl"
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
                    className="rounded-full border border-gold/20 bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-gold"
                  >
                    Round complete
                  </motion.div>
                  <div className="rounded-full border border-white/12 bg-white/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cream/60">
                    {state.mode === 'dare' ? 'Dare round' : 'Truth round'}
                  </div>
                  {sessionSaved ? (
                    <div className="rounded-full border border-emerald-300/18 bg-emerald-300/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-200">
                      Session saved
                    </div>
                  ) : null}
                </div>

                <div className="space-y-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-cream/45">Latest reveal</p>
                    <h2 className="mt-3 font-display text-5xl text-cream sm:text-6xl">
                      {state.mode === 'dare' ? 'Challenge locked in.' : 'Story captured.'}
                    </h2>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-cream/68 sm:text-base sm:leading-8">
                      Your latest route moment is summarized below, ready for another round whenever you want it.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cream/45">Destination</p>
                      <h3 className="mt-2 font-display text-3xl text-cream">{activeDestination.name}</h3>
                    </Card>
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cream/45">Place</p>
                      <h3 className="mt-2 font-display text-3xl text-cream">{activePlace.name}</h3>
                    </Card>
                    <Card className="card-shell rounded-[28px] p-5">
                      <p className="text-sm uppercase tracking-[0.18em] text-cream/45">Mode</p>
                      <h3 className="mt-2 font-display text-3xl capitalize text-cream">{state.mode}</h3>
                    </Card>
                  </div>

                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
                    animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { delay: 0.18, duration: 0.55, ease: luxuryEase }}
                    className="relative overflow-hidden rounded-[30px] border border-gold/18 bg-[linear-gradient(180deg,rgba(229,195,154,0.1),rgba(255,248,245,0.06))] p-6 shadow-[0_24px_64px_rgba(20,12,18,0.26)]"
                  >
                    <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/0 via-gold/70 to-white/0" />
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                      <Sparkles className="size-4" />
                      {state.mode === 'dare' ? state.revealedCardTitle : 'Truth reveal'}
                    </div>
                    <p className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-cream sm:text-5xl">
                      {state.revealedPrompt}
                    </p>
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUpItem} className="space-y-4">
            <Card className="rounded-[38px] p-6">
              <Badge className="border-blush/30 bg-blush/12 text-mist">Replay shortcuts</Badge>
              <h2 className="mt-4 font-display text-4xl text-cream">Keep the momentum.</h2>
              <p className="mt-3 text-sm leading-7 text-cream/68">
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
                            <h3 className="font-display text-3xl text-cream">{item.title}</h3>
                            <p className="mt-2 text-sm leading-7 text-cream/66">{item.copy}</p>
                          </div>
                          <div className="rounded-[22px] border border-white/12 bg-white/10 p-3 text-blush">
                            <Icon className="size-5" />
                          </div>
                        </div>
                        <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-cream/38">
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
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-blush">
                <Compass className="size-4" />
                Round recap
              </div>
              <p className="mt-3 text-sm leading-7 text-cream/68">
                {state.mode === 'dare'
                  ? 'You completed the suspense path. Another reshuffle or a new place will give the route a different personality.'
                  : 'You completed the story path. Switch modes or move to another place to broaden the route narrative.'}
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
