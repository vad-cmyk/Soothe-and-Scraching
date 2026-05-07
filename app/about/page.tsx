import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { Bio } from '@/components/sections/about/Bio'
import { AsmrDeepDive } from '@/components/sections/about/AsmrDeepDive'
import { Values } from '@/components/sections/about/Values'
import { ClosingCta } from '@/components/sections/home/ClosingCta'

export const metadata: Metadata = {
  title: 'About Elizabeth',
  description: 'Meet Elizabeth, mobile ASMR practitioner based in South London. Learn about ASMR, the research behind it, and how Soothe and Scratch works.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Bio />
      <AsmrDeepDive />
      <Values />
      <ClosingCta />
    </>
  )
}
