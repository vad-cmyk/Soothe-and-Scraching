import Image from 'next/image'
import { about } from '@/content/copy'

export function AboutHero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <Image
        src="/images/about-portrait.jpg"
        alt={about.heroAlt}
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)' }}
      />
    </div>
  )
}
