import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { Marquee } from '@/components/sections/home/Marquee'
import { WhatIsAsmr } from '@/components/sections/home/WhatIsAsmr'
import { ServicesPreview } from '@/components/sections/home/ServicesPreview'
import { ExperienceTeaser } from '@/components/sections/home/ExperienceTeaser'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { InstagramStrip } from '@/components/sections/home/InstagramStrip'
import { ClosingCta } from '@/components/sections/home/ClosingCta'

export const metadata: Metadata = {
  title: 'Soothe and Scratch — Mobile ASMR · London',
  description: 'Mobile ASMR sessions for women in London. Scalp care, light touch, and deeply calming sessions brought to your door by Elizabeth.',
  openGraph: {
    title: 'Soothe and Scratch — Mobile ASMR · London',
    description: 'Mobile ASMR sessions for women in London and surrounding areas.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhatIsAsmr />
      <ServicesPreview />
      <ExperienceTeaser />
      <Testimonials />
      <InstagramStrip />
      <ClosingCta />
    </>
  )
}
