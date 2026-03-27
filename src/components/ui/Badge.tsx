import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex min-h-[2.125rem] items-center rounded-full border border-white/78 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(232,241,248,0.44))] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cocoa shadow-[0_12px_28px_rgba(86,116,146,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}
