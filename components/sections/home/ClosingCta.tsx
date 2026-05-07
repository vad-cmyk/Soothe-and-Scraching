import Link from 'next/link'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { closingCta } from '@/content/copy'

export function ClosingCta() {
  return (
    <section
      className="py-36 px-6 lg:px-12 text-center"
      style={{ backgroundColor: 'color-mix(in srgb, var(--color-rose) 20%, var(--color-bg))' }}
    >
      <RevealOnScroll>
        <h2
          className="font-display font-light text-5xl lg:text-7xl tracking-tight leading-tight mb-10"
          style={{ color: 'var(--color-ink)' }}
        >
          {closingCta.heading}
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <MagneticButton className="inline-block">
          <Link
            href={closingCta.cta.href}
            className="font-sans text-base px-10 py-4 rounded-full hover:opacity-85 focus-visible:ring-2 transition-opacity duration-300"
            style={{
              backgroundColor: 'var(--color-ink)',
              color: 'var(--color-bg)',
              outlineColor: 'var(--color-gold)',
            }}
          >
            {closingCta.cta.label}
          </Link>
        </MagneticButton>
      </RevealOnScroll>
    </section>
  )
}
