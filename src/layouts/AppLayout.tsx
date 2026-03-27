import { Crown, LogOut, MapPinned, Sparkles } from 'lucide-react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { AuroraBackdrop } from '@/components/app/AuroraBackdrop'
import { Logo } from '@/components/app/Logo'
import { SiteFooter } from '@/components/app/SiteFooter'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useGameFlow } from '@/hooks/useGameFlow'

export function AppLayout() {
  const navigate = useNavigate()
  const { profile, signOut } = useAuth()
  const { state } = useGameFlow()

  async function handleSignOut() {
    try {
      await signOut()
      navigate('/')
      toast.success('Signed out')
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to sign out')
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <a
        href="#app-content"
        className="interactive-outline absolute left-4 top-4 z-50 -translate-y-16 rounded-full border border-white/60 bg-white/72 px-4 py-2 text-sm text-cocoa transition focus:translate-y-0"
      >
        Skip to content
      </a>
      <AuroraBackdrop />
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <header className="glass-panel-strong sticky top-3 z-30 mb-5 rounded-[24px] px-3 py-3 sm:top-4 sm:mb-6 sm:rounded-[28px] sm:px-4 sm:py-4 md:px-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center justify-between gap-4">
              <Logo />
              <div className="flex items-center gap-2 md:hidden">
                {profile?.isPremium ? <Badge className="border-white/60 bg-white/40 text-cocoa">Premium</Badge> : null}
              </div>
            </div>
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
              <nav aria-label="Primary" className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <NavLink
                  to="/app"
                  end
                  className={({ isActive }) =>
                    `interactive-outline rounded-full border px-3.5 py-2.5 text-sm transition sm:px-4 sm:py-2 ${
                      isActive
                        ? 'border-white/65 bg-white/42 text-cocoa shadow-soft'
                        : 'border-transparent text-cocoa/72 hover:bg-white/24 hover:text-cocoa'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/app/travel-type"
                  className={({ isActive }) =>
                    `interactive-outline rounded-full border px-3.5 py-2.5 text-sm transition sm:px-4 sm:py-2 ${
                      isActive
                        ? 'border-white/65 bg-white/42 text-cocoa shadow-soft'
                        : 'border-transparent text-cocoa/72 hover:bg-white/24 hover:text-cocoa'
                    }`
                  }
                >
                  Travel setup
                </NavLink>
                <NavLink
                  to="/app/destinations"
                  className={({ isActive }) =>
                    `interactive-outline rounded-full border px-3.5 py-2.5 text-sm transition sm:px-4 sm:py-2 ${
                      isActive
                        ? 'border-white/65 bg-white/42 text-cocoa shadow-soft'
                        : 'border-transparent text-cocoa/72 hover:bg-white/24 hover:text-cocoa'
                    }`
                  }
                >
                  Destinations
                </NavLink>
                <NavLink
                  to="/app/history"
                  className={({ isActive }) =>
                    `interactive-outline rounded-full border px-3.5 py-2.5 text-sm transition sm:px-4 sm:py-2 ${
                      isActive
                        ? 'border-white/65 bg-white/42 text-cocoa shadow-soft'
                        : 'border-transparent text-cocoa/72 hover:bg-white/24 hover:text-cocoa'
                    }`
                  }
                >
                  History
                </NavLink>
                <NavLink
                  to="/premium"
                  className={({ isActive }) =>
                    `interactive-outline rounded-full border px-3.5 py-2.5 text-sm transition sm:px-4 sm:py-2 ${
                      isActive
                        ? 'border-white/65 bg-white/42 text-cocoa shadow-soft'
                        : 'border-transparent text-cocoa/72 hover:bg-white/24 hover:text-cocoa'
                    }`
                  }
                >
                  Premium
                </NavLink>
              </nav>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="hidden md:inline-flex">
                  <MapPinned className="mr-2 size-3.5" />
                  {state.destinationKey ?? 'Choose a route'}
                </Badge>
                {profile?.isPremium ? (
                  <Badge className="hidden border-white/60 bg-white/40 text-cocoa md:inline-flex">
                    <Crown className="mr-2 size-3.5" />
                    Premium
                  </Badge>
                ) : null}
                {!profile?.isPremium ? (
                  <Badge className="hidden border-white/56 bg-white/34 text-cocoa sm:inline-flex">
                    <Sparkles className="mr-2 size-3.5" />
                    Intramuros free now
                  </Badge>
                ) : null}
                <Button variant="ghost" size="sm" className="px-3.5 sm:px-4" onClick={() => void handleSignOut()}>
                  <LogOut className="size-4" />
                  Sign out
                </Button>
              </div>
            </div>
          </div>
        </header>
        <main id="app-content" className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
