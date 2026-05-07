import type { Metadata } from 'next'
import { TableOfContents } from '@/components/sections/policies/TableOfContents'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { policies } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Soothe and Scratch policies: women-only service, cancellation, hygiene and safety, and privacy.',
}

export default function PoliciesPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <RevealOnScroll className="mb-16">
        <h1 className="font-display font-light text-5xl lg:text-6xl text-ink tracking-tight">Policies</h1>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 items-start">
        <TableOfContents />

        <div className="max-w-prose flex flex-col gap-16">
          {policies.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <RevealOnScroll delay={i * 0.04}>
                <h2 className="font-display font-light text-3xl text-ink mb-6">{section.title}</h2>
                {Array.isArray(section.body) ? (
                  <ul className="flex flex-col gap-3">
                    {section.body.map((item, j) => (
                      <li key={j} className="font-sans text-base text-ink/70 leading-relaxed flex gap-3">
                        <span className="text-rose flex-shrink-0 mt-1">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-sans text-base text-ink/70 leading-relaxed">{section.body}</p>
                )}
              </RevealOnScroll>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
