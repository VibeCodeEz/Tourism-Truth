import { motion } from 'framer-motion'
import { ArrowRight, Crown, LockKeyhole, MapPinned, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { Navigate, useNavigate } from 'react-router-dom'

import { PageHero } from '@/components/app/PageHero'
import { PremiumModal } from '@/components/app/PremiumModal'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { destinations } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'
import { getIcon } from '@/lib/icons'
import { fadeUpItem, staggerContainer } from '@/lib/motion'
import type { Destination } from '@/types/models'

export function DestinationPage() {
  const navigate = useNavigate()
  const { profile, upgradeToPremium } = useAuth()
  const { state, setDestination } = useGameFlow()
  const [lockedSelection, setLockedSelection] = useState<Destination | null>(null)
  const [upgrading, setUpgrading] = useState(false)

  if (!(profile?.travelType ?? state.travelType)) {
    return <Navigate to="/app/travel-type" replace />
  }

  function handleDestinationSelect(destination: Destination) {
    if (destination.premiumOnly && !profile?.isPremium) {
      setLockedSelection(destination)
      return
    }

    setDestination(destination.key)
    navigate(`/app/destinations/${destination.key}`)
  }

  async function handleUpgrade() {
    setUpgrading(true)

    try {
      await upgradeToPremium()
      toast.success('Premium access unlocked')
      setLockedSelection(null)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to upgrade profile')
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="Step 2 - Destination selection"
          title="Choose the route you want to play."
          description="Intramuros is open on the free pass. Premium unlocks Binondo, Ilocos, and Boracay with the same polished experience."
          actions={
            !profile?.isPremium ? (
              <Button size="lg" onClick={() => setLockedSelection(destinations[1])}>
                <Crown className="size-4" />
                Upgrade to Premium
              </Button>
            ) : undefined
          }
        >
          {!profile?.isPremium ? (
            <div className="grid gap-3 lg:grid-cols-[0.9fr,1.1fr]">
              <div className="rounded-[26px] border border-white/10 bg-white/6 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-cream/45">Free pass</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-cream">1 open route</p>
                    <p className="mt-1 text-sm leading-6 text-cream/62">Intramuros is fully playable right now.</p>
                  </div>
                  <Badge className="border-white/10 bg-white/8 text-cream/62">Instant access</Badge>
                </div>
              </div>
              <div className="rounded-[26px] border border-gold/14 bg-[linear-gradient(180deg,rgba(229,195,154,0.08),rgba(255,248,245,0.04))] p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gold/80">Premium passport</p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-display text-3xl text-cream">4 total routes</p>
                    <p className="mt-1 text-sm leading-6 text-cream/62">
                      Binondo, Ilocos, and Boracay join the route map with no locked states.
                    </p>
                  </div>
                  <Badge className="border-gold/20 bg-gold/10 text-gold">3 exclusive routes</Badge>
                </div>
              </div>
            </div>
          ) : null}
        </PageHero>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid gap-4 md:grid-cols-2"
        >
          {destinations.map((destination) => {
            const Icon = getIcon(destination.iconKey)
            const locked = destination.premiumOnly && !profile?.isPremium
            return (
              <motion.div key={destination.key} variants={fadeUpItem}>
                <button
                  type="button"
                  aria-label={locked ? `${destination.name} premium locked` : `Enter ${destination.name}`}
                  aria-describedby={`${destination.key}-destination-copy`}
                  aria-haspopup={locked ? 'dialog' : undefined}
                  className="interactive-outline group text-left"
                  onClick={() => handleDestinationSelect(destination)}
                >
                  <Card
                    className={`card-shell hover-lift relative overflow-hidden rounded-[36px] bg-gradient-to-br ${destination.accent} p-6 sm:p-7`}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={destination.imagePath}
                        alt=""
                        aria-hidden="true"
                        className={`h-full w-full object-cover transition duration-500 ${
                          locked ? 'scale-[1.06] blur-[1px] group-hover:scale-[1.1]' : 'scale-[1.03] group-hover:scale-[1.07]'
                        }`}
                      />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,12,18,0.1),rgba(18,12,18,0.22)_38%,rgba(18,12,18,0.82)_100%)]" />
                    <div className={`absolute inset-0 opacity-0 transition duration-300 ${locked ? 'group-hover:opacity-100' : 'group-hover:opacity-80'} premium-sheen`} />
                    {locked ? (
                      <div className="absolute inset-0 opacity-80 bg-[radial-gradient(circle_at_top_right,rgba(229,195,154,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(215,160,178,0.14),transparent_36%)]" />
                    ) : null}
                    <div className="absolute inset-x-6 top-6 h-px bg-gradient-to-r from-white/0 via-white/30 to-white/0" />
                    <div className="relative flex min-h-[23rem] flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-3">
                          <Badge className={locked ? 'border-gold/26 bg-[rgba(52,38,33,0.44)] text-gold' : 'border-white/14 bg-[rgba(38,29,35,0.42)] text-cream/80'}>
                            {locked ? 'Premium route' : destination.highlight}
                          </Badge>
                          <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-cream/45">{destination.location}</p>
                            <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">{destination.name}</h2>
                            <p className="mt-3 max-w-md text-sm leading-7 text-cream/72">{destination.tagline}</p>
                          </div>
                        </div>
                        <div className={`rounded-[22px] border p-3.5 shadow-[0_18px_36px_rgba(20,12,18,0.18)] ${
                          locked
                            ? 'border-gold/18 bg-[rgba(62,45,38,0.42)] text-gold'
                            : 'border-white/12 bg-[rgba(38,29,35,0.42)] text-blush'
                        }`}>
                          <Icon className="size-5" />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-[24px] border border-white/10 bg-[rgba(27,20,26,0.36)] p-4 backdrop-blur-xl">
                          <p id={`${destination.key}-destination-copy`} className="text-sm leading-7 text-cream/76">
                            {destination.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-cream/68">
                          <span className="inline-flex items-center gap-2">
                            <MapPinned className="size-4" />
                            {destination.location}
                          </span>
                          {locked ? (
                            <span className="inline-flex items-center gap-2 text-gold">
                              <LockKeyhole className="size-4" />
                              Premium unlock
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-2 text-cream">
                              Enter experience
                              <ArrowRight className="size-4" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {locked ? (
                      <div className="absolute inset-0 flex items-end rounded-[36px] bg-[linear-gradient(180deg,rgba(24,18,24,0.08),rgba(24,18,24,0.84))] p-6 backdrop-blur-[7px] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(24,18,24,0.02),rgba(24,18,24,0.72))]">
                        <div className="w-full space-y-3">
                          <div className="translate-y-2 rounded-[28px] border border-gold/22 bg-[linear-gradient(180deg,rgba(53,40,34,0.62),rgba(30,22,27,0.62))] p-4 shadow-[0_26px_80px_rgba(229,195,154,0.12)] backdrop-blur-2xl transition duration-300 group-hover:translate-y-0 group-hover:shadow-[0_32px_96px_rgba(229,195,154,0.18)]">
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-sm font-semibold text-gold">Included in the premium passport</p>
                                <p className="mt-1 text-sm leading-6 text-cream/78">
                                  Open {destination.name} for a more elevated route with exclusive place-based reveals.
                                </p>
                              </div>
                              <div className="rounded-[22px] border border-gold/24 bg-gold/12 p-3 text-gold shadow-[0_16px_34px_rgba(229,195,154,0.12)]">
                                <Crown className="size-5" />
                              </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-cream/48">
                              <span>Exclusive preview</span>
                              <span className="text-gold">Premium only</span>
                            </div>
                          </div>

                          <div className="pointer-events-none rounded-[24px] border border-white/10 bg-[rgba(28,21,27,0.34)] px-4 py-3 opacity-0 backdrop-blur-xl transition duration-300 group-hover:opacity-100">
                            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold/80">
                              <Sparkles className="size-3.5" />
                              Hover preview
                            </div>
                            <p className="mt-2 text-sm leading-6 text-cream/76">
                              {destination.tagline}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </Card>
                </button>
              </motion.div>
            )
          })}
        </motion.div>

        <PremiumModal
          open={Boolean(lockedSelection)}
          onClose={() => setLockedSelection(null)}
          onUpgrade={handleUpgrade}
          loading={upgrading}
        />
      </div>
    </PageTransition>
  )
}
