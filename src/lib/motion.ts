import type { Transition, Variants } from 'framer-motion'

export const luxuryEase = [0.24, 0.62, 0.28, 0.96] as const

export const luxuryTransition: Transition = {
  duration: 0.62,
  ease: luxuryEase,
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
}

export const fadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: luxuryTransition,
  },
}

export const softScaleItem: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.975,
    y: 14,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: luxuryTransition,
  },
}
