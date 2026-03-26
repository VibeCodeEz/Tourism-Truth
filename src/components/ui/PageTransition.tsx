import { motion, useReducedMotion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { luxuryEase } from '@/lib/motion'

export function PageTransition({ children }: PropsWithChildren) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26, scale: 0.985, filter: 'blur(10px)' }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={reduceMotion ? undefined : { opacity: 0, y: -20, scale: 0.992, filter: 'blur(8px)' }}
      transition={{ duration: 0.56, ease: luxuryEase }}
    >
      {children}
    </motion.div>
  )
}
