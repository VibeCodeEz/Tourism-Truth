import { useEffect, useState } from 'react'
import { ArrowRight, Clock3, Compass, Headphones, History, LoaderCircle, MapPinned, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { PageHero } from '@/components/app/PageHero'
import { Badge } from '@/components/ui/Badge'
import { buttonStyles } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { PageTransition } from '@/components/ui/PageTransition'
import { useAuth } from '@/hooks/useAuth'
import type { GameSessionRecord } from '@/types/models'

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function getModeLabel(mode: GameSessionRecord['mode']) {
  if (mode === 'audio-tour') {
    return 'Audio Tour'
  }

  return mode === 'truth' ? 'Truth' : 'Dare'
}

function getModeBadgeClass(mode: GameSessionRecord['mode']) {
  if (mode === 'truth') {
    return 'border-white/52 bg-white/30 text-cocoa'
  }

  if (mode === 'dare') {
    return 'border-white/44 bg-white/22 text-cocoa'
  }

  return 'border-white/48 bg-[linear-gradient(180deg,rgba(255,255,255,0.28),rgba(223,241,255,0.16))] text-cocoa'
}

function getModeIcon(mode: GameSessionRecord['mode']) {
  if (mode === 'audio-tour') {
    return Headphones
  }

  return mode === 'truth' ? Sparkles : Compass
}

export function HistoryPage() {
  const { getGameSessions, profile } = useAuth()
  const [sessions, setSessions] = useState<GameSessionRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true

    async function loadHistory() {
      try {
        const data = await getGameSessions()

        if (active) {
          setSessions(data)
        }
      } catch (error) {
        if (active) {
          toast.error(error instanceof Error ? error.message : 'Unable to load history')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadHistory()

    return () => {
      active = false
    }
  }, [getGameSessions])

  const truthCount = sessions.filter((session) => session.mode === 'truth').length
  const dareCount = sessions.filter((session) => session.mode === 'dare').length
  const audioTourCount = sessions.filter((session) => session.mode === 'audio-tour').length

  return (
    <PageTransition>
      <div className="space-y-6">
        <PageHero
          badge="History"
          title="Your saved route history."
          description="Review previous Tourism Truth rounds, see which places you played, and pick up the route with more context than a blank restart."
          actions={
            <Link to="/app/destinations" className={buttonStyles({ size: 'lg' })}>
              Start another round
              <ArrowRight className="size-4" />
            </Link>
          }
        >
          <div className="grid gap-3 md:grid-cols-3">
            <Card className="card-shell rounded-[26px] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Saved rounds</p>
              <p className="mt-2 font-display text-4xl text-cocoa">{sessions.length}</p>
            </Card>
            <Card className="card-shell rounded-[26px] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Story vs challenge</p>
              <p className="mt-2 text-sm leading-7 text-cocoa/80">
                {truthCount} truth, {dareCount} dare, {audioTourCount} audio tour
              </p>
            </Card>
            <Card className="card-shell rounded-[26px] p-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Account</p>
              <p className="mt-2 text-sm leading-7 text-cocoa/80">{profile?.fullName ?? 'Traveler'}</p>
            </Card>
          </div>
        </PageHero>

        {loading ? (
          <Card className="rounded-[34px] p-6">
            <div className="flex items-center gap-3 text-cocoa">
              <LoaderCircle className="size-5 animate-spin" />
              <p className="text-sm font-semibold">Loading saved history</p>
            </div>
          </Card>
        ) : sessions.length === 0 ? (
          <Card className="rounded-[34px] p-6 sm:p-7">
            <Badge className="border-white/56 bg-white/34 text-cocoa">No saved rounds yet</Badge>
            <h2 className="mt-4 font-display text-4xl text-cocoa">Play one route to start building your history.</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-cocoa/80">
              Finished truth, dare, and audio tour rounds appear here automatically once they are saved to your account.
            </p>
            <div className="mt-6">
              <Link to="/app/destinations" className={buttonStyles({ size: 'lg' })}>
                Choose a destination
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sessions.map((session) => {
              const ModeIcon = getModeIcon(session.mode)

              return (
                <Card key={session.id} className="rounded-[34px] p-6">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className={getModeBadgeClass(session.mode)}>
                          <ModeIcon className="mr-2 size-3.5" />
                          {getModeLabel(session.mode)}
                        </Badge>
                        <Badge className="border-white/44 bg-white/24 text-cocoa/82">
                          <Clock3 className="mr-2 size-3.5" />
                          {dateFormatter.format(new Date(session.createdAt))}
                        </Badge>
                      </div>

                      <div>
                        <h2 className="font-display text-4xl text-cocoa">{session.placeName}</h2>
                        <div className="mt-2 inline-flex items-center gap-2 text-sm text-cocoa/76">
                          <MapPinned className="size-4" />
                          {session.destination}
                        </div>
                      </div>

                      <div className="rounded-[26px] border border-white/28 bg-white/18 p-4">
                        <p className="text-[11px] uppercase tracking-[0.22em] text-cocoa/68">Saved reveal</p>
                        <p className="mt-3 text-sm leading-7 text-cocoa/82">
                          {session.revealedCard ?? 'No reveal text was saved for this round.'}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-[24px] border border-white/24 bg-white/16 p-4 text-cocoa">
                      <History className="size-5" />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </PageTransition>
  )
}
