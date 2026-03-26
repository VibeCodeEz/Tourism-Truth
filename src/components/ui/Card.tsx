import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'glass-panel surface-stroke rounded-[32px] p-6 md:p-7',
        className,
      )}
      {...props}
    />
  )
}
