'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export function Cursor() {
  const prefersReduced = useReducedMotion()
  const [isPointer, setIsPointer] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28 })

  useEffect(() => {
    setMounted(true)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label')
      setIsPointer(!!isInteractive)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', checkPointer)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkPointer)
    }
  }, [mouseX, mouseY])

  if (!mounted || prefersReduced) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '50%',
      }}
      animate={{
        width: isPointer ? 48 : 12,
        height: isPointer ? 48 : 12,
        backgroundColor: isPointer ? 'var(--color-rose)' : 'var(--color-ink)',
        opacity: 0.7,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden
    />
  )
}
