import { Crown, Sparkles, Star } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'

interface PremiumModalProps {
  open: boolean
  onClose: () => void
  onUpgrade: () => Promise<void>
  loading?: boolean
}

export function PremiumModal({ open, onClose, onUpgrade, loading = false }: PremiumModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Upgrade your passport"
      description="Open Binondo, Ilocos, and Boracay with a more elevated route map, instant profile unlocks, and a premium layer that is already structured for billing later."
    >
      <div className="space-y-4">
        <div className="rounded-[28px] border border-gold/16 bg-[linear-gradient(180deg,rgba(229,195,154,0.08),rgba(255,248,245,0.04))] p-5">
          <p className="text-[11px] uppercase tracking-[0.22em] text-gold/82">Exclusive destinations</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {['Binondo', 'Ilocos', 'Boracay'].map((route) => (
              <div key={route} className="rounded-[22px] border border-gold/14 bg-gold/8 px-4 py-3 text-sm font-semibold text-gold">
                {route}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <Card className="rounded-3xl p-4">
            <Crown className="mb-3 size-5 text-gold" />
            <p className="text-sm font-semibold text-cream">3 aspirational routes</p>
            <p className="mt-1 text-sm leading-6 text-cream/68">
              Move beyond Intramuros with destination-specific experiences that unlock instantly.
            </p>
          </Card>
          <Card className="rounded-3xl p-4">
            <Sparkles className="mb-3 size-5 text-blush" />
            <p className="text-sm font-semibold text-cream">Place-aware premium flow</p>
            <p className="mt-1 text-sm leading-6 text-cream/68">
              The same polished truth-or-dare journey extends across every premium route.
            </p>
          </Card>
          <Card className="rounded-3xl p-4">
            <Star className="mb-3 size-5 text-azure" />
            <p className="text-sm font-semibold text-cream">Instant profile unlock</p>
            <p className="mt-1 text-sm leading-6 text-cream/68">
              Your `is_premium` flag updates immediately so the UI unlocks in place.
            </p>
          </Card>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="flex-1" loading={loading} onClick={() => void onUpgrade()}>
            Upgrade to Premium
          </Button>
          <Button variant="secondary" className="flex-1" onClick={onClose}>
            Stay on Free Plan
          </Button>
        </div>
      </div>
    </Modal>
  )
}
