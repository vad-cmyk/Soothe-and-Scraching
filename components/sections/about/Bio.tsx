import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { about } from '@/content/copy'

export function Bio() {
  return (
    <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto">
      {about.bio.map((para, i) => (
        <RevealOnScroll key={para.slice(0, 24)} delay={i * 0.1}>
          <p
            className={`font-sans text-base text-ink/75 leading-[1.85] mb-6 ${
              i === 0
                ? 'first-letter:font-display first-letter:text-6xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                : ''
            }`}
          >
            {para}
          </p>
        </RevealOnScroll>
      ))}
    </section>
  )
}
