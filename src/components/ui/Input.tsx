import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  hint?: string
  isValid?: boolean
  endAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, hint, isValid = false, endAdornment, disabled, id, ...props },
  ref,
) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          ref={ref}
          id={id}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          aria-errormessage={error && id ? `${id}-error` : undefined}
          className={cn(
            'interactive-outline h-12 w-full rounded-[22px] border border-white/14 bg-[linear-gradient(180deg,rgba(50,38,46,0.84),rgba(39,29,37,0.76))] px-4 text-sm text-cream shadow-[0_14px_30px_rgba(20,12,18,0.12),inset_0_1px_0_rgba(255,248,245,0.1)] outline-none transition placeholder:text-cream/48 hover:border-white/20 hover:bg-[linear-gradient(180deg,rgba(56,42,52,0.88),rgba(43,33,41,0.78))] focus:border-blush/70 focus:bg-[linear-gradient(180deg,rgba(58,43,54,0.92),rgba(45,34,43,0.8))] focus-visible:ring-blush/16 disabled:cursor-not-allowed disabled:border-white/8 disabled:bg-[linear-gradient(180deg,rgba(39,30,36,0.72),rgba(31,24,30,0.64))] disabled:text-cream/46 disabled:placeholder:text-cream/28',
            endAdornment ? 'pr-12' : '',
            error ? 'border-rose-400/72 focus:border-rose-300 focus-visible:ring-rose-300/12' : '',
            !error && isValid ? 'border-emerald-300/40 bg-[linear-gradient(180deg,rgba(50,61,56,0.7),rgba(39,45,42,0.64))] focus:border-emerald-300/50 focus-visible:ring-emerald-300/12' : '',
            className,
          )}
          {...props}
        />
        {endAdornment ? <div className="absolute inset-y-0 right-3 flex items-center">{endAdornment}</div> : null}
      </div>
      {hint && !error ? (
        <p id={id ? `${id}-hint` : undefined} className="text-sm text-cream/58">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="text-sm text-rose-100">
          {error}
        </p>
      ) : null}
    </div>
  )
})
