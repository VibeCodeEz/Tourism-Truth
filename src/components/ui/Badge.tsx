import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex min-h-[2.125rem] items-center rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(54,42,50,0.84),rgba(43,33,41,0.72))] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-cream/88 shadow-[inset_0_1px_0_rgba(255,248,245,0.1)]',
        className,
      )}
      {...props}
    />
  )
}
