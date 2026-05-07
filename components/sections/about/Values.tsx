'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { about } from '@/content/copy'

export function Values() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />
      <RevealOnScroll className="mt-16 mb-12">
        <h2 className="font-display font-light text-4xl text-ink tracking-tight">How we work</h2>
      </RevealOnScroll>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink/10">
        {about.values.map((value, i) => (
          <button
            key={value.name}
            className="text-left p-8 group focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
            onClick={() => setActive(active === i ? null : i)}
            aria-expanded={active === i}
          >
            <RevealOnScroll delay={i * 0.1}>
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/30 mb-4">0{i + 1}</p>
              <h3 className="font-display font-light text-3xl text-ink mb-4 group-hover:text-rose transition-colors duration-300">
                {value.name}
              </h3>
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sans text-sm text-ink/60 leading-relaxed overflow-hidden"
                  >
                    {value.description}
                  </motion.p>
                )}
              </AnimatePresence>
              {active !== i && (
                <span className="font-sans text-xs text-ink/30 group-hover:text-ink/50 transition-colors">
                  Read more
                </span>
              )}
            </RevealOnScroll>
          </button>
        ))}
      </div>
    </section>
  )
}
