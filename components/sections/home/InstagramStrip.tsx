import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { instagramStrip } from '@/content/copy'

export function InstagramStrip() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <div className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <RevealOnScroll>
          <h2 className="font-display font-light text-3xl" style={{ color: 'var(--color-ink)' }}>
            {instagramStrip.handle}
          </h2>
          <p
            className="font-sans text-sm mt-1"
            style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
          >
            {instagramStrip.followerCount} followers
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <a
            href="https://instagram.com/sootheandscratch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm transition-colors"
            style={{ color: 'color-mix(in srgb, var(--color-ink) 50%, transparent)' }}
          >
            Follow
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </RevealOnScroll>
      </div>

      {/* TODO: Wire to live IG API when ready */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {instagramStrip.images.map((img, i) => (
          <RevealOnScroll
            key={img.src}
            delay={i * 0.06}
            className="aspect-square relative overflow-hidden rounded-lg group"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div
              className="absolute inset-0 transition-colors duration-500 group-hover:opacity-100 opacity-0"
              style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 15%, transparent)' }}
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
