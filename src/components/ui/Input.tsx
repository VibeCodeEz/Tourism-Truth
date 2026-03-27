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
            'interactive-outline h-12 w-full rounded-[22px] border border-white/76 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(232,241,248,0.64))] px-4 text-sm text-cocoa shadow-[0_14px_28px_rgba(86,116,146,0.12),inset_0_1px_0_rgba(255,255,255,0.92)] outline-none transition-[background-color,border-color,box-shadow,color] placeholder:text-cocoa/48 hover:border-white/88 hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,244,250,0.72))] focus:border-midnight/44 focus:bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(238,245,251,0.78))] focus-visible:ring-midnight/12 disabled:cursor-not-allowed disabled:border-white/52 disabled:bg-[linear-gradient(180deg,rgba(255,255,255,0.56),rgba(235,244,250,0.26))] disabled:text-cocoa/38 disabled:placeholder:text-cocoa/26',
            endAdornment ? 'pr-12' : '',
            error ? 'border-plum/56 bg-[linear-gradient(180deg,rgba(255,255,255,0.8),rgba(230,236,244,0.3))] focus:border-plum/68 focus-visible:ring-plum/14' : '',
            !error && isValid ? 'border-royal/44 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(215,231,245,0.28))] focus:border-royal/54 focus-visible:ring-royal/14' : '',
            className,
          )}
          {...props}
        />
        {endAdornment ? <div className="absolute inset-y-0 right-3 flex items-center">{endAdornment}</div> : null}
      </div>
      {hint && !error ? (
        <p id={id ? `${id}-hint` : undefined} className="text-sm text-cocoa/58">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={id ? `${id}-error` : undefined} className="text-sm text-plum">
          {error}
        </p>
      ) : null}
    </div>
  )
})
