import type { Metadata } from 'next'
import Link from 'next/link'
import { PinnedScroll } from '@/components/sections/experience/PinnedScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { experience } from '@/content/copy'

export const metadata: Metadata = {
  title: 'The Experience',
  description: 'See exactly how a Soothe and Scratch mobile ASMR session works — from enquiry through to rest.',
}

export default function ExperiencePage() {
  return (
    <>
      <div className="pt-32 pb-12 px-8 lg:px-20 bg-ink">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4">How it works</p>
        <h1 className="font-display font-light text-6xl lg:text-8xl text-bg tracking-tight">
          A session, from start to rest.
        </h1>
        <p className="font-sans text-sm text-bg/40 mt-6">Scroll to follow along.</p>
      </div>

      <PinnedScroll />

      <div className="py-32 px-8 text-center bg-bg">
        <p className="font-display font-light text-4xl lg:text-5xl text-ink mb-10">
          {experience.cta.label}
        </p>
        <MagneticButton className="inline-block">
          <Link
            href={experience.cta.href}
            className="font-sans text-sm bg-ink text-bg px-10 py-4 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
          >
            Enquire
          </Link>
        </MagneticButton>
      </div>
    </>
  )
}
