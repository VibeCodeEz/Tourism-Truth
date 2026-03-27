import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Flame, Headphones, Sparkles } from 'lucide-react'
import { Navigate, useNavigate } from 'react-router-dom'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { getDestinationByKey, getPlaceById } from '@/data/experienceData'
import { useGameFlow } from '@/hooks/useGameFlow'
import { fadeUpItem, luxuryEase, staggerContainer } from '@/lib/motion'

export function TruthOrDarePage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { state, setMode } = useGameFlow()

  const destination = state.destinationKey ? getDestinationByKey(state.destinationKey) : null
  const place = getPlaceById(state.placeId)

  if (!destination || !place) {
    return <Navigate to="/app/destinations" replace />
  }

  function handleModeSelection(mode: 'truth' | 'dare' | 'audio-tour') {
    setMode(mode)
    navigate(mode === 'truth' ? '/app/play/fact' : mode === 'dare' ? '/app/play/shuffle' : '/app/play/audio-tour')
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="Step 4 - Choose your mode"
          title="Choose how this place should reveal itself."
          description={`You selected ${place.name} in ${destination.name}. Truth opens the story, Dare adds suspense, and Audio Tour turns the stop into a guided cultural walkthrough.`}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 lg:grid-cols-[0.82fr,1.18fr]"
        >
          <motion.div variants={fadeUpItem}>
            <Card className="section-orb relative overflow-hidden rounded-[38px] p-6 sm:p-7">
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-white/0 via-white/72 to-white/0" />
                <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Selected location</p>
                <h2 className="mt-3 font-display text-4xl text-cocoa sm:text-5xl">{place.name}</h2>
                <p className="mt-3 text-sm leading-7 text-cocoa/80">{place.detail}</p>
            <div className="mt-6 grid gap-3">
                  <div className="rounded-[24px] border border-white/24 bg-white/16 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">If you choose truth</p>
                    <p className="mt-2 text-sm leading-7 text-cocoa/80">
                      The round slows down and gives you a more editorial, cultural reveal tied to the place itself.
                    </p>
                  </div>
                  <div className="rounded-[24px] border border-white/24 bg-white/16 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">If you choose dare</p>
                    <p className="mt-2 text-sm leading-7 text-cocoa/80">
                      The mood becomes more suspenseful and social, ending in a shuffled reveal that still stays location-aware.
                    </p>
                  </div>
              <div className="rounded-[24px] border border-white/24 bg-white/16 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">If you choose audio tour</p>
                <p className="mt-2 text-sm leading-7 text-cocoa/80">
                  The round becomes a guided stop with a narrated-tour feel, paced like a host is walking you through the site.
                </p>
              </div>
            </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeUpItem} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <motion.button
              type="button"
              className="interactive-outline group text-left"
              aria-describedby="truth-choice-description"
              onClick={() => handleModeSelection('truth')}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: luxuryEase }}
            >
              <Card className="card-shell relative overflow-hidden rounded-[38px] p-6 sm:p-7 transition hover:border-white/60">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,160,178,0.12),transparent_42%)]"
                  animate={reduceMotion ? undefined : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.02, 1] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative">
                <Sparkles className="mb-4 size-6 text-azure" />
                <Badge className="border-white/64 bg-white/40 text-cocoa">Truth</Badge>
                <h2 className="mt-4 font-display text-4xl text-cocoa sm:text-[2.9rem]">Reveal the story.</h2>
                <p id="truth-choice-description" className="mt-3 text-sm leading-7 text-cocoa/82">
                  Slow the pace and let the place explain itself through one polished cultural reveal and a cleaner historical read.
                </p>
                <div className="mt-6 rounded-[24px] border border-white/24 bg-white/16 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Mood</p>
                  <p className="mt-2 text-sm leading-7 text-cocoa/80">Calm, elegant, reflective, and more rooted in place meaning.</p>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cocoa transition group-hover:gap-3">
                  Choose the story
                  <ArrowRight className="size-4" />
                </p>
                </div>
              </Card>
            </motion.button>

            <motion.button
              type="button"
              className="interactive-outline group text-left"
              aria-describedby="dare-choice-description"
              onClick={() => handleModeSelection('dare')}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: luxuryEase }}
            >
              <Card className="card-shell relative overflow-hidden rounded-[38px] p-6 sm:p-7 transition hover:border-white/60">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(191,163,196,0.18),transparent_36%)]"
                  animate={reduceMotion ? undefined : { opacity: [0.45, 0.85, 0.45], scale: [1, 1.05, 1], rotate: [0, 1, 0] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative">
                <Flame className="mb-4 size-6 text-azure" />
                <Badge className="border-white/64 bg-white/40 text-cocoa">Dare</Badge>
                <h2 className="mt-4 font-display text-4xl text-cocoa sm:text-[2.9rem]">Let the deck decide.</h2>
                <p id="dare-choice-description" className="mt-3 text-sm leading-7 text-cocoa/82">
                  Turn the same place into a suspense play. The deck shuffles, the card flips, and one challenge takes over the round.
                </p>
                <div className="mt-6 rounded-[24px] border border-white/24 bg-white/16 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Mood</p>
                  <p className="mt-2 text-sm leading-7 text-cocoa/80">Suspenseful, playful, energetic, and built for a stronger reveal moment.</p>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cocoa transition group-hover:gap-3">
                  Choose the challenge
                  <ArrowRight className="size-4" />
                </p>
                </div>
              </Card>
            </motion.button>

            <motion.button
              type="button"
              className="interactive-outline group text-left"
              aria-describedby="audio-tour-choice-description"
              onClick={() => handleModeSelection('audio-tour')}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: luxuryEase }}
            >
              <Card className="card-shell relative overflow-hidden rounded-[38px] p-6 sm:p-7 transition hover:border-white/60">
                <motion.div
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,195,154,0.18),transparent_40%)]"
                  animate={reduceMotion ? undefined : { opacity: [0.45, 0.8, 0.45], scale: [1, 1.03, 1] }}
                  transition={reduceMotion ? { duration: 0 } : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="relative">
                <Headphones className="mb-4 size-6 text-cocoa" />
                <Badge className="border-white/64 bg-white/40 text-cocoa">Audio Tour</Badge>
                <h2 className="mt-4 font-display text-4xl text-cocoa sm:text-[2.9rem]">Walk it like a guided stop.</h2>
                <p id="audio-tour-choice-description" className="mt-3 text-sm leading-7 text-cocoa/82">
                  Follow a cleaner tour-style sequence that frames the place the way a polished guide would introduce it on site.
                </p>
                <div className="mt-6 rounded-[24px] border border-white/24 bg-white/16 p-4">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Mood</p>
                  <p className="mt-2 text-sm leading-7 text-cocoa/80">Guided, immersive, informative, and paced like a curated stop on a live route.</p>
                </div>
                <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cocoa transition group-hover:gap-3">
                  Choose the guided tour
                  <ArrowRight className="size-4" />
                </p>
                </div>
              </Card>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
