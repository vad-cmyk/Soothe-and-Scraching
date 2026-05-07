'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { experienceTeaser } from '@/content/copy'

export function ExperienceTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* Left: heading + CTA */}
        <div>
          <motion.p
            className="font-sans text-xs uppercase tracking-[0.15em] mb-4"
            style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.p>

          <motion.h2
            className="font-display font-light text-4xl lg:text-5xl tracking-tight mb-8"
            style={{ color: 'var(--color-ink)' }}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {experienceTeaser.heading}
          </motion.h2>

          <MagneticButton>
            <Link
              href={experienceTeaser.cta.href}
              className="inline-flex items-center gap-2 font-sans text-sm transition-colors group"
              style={{ color: 'color-mix(in srgb, var(--color-ink) 60%, transparent)' }}
            >
              {experienceTeaser.cta.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>

        {/* Right: steps with animated connecting line */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute left-4 top-6 bottom-6 w-px origin-top"
            style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 10%, transparent)' }}
            initial={prefersReduced ? { scaleY: 1 } : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            aria-hidden="true"
          />

          <ol className="flex flex-col gap-10">
            {experienceTeaser.steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="flex gap-8 items-start"
                initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.12 }}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center z-10"
                  style={{
                    borderColor: 'var(--color-rose)',
                    backgroundColor: 'var(--color-bg)',
                  }}
                >
                  <span
                    className="font-sans text-xs"
                    style={{ color: 'var(--color-rose)' }}
                  >
                    {step.number}
                  </span>
                </div>
                <div>
                  <p className="font-display font-light text-xl mb-1"
                     style={{ color: 'var(--color-ink)' }}>
                    {step.label}
                  </p>
                  <p className="font-sans text-sm leading-relaxed"
                     style={{ color: 'color-mix(in srgb, var(--color-ink) 60%, transparent)' }}>
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}
