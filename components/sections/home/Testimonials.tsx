'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { testimonials } from '@/content/copy'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className="py-24 lg:py-36"
      style={{ backgroundColor: 'var(--color-ink)' }}
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p
          className="font-sans text-xs uppercase tracking-[0.15em] mb-12"
          style={{ color: 'color-mix(in srgb, var(--color-bg) 30%, transparent)' }}
        >
          What clients say
        </p>

        <div className="relative min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full"
            >
              <blockquote>
                <p
                  className="font-display font-light text-2xl lg:text-3xl leading-snug italic mb-6"
                  style={{ color: 'var(--color-bg)' }}
                >
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <cite
                  className="font-sans text-sm not-italic tracking-widest uppercase"
                  style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}
                >
                  {testimonials[current].attribution}
                </cite>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav dots */}
        <div
          className="flex justify-center gap-3 mt-12"
          role="tablist"
          aria-label="Testimonials navigation"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setCurrent(i)}
              className="h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2"
              style={{
                width: i === current ? '1.5rem' : '0.375rem',
                backgroundColor:
                  i === current
                    ? 'var(--color-rose)'
                    : 'color-mix(in srgb, var(--color-bg) 20%, transparent)',
                outlineColor: 'var(--color-gold)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
