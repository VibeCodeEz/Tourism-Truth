import type { Transition, Variants } from 'framer-motion'

export const luxuryEase = [0.2, 0.65, 0.3, 0.9] as const

export const luxuryTransition: Transition = {
  duration: 0.55,
  ease: luxuryEase,
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
}

export const fadeUpItem: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: 'blur(10px)',
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
    scale: 0.96,
    y: 18,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: luxuryTransition,
  },
}
