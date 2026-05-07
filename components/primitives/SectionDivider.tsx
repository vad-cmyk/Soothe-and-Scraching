'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="w-full overflow-hidden py-2" aria-hidden="true">
      <motion.div
        className="h-px"
        style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 10%, transparent)' }}
        initial={{ scaleX: prefersReduced ? 1 : 0, originX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
