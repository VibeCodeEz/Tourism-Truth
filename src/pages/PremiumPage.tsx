import { Check, Crown, Sparkles, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { Button, buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { useAuth } from '@/hooks/useAuth'

export function PremiumPage() {
  const { profile, upgradeToPremium } = useAuth()

  async function handleUpgrade() {
    try {
      await upgradeToPremium()
      toast.success('Premium access unlocked')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to upgrade profile')
    }
  }

  return (
    <PageTransition>
      <div className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <div className="space-y-6">
          <PageHero
            badge="Premium passport"
            title="Unlock the full Tourism Truth route map."
            description="The premium layer is structured for a future real payment flow, but it already behaves like a launch-ready subscription state for your profile and destination access."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="rounded-[28px] p-5">
              <Crown className="mb-3 size-5 text-gold" />
              <p className="text-sm font-semibold text-cream">Destination unlocks</p>
              <p className="mt-2 text-sm text-cream/68">Binondo, Ilocos, and Boracay open immediately.</p>
            </Card>
            <Card className="rounded-[28px] p-5">
              <Sparkles className="mb-3 size-5 text-blush" />
              <p className="text-sm font-semibold text-cream">Profile persistence</p>
              <p className="mt-2 text-sm text-cream/68">Your premium status is stored in Supabase.</p>
            </Card>
            <Card className="rounded-[28px] p-5">
              <Star className="mb-3 size-5 text-azure" />
              <p className="text-sm font-semibold text-cream">Future payment slot</p>
              <p className="mt-2 text-sm text-cream/68">The flow is ready for Stripe integration later.</p>
            </Card>
          </div>
        </div>

        <Card className="rounded-[34px] p-6">
          <Badge>{profile?.isPremium ? 'Premium active' : 'Upgrade now'}</Badge>
          <h2 className="mt-4 font-display text-4xl text-cream">
            {profile?.isPremium ? 'Your premium pass is active.' : 'Move beyond the free route.'}
          </h2>
          <div className="mt-6 space-y-4">
            {['Access all four destinations', 'Keep premium state on your profile', 'Prepare for future paid subscriptions'].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full bg-gold/15 p-1 text-gold">
                  <Check className="size-4" />
                </div>
                <p className="text-sm leading-7 text-cream/68">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            {profile?.isPremium ? (
              <Link to="/app/destinations" className={buttonStyles({ size: 'lg' })}>
                Continue exploring
              </Link>
            ) : (
              <Button size="lg" onClick={() => void handleUpgrade()}>
                Upgrade to Premium
              </Button>
            )}
            <Link to="/app" className={buttonStyles({ variant: 'secondary', size: 'lg' })}>
              Back to dashboard
            </Link>
          </div>
        </Card>
      </div>
    </PageTransition>
  )
}
