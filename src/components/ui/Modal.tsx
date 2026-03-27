import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { PropsWithChildren } from 'react'

import { cn } from '@/lib/utils'
import { luxuryEase } from '@/lib/motion'

interface ModalProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  className?: string
}

export function Modal({ open, onClose, title, description, className, children }: ModalProps) {
  const titleId = useId()
  const descriptionId = useId()
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const frameId = window.requestAnimationFrame(() => {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      const firstFocusable = focusableElements?.[0] ?? closeButtonRef.current ?? dialogRef.current
      firstFocusable?.focus()
    })

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) {
        return
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('hidden') && element.offsetParent !== null)

      if (focusableElements.length === 0) {
        event.preventDefault()
        dialogRef.current.focus()
        return
      }

      const firstFocusable = focusableElements[0]
      const lastFocusable = focusableElements[focusableElements.length - 1]
      const activeElement = document.activeElement

      if (!event.shiftKey && activeElement === lastFocusable) {
        event.preventDefault()
        firstFocusable.focus()
      }

      if (event.shiftKey && activeElement === firstFocusable) {
        event.preventDefault()
        lastFocusable.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end bg-[rgba(208,230,248,0.48)] p-4 backdrop-blur-xl md:items-center md:justify-center"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: luxuryEase }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              'glass-panel-strong panel-grid w-full max-w-xl rounded-[36px] p-6 shadow-[0_28px_80px_rgba(102,148,192,0.24)] md:p-7',
              className,
            )}
            initial={reduceMotion ? false : { y: 36, opacity: 0, scale: 0.97 }}
            animate={reduceMotion ? undefined : { y: 0, opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { y: 20, opacity: 0, scale: 0.985 }}
            transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="space-y-2">
                <h2 id={titleId} className="font-display text-3xl font-semibold text-cream">
                  {title}
                </h2>
                {description ? (
                  <p id={descriptionId} className="text-sm leading-7 text-cream/82">
                    {description}
                  </p>
                ) : null}
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="interactive-outline rounded-full border border-white/56 bg-white/32 p-2 text-cocoa/70 transition hover:bg-white/52 hover:text-cocoa"
                aria-label="Close modal"
              >
                <X className="size-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
