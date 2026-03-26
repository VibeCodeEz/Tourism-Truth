import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren, ReactNode } from 'react'

import { Badge } from '@/components/ui/Badge'
import { luxuryEase } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface PageHeroProps extends PropsWithChildren {
  badge?: string
  title: string
  description: string
  actions?: ReactNode
  className?: string
}

export function PageHero({ badge, title, description, actions, children, className }: PageHeroProps) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      className={cn('relative overflow-hidden rounded-[34px] p-5 sm:rounded-[38px] sm:p-6 md:p-8 lg:p-10', className)}
      initial={reduceMotion ? false : { opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.52, ease: luxuryEase }}
    >
      <div className="glass-panel-strong hero-wash absolute inset-0 rounded-[34px] sm:rounded-[38px]" />
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-white/0 via-white/30 to-white/0 sm:inset-x-10" />
      <div className="relative flex flex-col gap-5 sm:gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-4 sm:space-y-5">
          {badge ? <Badge className="border-blush/30 bg-blush/12 text-mist">{badge}</Badge> : null}
          <div className="space-y-3 sm:space-y-4">
            <h1 className="font-display text-[2rem] leading-[0.94] text-cream sm:text-5xl lg:text-6xl">{title}</h1>
            <p className="max-w-2xl text-sm leading-7 text-cream/76 sm:text-base sm:leading-8">{description}</p>
          </div>
          {children}
        </div>
        {actions ? <div className="flex shrink-0 flex-col gap-3 sm:flex-row">{actions}</div> : null}
      </div>
    </motion.section>
  )
}
