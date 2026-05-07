'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { servicesPreview } from '@/content/copy'

export function ServicesPreview() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <RevealOnScroll className="mt-16 mb-12">
        <h2
          className="font-display font-light text-4xl lg:text-5xl tracking-tight"
          style={{ color: 'var(--color-ink)' }}
        >
          Services
        </h2>
      </RevealOnScroll>

      <div
        className="flex flex-col"
        style={{ borderTop: '1px solid color-mix(in srgb, var(--color-ink) 8%, transparent)' }}
      >
        {servicesPreview.map((service, i) => (
          <Link
            key={service.name}
            href={service.href}
            className="group block focus-visible:ring-2 focus-visible:ring-offset-4 rounded-sm"
            style={{ borderBottom: '1px solid color-mix(in srgb, var(--color-ink) 8%, transparent)', outlineColor: 'var(--color-gold)' }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-0 overflow-hidden py-2">

              {/* Image — expands on hover */}
              <motion.div
                className="relative flex-shrink-0 overflow-hidden rounded-lg h-28"
                animate={{
                  width: hovered === i ? '40%' : hovered !== null ? '15%' : '22%',
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40vw"
                  aria-hidden="true"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className="flex-1 px-8 flex items-center justify-between"
                animate={{ opacity: hovered !== null && hovered !== i ? 0.4 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <p
                    className="font-sans text-xs uppercase tracking-[0.15em] mb-1"
                    style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
                  >
                    {service.duration}
                  </p>
                  <h3
                    className="font-display font-light text-3xl tracking-tight"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {service.name}
                  </h3>
                  <p
                    className="font-sans text-sm mt-2 max-w-md leading-relaxed"
                    style={{ color: 'color-mix(in srgb, var(--color-ink) 60%, transparent)' }}
                  >
                    {service.tagline}
                  </p>
                </div>

                <motion.div
                  animate={{ x: hovered === i ? 0 : -8, opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <ArrowRight style={{ color: 'var(--color-ink)' }} size={20} />
                </motion.div>
              </motion.div>
            </div>
          </Link>
        ))}
      </div>

      <RevealOnScroll className="mt-8" delay={0.1}>
        <Link
          href="/services"
          className="font-sans text-sm hover:opacity-100 transition-opacity underline underline-offset-4"
          style={{ color: 'color-mix(in srgb, var(--color-ink) 50%, transparent)' }}
        >
          View all services &amp; pricing
        </Link>
      </RevealOnScroll>
    </section>
  )
}
