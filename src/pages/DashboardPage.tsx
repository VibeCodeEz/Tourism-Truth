import { ArrowRight, Crown, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { destinations } from '@/data/experienceData'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'

export function DashboardPage() {
  const { profile } = useAuth()
  const { state } = useGameFlow()
  const nextRoute = profile?.travelType ?? state.travelType ? '/app/destinations' : '/app/travel-type'

  return (
    <div className="space-y-6">
      <PageHero
        badge={profile?.isPremium ? 'Premium passport active' : 'Free explorer pass'}
        title={`Welcome back, ${profile?.fullName ?? 'Traveler'}.`}
        description="Pick up your route, lock in a place, and turn today's stop into something sharper than a basic travel checklist."
        actions={
          <>
            <Link to={nextRoute} className={buttonStyles({ size: 'lg' })}>
              {profile?.travelType ?? state.travelType ? 'Continue to destinations' : 'Choose travel setup'}
              <ArrowRight className="size-4" />
            </Link>
            {!profile?.isPremium ? (
              <Link to="/premium" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
                <Crown className="size-4" />
                Upgrade
              </Link>
            ) : null}
          </>
        }
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cream/45">Travel setup</p>
          <h2 className="mt-3 font-display text-3xl text-cream">
            {profile?.travelType ?? state.travelType ?? 'Not selected yet'}
          </h2>
          <p className="mt-3 text-sm leading-7 text-cream/68">
            Pick the traveler profile that matches your day so the experience feels more personal.
          </p>
          <Link to="/app/travel-type" className={buttonStyles({ variant: 'secondary', size: 'sm', className: 'mt-5' })}>
            {profile?.travelType ?? state.travelType ? 'Change travel setup' : 'Choose travel setup'}
          </Link>
        </Card>
        <Card className="rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cream/45">Current route</p>
          <h2 className="mt-3 font-display text-3xl text-cream">
            {state.destinationKey ? state.destinationKey.charAt(0).toUpperCase() + state.destinationKey.slice(1) : 'Choose a destination'}
          </h2>
          <p className="mt-3 text-sm leading-7 text-cream/68">
            {state.destinationKey
              ? 'You can continue straight into place selection or switch routes anytime.'
              : 'Intramuros is always available. Premium opens Binondo, Ilocos, and Boracay immediately.'}
          </p>
        </Card>
        <Card className="rounded-[30px] p-6">
          <p className="text-sm uppercase tracking-[0.2em] text-cream/45">Deck status</p>
          <h2 className="mt-3 font-display text-3xl text-cream">15-card shuffle</h2>
          <p className="mt-3 text-sm leading-7 text-cream/68">
            Truth gives you a direct reveal. Dare sends you into the suspense deck after a place-specific fun fact.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {destinations.map((destination) => (
          <Card key={destination.key} className="rounded-[28px] p-5">
            <Badge className={destination.premiumOnly ? 'border-gold/30 bg-gold/12 text-gold' : ''}>
              {destination.highlight}
            </Badge>
            <h3 className="mt-4 font-display text-3xl text-cream">{destination.name}</h3>
            <p className="mt-2 text-sm text-cream/68">{destination.tagline}</p>
          </Card>
        ))}
      </div>

      {!profile?.isPremium ? (
        <Card className="rounded-[32px] p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Badge className="border-gold/30 bg-gold/12 text-gold">Premium teaser</Badge>
              <h2 className="mt-3 font-display text-3xl text-cream">Open the wider route map.</h2>
              <p className="mt-2 text-sm leading-7 text-cream/68">
                Upgrade once to unlock Binondo, Ilocos, and Boracay with the same polished game flow and saved profile
                state.
              </p>
            </div>
            <Link to="/premium" className={buttonStyles({ size: 'lg' })}>
              <Sparkles className="size-4" />
              View premium
            </Link>
          </div>
        </Card>
      ) : null}
    </div>
  )
}
