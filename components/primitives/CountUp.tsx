'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ target, suffix = '', duration = 1.5, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (!inView || prefersReduced) return

    let rafId: number
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration, prefersReduced])

  return (
    <span ref={ref} className={className} aria-label={`${target}${suffix}`}>
      {value}{suffix}
    </span>
  )
}
