import type { Variants } from 'framer-motion'

export const ease = {
  spring: [0.22, 1, 0.36, 1] as [number, number, number, number],
  out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
}

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  slower: 1.4,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.spring },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.spring },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.spring },
  },
}

export const slideUp: Variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.6, ease: ease.spring } },
  exit: { y: '-100%', transition: { duration: 0.4, ease: ease.out } },
}
