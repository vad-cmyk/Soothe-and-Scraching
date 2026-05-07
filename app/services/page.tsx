import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceBlock } from '@/components/sections/services/ServiceBlock'
import { StickyPanel } from '@/components/sections/services/StickyPanel'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { services } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Mobile ASMR services in London: Scalp & Hair, Light Touch, Extended, and Combo sessions. From £120.',
  openGraph: {
    title: 'Services & Pricing | Soothe and Scratch',
    description: 'Mobile ASMR services in London from £120. Scalp, light touch, extended, and combo sessions.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function ServicesPage() {
  return (
    <>
      <StickyPanel />
      <div className="pt-32 pb-8 px-6 lg:px-12 max-w-7xl mx-auto">
        <RevealOnScroll>
          <h1 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight mb-6">Services</h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="font-sans text-base text-ink/60 max-w-xl leading-relaxed">{services.intro}</p>
        </RevealOnScroll>
      </div>

      {services.items.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}

      <div className="py-24 text-center px-6">
        <RevealOnScroll>
          <p className="font-display font-light text-3xl text-ink mb-8">Not sure which to choose?</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <MagneticButton className="inline-block">
            <Link
              href="/enquire"
              className="font-sans text-sm bg-ink text-bg px-8 py-3 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
            >
              Enquire — Elizabeth will advise
            </Link>
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </>
  )
}
