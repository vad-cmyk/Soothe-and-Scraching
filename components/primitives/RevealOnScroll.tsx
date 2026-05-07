'use client'

import type { ReactNode } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '@/lib/motion'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function RevealOnScroll({ children, className, delay = 0, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
