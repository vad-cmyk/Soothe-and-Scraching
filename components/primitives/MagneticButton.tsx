'use client'

import type { ReactNode } from 'react'
import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.4 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const distX = e.clientX - cx
    const distY = e.clientY - cy
    const radius = Math.max(rect.width, rect.height) * 1.5
    const dist = Math.sqrt(distX ** 2 + distY ** 2)
    if (dist < radius) {
      setOffset({ x: distX * strength, y: distY * strength })
    }
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
