'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { wordReveal, staggerContainer } from '@/lib/motion'

interface Props {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

export function SplitText({ text, className, as: Tag = 'h1' }: Props) {
  const ref = useRef<HTMLHeadingElement | HTMLParagraphElement | null>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p }
  const MotionTag = tags[Tag]

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      variants={staggerContainer}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span className="inline-block" variants={wordReveal}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
