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
  twitter: { card: 'summary_large_image' },
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Soothe and Scratch',
  description: 'Mobile ASMR sessions for women in London and surrounding areas.',
  url: 'https://sootheandscratch.co.uk',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    addressCountry: 'GB',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    geoRadius: '30000',
  },
  priceRange: '££',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
  sameAs: ['https://instagram.com/sootheandscratch'],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
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
