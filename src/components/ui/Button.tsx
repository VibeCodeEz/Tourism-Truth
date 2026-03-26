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
    'border border-white/24 bg-[linear-gradient(135deg,rgba(241,214,223,0.96)_0%,rgba(230,194,162,0.94)_58%,rgba(251,239,233,0.97)_100%)] text-cocoa shadow-[0_18px_40px_rgba(229,195,154,0.15),inset_0_1px_0_rgba(255,255,255,0.4)] hover:-translate-y-0.5 hover:brightness-105',
  secondary:
    'border border-white/12 bg-[linear-gradient(180deg,rgba(58,44,53,0.88),rgba(43,33,41,0.76))] text-cream shadow-[0_16px_34px_rgba(20,12,18,0.18),inset_0_1px_0_rgba(255,248,245,0.1)] hover:-translate-y-0.5 hover:bg-[linear-gradient(180deg,rgba(64,49,59,0.92),rgba(48,36,45,0.8))]',
  ghost:
    'bg-transparent text-cream/82 hover:bg-white/10 hover:text-cream',
  outline:
    'border border-white/14 bg-transparent text-cream shadow-[inset_0_1px_0_rgba(255,248,245,0.05)] hover:-translate-y-0.5 hover:bg-white/8',
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
    'interactive-outline inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-60',
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
