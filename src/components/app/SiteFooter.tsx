import { Link } from 'react-router-dom'

import { legalMeta } from '@/data/legal'
import { cn } from '@/lib/utils'

interface SiteFooterProps {
  className?: string
}

export function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        'mt-8 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(44,34,41,0.78),rgba(32,24,31,0.64))] px-4 py-5 text-sm text-cream/68 backdrop-blur-xl sm:px-5',
        className,
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-2xl leading-7">
          {legalMeta.companyName} is a travel-themed web app for place-based truths, dares, and saved gameplay
          sessions.
        </p>
        <nav aria-label="Legal" className="flex flex-wrap items-center gap-3 sm:justify-end">
          <Link className="interactive-outline rounded-full px-3 py-2 text-cream/78 transition hover:bg-white/8 hover:text-cream" to="/legal/privacy">
            Privacy Policy
          </Link>
          <Link className="interactive-outline rounded-full px-3 py-2 text-cream/78 transition hover:bg-white/8 hover:text-cream" to="/legal/terms">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  )
}

