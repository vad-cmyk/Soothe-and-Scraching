'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/content/copy'

export function StickyPanel() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-service]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-service'))
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const activeService = services.items.find((s) => s.id === active)

  return (
    <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none" aria-hidden="true">
      <AnimatePresence mode="wait">
        {activeService && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-ink/30 [writing-mode:vertical-rl] rotate-180">
              {activeService.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
