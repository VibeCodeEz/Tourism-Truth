import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, RefreshCcw, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'
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
import { luxuryEase } from '@/lib/motion'

const deckCardCount = 15
const deckLabels = Array.from({ length: deckCardCount }, (_, index) => `Echo ${String(index + 1).padStart(2, '0')}`)
const deckFaceImages = Array.from({ length: deckLabels.length }, (_, index) => `/asset/Uno%20Cards/${index + 1}Card.png`)
const deckBackImage = '/asset/Uno%20Cards/BackCard.png'
const shuffleDurationMs = 5000
const shuffleDurationSeconds = shuffleDurationMs / 1000
const compressionStartMs = 3200
const spreadStartMs = 3900

type ShufflePhase = 'mixing' | 'compressing' | 'spreading' | 'ready'

const shufflePatterns = [
  { x: [0, 8, -6, 0], y: [0, -14, 6, 0], rotate: [0, 4, -4, 0] },
  { x: [0, -10, 8, 0], y: [0, 10, -8, 0], rotate: [0, -5, 3, 0] },
  { x: [0, 6, -12, 0], y: [0, -8, 10, 0], rotate: [0, 3, -5, 0] },
  { x: [0, -8, 10, 0], y: [0, 12, -6, 0], rotate: [0, -4, 4, 0] },
]

const initialDeckOrder = Array.from({ length: deckLabels.length }, (_, index) => index)

function createShuffledDeckOrder() {
  const nextOrder = [...initialDeckOrder]

  for (let index = nextOrder.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[nextOrder[index], nextOrder[swapIndex]] = [nextOrder[swapIndex], nextOrder[index]]
  }

  return nextOrder
}

function getCompressedOffset(position: number, total: number) {
  const center = (total - 1) / 2
  const distance = position - center

  return {
    x: distance * 5,
    y: -Math.abs(distance) * 2.75 - 10,
    rotate: distance * 1.6,
  }
}

export function ShuffleCardsPage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { recordGameSession } = useAuth()
  const { state, completeRound } = useGameFlow()
  const [shufflePhase, setShufflePhase] = useState<ShufflePhase>('mixing')
  const [deckOrder, setDeckOrder] = useState<number[]>(initialDeckOrder)
  const [revealedCardId, setRevealedCardId] = useState<number | null>(null)
  const [lastDrawnCardId, setLastDrawnCardId] = useState<number | null>(null)
  const [revealedDare, setRevealedDare] = useState<string | null>(null)
  const [completing, setCompleting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(shuffleDurationSeconds)
  const [shuffleCycle, setShuffleCycle] = useState(0)
  const [liveMessage, setLiveMessage] = useState(`Deck shuffle started. ${shuffleDurationSeconds} seconds remaining.`)

  const destination = state.destinationKey ? getDestinationByKey(state.destinationKey) : null
  const place = getPlaceById(state.placeId)
  const isShuffling = shufflePhase !== 'ready'

  useEffect(() => {
    if (reduceMotion) {
      setDeckOrder(createShuffledDeckOrder())
      setShufflePhase('ready')
      setSecondsLeft(0)
      return
    }

    setShufflePhase('mixing')
    setSecondsLeft(shuffleDurationSeconds)
    const startTime = Date.now()

    const countdownId = window.setInterval(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, shuffleDurationMs - elapsed)
      setSecondsLeft(Math.max(0, Math.ceil(remaining / 1000)))
    }, 180)
    const compressionId = window.setTimeout(() => {
      setShufflePhase('compressing')
    }, compressionStartMs)
    const spreadId = window.setTimeout(() => {
      setDeckOrder(createShuffledDeckOrder())
      setShufflePhase('spreading')
    }, spreadStartMs)
    const readyId = window.setTimeout(() => {
      setShufflePhase('ready')
      setSecondsLeft(0)
    }, shuffleDurationMs)

    return () => {
      window.clearInterval(countdownId)
      window.clearTimeout(compressionId)
      window.clearTimeout(spreadId)
      window.clearTimeout(readyId)
    }
  }, [reduceMotion, shuffleCycle])

  useEffect(() => {
    if (revealedCardId !== null && revealedDare) {
      setLiveMessage(`${deckLabels[revealedCardId]} revealed. Dare is ready to review.`)
      return
    }

    if (reduceMotion) {
      setLiveMessage('Deck ready. Reduced motion is enabled, so you can pick a card immediately.')
      return
    }

    const phaseMessages: Record<ShufflePhase, string> = {
      mixing: `Deck mixing. ${secondsLeft} seconds remaining.`,
      compressing: 'Deck compressing. The card order is changing.',
      spreading: 'Deck spreading into its new order.',
      ready: 'Deck ready. Pick one card to reveal a random dare.',
    }

    setLiveMessage(phaseMessages[shufflePhase])
  }, [reduceMotion, revealedCardId, revealedDare, secondsLeft, shufflePhase])

  if (!destination || !place || state.mode !== 'dare') {
    return <Navigate to="/app/play" replace />
  }

  const activeDestination = destination
  const activePlace = place
  const shuffleStatus =
    shufflePhase === 'mixing'
      ? 'Deck is mixing'
      : shufflePhase === 'compressing'
        ? 'Deck is compressing'
        : shufflePhase === 'spreading'
          ? 'Deck is spreading'
          : 'Deck ready'
  const progressWidth = `${Math.min(100, ((shuffleDurationSeconds - secondsLeft + (isShuffling ? 1 : 0)) / shuffleDurationSeconds) * 100)}%`
  const progressRatio = Math.min(1, (shuffleDurationSeconds - secondsLeft + (isShuffling ? 1 : 0)) / shuffleDurationSeconds)

  function handleCardPick() {
    if (isShuffling || revealedCardId !== null) {
      return
    }

    const candidateCardIds = initialDeckOrder.filter((id) => id !== lastDrawnCardId)
    const randomPool = candidateCardIds.length > 0 ? candidateCardIds : initialDeckOrder
    const randomCardId = randomPool[Math.floor(Math.random() * randomPool.length)]
    const randomDare = activePlace.dares[Math.floor(Math.random() * activePlace.dares.length)]
    setRevealedCardId(randomCardId)
    setLastDrawnCardId(randomCardId)
    setRevealedDare(randomDare)
  }

  function handleReshuffle() {
    if (isShuffling) {
      return
    }

    setRevealedCardId(null)
    setRevealedDare(null)
    setShuffleCycle((current) => current + 1)
  }

  async function handleCompleteDare() {
    if (revealedCardId === null || !revealedDare) {
      return
    }

    setCompleting(true)

    try {
      completeRound({
        title: deckLabels[revealedCardId],
        prompt: revealedDare,
      })
      await recordGameSession({
        destination: activeDestination.name,
        placeName: activePlace.name,
        mode: 'dare',
        revealedCard: revealedDare,
      })
      navigate('/app/play/completion', { state: { sessionSaved: true } })
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save game session')
    } finally {
      setCompleting(false)
    }
  }

  return (
    <PageTransition>
      <div className="space-y-5 sm:space-y-6">
        <PageHero
          badge="Step 5 - Shuffle arena"
          title="Let the deck settle."
          description={`The shuffle runs for ${shuffleDurationSeconds} seconds. Watch the deck build suspense, then pick one card to reveal a safe dare inspired by ${place.name}.`}
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <motion.div
              animate={
                isShuffling && !reduceMotion
                  ? { scale: [1, 1.05, 1], opacity: [1, 0.86, 1] }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 1.15, repeat: isShuffling && !reduceMotion ? Infinity : 0, ease: 'easeInOut' }}
            >
              <Badge className={isShuffling ? 'border-white/42 bg-white/24 text-cream' : 'border-white/56 bg-white/34 text-cocoa'}>
                {isShuffling ? `${secondsLeft}s remaining` : 'Deck ready'}
              </Badge>
            </motion.div>
            <Badge className="border-white/22 bg-white/14 text-cream/74">{shuffleStatus}</Badge>
            <p className="text-sm text-cream/60">Pick a card, or reshuffle and try again.</p>
          </div>
        </PageHero>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <Card className="relative overflow-hidden rounded-[34px] p-3.5 sm:rounded-[38px] sm:p-4 md:p-6" aria-busy={isShuffling}>
            <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {liveMessage}
            </div>
            <div className="absolute inset-0 panel-grid opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(223,241,255,0.06))]" />
            <div className="absolute inset-x-[14%] top-20 h-28 rounded-full bg-[radial-gradient(circle,rgba(190,228,255,0.26),transparent_68%)] blur-3xl" />
            <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
              <p className="text-sm uppercase tracking-[0.18em] text-cream/54">
                {revealedCardId !== null ? 'Chosen card' : isShuffling ? 'Shuffling in progress' : 'Pick one card'}
              </p>
              <Badge className={isShuffling ? 'border-white/42 bg-white/24 text-cream' : 'border-white/56 bg-white/34 text-cocoa'}>
                {revealedCardId !== null ? deckLabels[revealedCardId] : isShuffling ? `${shuffleDurationSeconds}-second shuffle` : 'Deck ready'}
              </Badge>
            </div>
            <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/18">
              <motion.div
                className="h-full rounded-full bg-[linear-gradient(90deg,rgba(255,255,255,0.96),rgba(190,228,255,0.92),rgba(220,223,253,0.88))]"
                animate={{ width: revealedCardId !== null ? '100%' : progressWidth }}
                transition={{ duration: 0.3, ease: luxuryEase }}
              />
            </div>

            <AnimatePresence mode="wait">
              {revealedCardId !== null ? (
                <motion.div
                  key="featured-card"
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.92, y: 24 }}
                  animate={reduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: -16 }}
                  transition={{ duration: 0.48, ease: luxuryEase }}
                className="flex min-h-[430px] items-center justify-center py-2 sm:min-h-[680px] sm:py-4"
              >
                  <div className="relative w-full max-w-[320px] sm:max-w-[560px] lg:max-w-[640px]">
                    <motion.div
                      className="absolute inset-x-[10%] top-6 h-32 rounded-full bg-[radial-gradient(circle,rgba(190,228,255,0.32),transparent_72%)] blur-3xl"
                      animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.06, 1] }}
                      transition={reduceMotion ? { duration: 0 } : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="relative overflow-hidden rounded-[30px] border border-white/38 bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(190,228,255,0.08))] p-2.5 shadow-[0_24px_58px_rgba(89,136,180,0.28)] sm:rounded-[42px] sm:p-4 sm:shadow-[0_34px_84px_rgba(89,136,180,0.34)]">
                      <div className="overflow-hidden rounded-[22px] sm:rounded-[30px]">
                        <img
                          src={deckFaceImages[revealedCardId]}
                          alt={deckLabels[revealedCardId]}
                          className="w-full object-cover"
                          draggable={false}
                        />
                      </div>
                    </div>
                    <div className="mt-4 rounded-[24px] border border-white/18 bg-white/12 px-4 py-3 text-center sm:mt-5 sm:rounded-[28px] sm:px-5 sm:py-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-cream/52">{deckLabels[revealedCardId]}</p>
                      <p className="mt-2 text-sm leading-7 text-cream/82">{revealedDare}</p>
                    </div>
                    <p className="mt-5 text-center text-sm uppercase tracking-[0.22em] text-cream/54">
                      Featured reveal
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="deck-grid"
                  initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                  transition={{ duration: 0.36, ease: luxuryEase }}
                  className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5 lg:gap-4"
                >
                  {deckOrder.map((cardId, position) => {
                    const label = deckLabels[cardId]
                    const pattern = shufflePatterns[position % shufflePatterns.length]
                    const isSelected = revealedCardId === cardId
                    const showFront = shufflePhase === 'mixing' || shufflePhase === 'compressing' || isSelected
                    const compressedOffset = getCompressedOffset(position, deckOrder.length)
                    const mixIntensity = 1 + progressRatio * 0.55
                    const animation =
                      reduceMotion
                        ? { opacity: 1 }
                        : shufflePhase === 'mixing'
                          ? {
                              x: pattern.x.map((value) => value * mixIntensity),
                              y: pattern.y.map((value) => value * mixIntensity),
                              rotate: pattern.rotate.map((value) => value * (1 + progressRatio * 0.35)),
                              scale: [1, 1.04 + progressRatio * 0.03, 0.97 - progressRatio * 0.02, 1],
                            }
                          : shufflePhase === 'compressing'
                            ? {
                                x: compressedOffset.x,
                                y: compressedOffset.y,
                                rotate: compressedOffset.rotate,
                                scale: 0.92,
                              }
                            : shufflePhase === 'spreading'
                              ? {
                                  x: [compressedOffset.x, 0],
                                  y: [compressedOffset.y, 0],
                                  rotate: [compressedOffset.rotate, 0],
                                  scale: [0.92, 1],
                                }
                              : {
                                  x: 0,
                                  y: 0,
                                  rotate: 0,
                                  scale: 1,
                                }
                    const transition =
                      shufflePhase === 'mixing'
                        ? {
                            duration: 1.35,
                            repeat: reduceMotion ? 0 : Infinity,
                            ease: 'easeInOut' as const,
                            delay: position * 0.035,
                            layout: {
                              duration: 0.72,
                              type: 'spring' as const,
                              stiffness: 120,
                              damping: 18,
                            },
                          }
                        : shufflePhase === 'compressing'
                          ? {
                              duration: 0.55,
                              ease: luxuryEase,
                              layout: {
                                duration: 0.72,
                                type: 'spring' as const,
                                stiffness: 120,
                                damping: 18,
                              },
                            }
                          : {
                              duration: 0.8,
                              ease: luxuryEase,
                              delay: shufflePhase === 'spreading' ? position * 0.018 : 0,
                              layout: {
                                duration: 0.72,
                                type: 'spring' as const,
                                stiffness: 120,
                                damping: 18,
                              },
                            }

                    return (
                      <motion.button
                        key={cardId}
                        layout
                        type="button"
                        aria-pressed={isSelected}
                        aria-disabled={isShuffling || revealedCardId !== null}
                        aria-label={
                          isShuffling
                            ? `${label}. Deck is still shuffling.`
                            : revealedCardId !== null
                              ? `${label}. Deck is locked until you reshuffle.`
                              : `${label}. Pick to draw a random dare from the ready deck.`
                        }
                        disabled={isShuffling || revealedCardId !== null}
                        className="interactive-outline group relative aspect-[0.72] min-h-[116px] overflow-hidden rounded-[20px] border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(223,241,255,0.08))] text-left shadow-[0_18px_42px_rgba(89,136,180,0.18),inset_0_1px_0_rgba(255,255,255,0.46)] sm:min-h-[172px] sm:rounded-[26px]"
                        style={{ perspective: 1200 }}
                        animate={animation}
                        transition={transition}
                        whileHover={
                          !isShuffling && !reduceMotion
                            ? {
                                y: -6,
                                scale: 1.03,
                                boxShadow:
                                  '0 24px 62px rgba(121, 177, 231, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.24)',
                              }
                            : undefined
                        }
                        onClick={() => handleCardPick()}
                      >
                        {!isShuffling ? (
                          <div className="pointer-events-none absolute inset-x-[20%] top-3 h-10 rounded-full bg-[radial-gradient(circle,rgba(190,228,255,0.22),transparent_70%)] opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />
                        ) : null}
                        <motion.div
                          className="absolute inset-0"
                          style={{ transformStyle: 'preserve-3d' }}
                          animate={{ rotateY: showFront ? 0 : 180 }}
                          transition={{
                            duration: shufflePhase === 'spreading' ? 0.75 : 0.62,
                            delay: shufflePhase === 'spreading' ? position * 0.028 : 0,
                            ease: luxuryEase,
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                          >
                            <img
                              src={deckFaceImages[cardId]}
                              alt={label}
                              className="h-full w-full object-cover"
                              draggable={false}
                            />
                          </div>

                          <div
                            className="absolute inset-0"
                            style={{
                              transform: 'rotateY(180deg)',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            <img
                              src={deckBackImage}
                              alt="Card back"
                              className="h-full w-full object-cover"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,228,255,0.18),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(37,66,99,0.1))]" />
                          </div>
                        </motion.div>
                      </motion.button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <Card className="rounded-[34px] p-5 sm:rounded-[38px] sm:p-6">
            <Badge>{activePlace.name}</Badge>
            <h2 className="mt-4 font-display text-3xl text-cream sm:text-4xl">
              {revealedDare ? 'Card selected.' : 'Waiting for your pick.'}
            </h2>
            <p aria-live="polite" className="mt-3 text-sm leading-7 text-cream/76">
              {revealedDare
                ? 'The chosen card is now featured on the left. Complete the round when you are ready.'
                : 'The revealed card will surface one playful, safe, location-aware mission for this round.'}
            </p>
            <div className="mt-5 rounded-[26px] border border-white/18 bg-white/12 p-4 sm:mt-6 sm:rounded-[30px] sm:p-5">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-cream">
                <Sparkles className="size-4" />
                Place mood
              </div>
              <p className="mt-3 text-sm leading-7 text-cream/76">{activePlace.shortDescription}</p>
            </div>
            <div className="mt-3 rounded-[26px] border border-white/18 bg-white/12 p-4 sm:mt-4 sm:rounded-[30px] sm:p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-cream/54">Shuffle sequence</p>
              <p className="mt-3 text-sm leading-7 text-cream/76">
                The deck now mixes with rising intensity, compresses, spreads into a new order, and flips to the back before the draw.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:mt-6">
              <Button size="lg" disabled={!revealedDare} loading={completing} onClick={() => void handleCompleteDare()}>
                Complete dare
                <ArrowRight className="size-4" />
              </Button>
              <Button variant="secondary" size="lg" disabled={isShuffling} onClick={handleReshuffle}>
                <RefreshCcw className="size-4" />
                Reshuffle and pick again
              </Button>
              <Button variant="secondary" size="lg" onClick={() => navigate(`/app/destinations/${activeDestination.key}`)}>
                Choose another place
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
