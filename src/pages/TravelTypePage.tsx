import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { travelTypes } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'
import { getIcon } from '@/lib/icons'
import { fadeUpItem, luxuryEase, staggerContainer } from '@/lib/motion'
import type { TravelType } from '@/types/models'

export function TravelTypePage() {
  const navigate = useNavigate()
  const reduceMotion = useReducedMotion()
  const { updateTravelType, profile } = useAuth()
  const { state, setTravelType } = useGameFlow()
  const [selected, setSelected] = useState<TravelType | null>(state.travelType ?? profile?.travelType ?? null)
  const [saving, setSaving] = useState(false)
  const [confirmedSelection, setConfirmedSelection] = useState<TravelType | null>(null)

  async function handleContinue() {
    if (!selected) {
      toast.error('Choose a travel setup first.')
      return
    }

    setSaving(true)

    try {
      setTravelType(selected)
      await updateTravelType(selected)
      toast.success('Travel setup saved')
      setConfirmedSelection(selected)
      await new Promise((resolve) => window.setTimeout(resolve, 650))
      navigate('/app/destinations')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to save travel setup')
    } finally {
      setSaving(false)
    }
  }

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="Travel setup"
          title="How are you traveling today?"
          description="Pick one travel rhythm. You can update it anytime, and we keep it in app state plus your profile so the product remembers how you like to explore."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          role="radiogroup"
          aria-label="Travel setup options"
          className="grid gap-4 md:grid-cols-2"
        >
          {travelTypes.map((option) => {
            const Icon = getIcon(option.iconKey)
            const isSelected = selected === option.id
            const isConfirmed = confirmedSelection === option.id

            return (
              <motion.button
                key={option.id}
                variants={fadeUpItem}
                type="button"
                role="radio"
                aria-checked={isSelected}
                aria-describedby={`${option.id}-support`}
                className="interactive-outline text-left"
                onClick={() => setSelected(option.id)}
              >
                <Card
                  className={`card-shell hover-lift relative overflow-hidden rounded-[34px] bg-gradient-to-br ${option.accent} p-6 sm:p-7 ${
                    isSelected ? 'border-white/70 shadow-[0_26px_60px_rgba(121,177,231,0.22)]' : ''
                  }`}
                >
                  <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/0 via-white/72 to-white/0" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="rounded-[24px] border border-white/44 bg-white/24 p-3.5 text-cocoa shadow-[0_16px_32px_rgba(89,136,180,0.18)]">
                      <Icon className="size-5" />
                    </div>
                    <Badge className={isSelected ? 'border-white/56 bg-white/34 text-cocoa' : 'border-white/40 bg-white/26 text-cocoa/82'}>
                      {option.toneLabel}
                    </Badge>
                  </div>

                  <div className="mt-6">
                    <h2 className="font-display text-3xl text-cocoa sm:text-4xl">{option.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-cocoa/80">{option.description}</p>
                  </div>

                  <div className="mt-5 rounded-[24px] border border-white/30 bg-white/18 px-4 py-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Why choose this</p>
                    <p id={`${option.id}-support`} className="mt-2 text-sm leading-7 text-cocoa/80">
                      {option.supportCopy}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-cocoa/84">
                      {isSelected ? 'This travel setup is ready to save.' : 'Tap to make this your route mood.'}
                    </p>
                    <AnimatePresence>
                      {isSelected ? (
                        <motion.div
                          initial={reduceMotion ? false : { opacity: 0, scale: 0.88 }}
                          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.88 }}
                          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: luxuryEase }}
                          className="rounded-full border border-white/36 bg-white/18 p-2 text-cocoa"
                        >
                          {isConfirmed ? <CheckCircle2 className="size-4.5" /> : <ArrowRight className="size-4.5" />}
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </Card>
              </motion.button>
            )
          })}
        </motion.div>

        <Card className="rounded-[32px] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-cocoa/68">Current pick</p>
              <p className="mt-1 font-display text-3xl text-cocoa">{selected ?? 'Select one card to continue'}</p>
              <p className="mt-2 text-sm leading-7 text-cocoa/76">
                {selected
                  ? travelTypes.find((option) => option.id === selected)?.supportCopy
                  : 'Choose the travel mode that best matches the mood and group dynamic for today.'}
              </p>
            </div>
            <Button size="lg" loading={saving} onClick={() => void handleContinue()}>
              {saving ? 'Saving your route mood' : confirmedSelection ? 'Travel setup confirmed' : 'Save travel setup'}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
