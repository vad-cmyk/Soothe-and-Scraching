import Image from 'next/image'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { whatIsAsmr } from '@/content/copy'

export function WhatIsAsmr() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">

        {/* Text */}
        <div>
          <RevealOnScroll>
            <p
              className="font-sans text-xs uppercase tracking-[0.15em] mb-6"
              style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
            >
              About ASMR
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-display font-light text-4xl lg:text-5xl leading-tight tracking-tight mb-8"
                style={{ color: 'var(--color-ink)' }}>
              {whatIsAsmr.heading}
            </h2>
          </RevealOnScroll>

          {whatIsAsmr.body.map((para, i) => (
            <RevealOnScroll key={i} delay={0.15 + i * 0.08}>
              <p className="font-sans text-base leading-[1.8] mb-6"
                 style={{ color: 'color-mix(in srgb, var(--color-ink) 70%, transparent)' }}>
                {para}
              </p>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={0.3}>
            <blockquote
              className="mt-12 pl-6"
              style={{ borderLeft: '2px solid var(--color-rose)' }}
            >
              <p className="font-display font-light text-2xl lg:text-3xl leading-snug italic"
                 style={{ color: 'var(--color-ink)' }}>
                {whatIsAsmr.pullQuote}
              </p>
              <cite
                className="font-sans text-sm mt-3 block not-italic tracking-wide"
                style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
              >
                {whatIsAsmr.pullQuoteAttribution}
              </cite>
            </blockquote>
          </RevealOnScroll>
        </div>

        {/* Photo */}
        <RevealOnScroll
          className="relative aspect-[3/4] lg:aspect-auto rounded-2xl overflow-hidden"
          delay={0.2}
        >
          <Image
            src="/images/asmr-editorial.jpg"
            alt={whatIsAsmr.photoAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(42,31,45,0.25) 0%, transparent 60%)' }}
          />
        </RevealOnScroll>

      </div>
    </section>
  )
}
