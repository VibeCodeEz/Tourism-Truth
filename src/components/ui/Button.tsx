import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { LoaderCircle } from 'lucide-react'

import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'border border-white/24 bg-[linear-gradient(135deg,rgba(35,56,78,0.98)_0%,rgba(49,78,106,0.97)_52%,rgba(76,107,140,0.94)_100%)] text-cream shadow-[0_18px_38px_rgba(39,65,92,0.32),inset_0_1px_0_rgba(255,255,255,0.18)] hover:-translate-y-0.5 hover:border-white/34 hover:bg-[linear-gradient(135deg,rgba(39,61,84,0.99)_0%,rgba(55,84,112,0.98)_52%,rgba(82,113,146,0.95)_100%)] hover:shadow-[0_22px_46px_rgba(39,65,92,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] active:translate-y-0 active:shadow-[0_12px_24px_rgba(39,65,92,0.28),inset_0_1px_0_rgba(255,255,255,0.14)]',
  secondary:
    'border border-white/82 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(226,238,247,0.68))] text-cocoa shadow-[0_16px_34px_rgba(86,116,146,0.16),inset_0_1px_0_rgba(255,255,255,0.92)] hover:-translate-y-0.5 hover:border-white/92 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(230,241,249,0.76))] hover:shadow-[0_20px_40px_rgba(86,116,146,0.2),inset_0_1px_0_rgba(255,255,255,0.96)] active:translate-y-0',
  ghost:
    'bg-transparent text-cocoa/84 hover:bg-white/28 hover:text-cocoa',
  outline:
    'border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.2),rgba(216,231,243,0.12))] text-cocoa shadow-[0_10px_24px_rgba(86,116,146,0.1),inset_0_1px_0_rgba(255,255,255,0.58)] hover:-translate-y-0.5 hover:border-white/86 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.26),rgba(216,231,243,0.16))] active:translate-y-0',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'h-11 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-[3.125rem] px-5 sm:px-6 text-[15px]',
}

export function buttonStyles({
  variant = 'primary',
  size = 'md',
  className,
}: Pick<ButtonProps, 'variant' | 'size' | 'className'> = {}) {
  return cn(
    'interactive-outline inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,border-color,box-shadow,color] duration-200 disabled:pointer-events-none disabled:opacity-60',
    variantClasses[variant],
    sizeClasses[size],
    className,
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={buttonStyles({ variant, size, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <LoaderCircle className="size-4 animate-spin" /> : null}
      {children}
    </button>
  )
})
