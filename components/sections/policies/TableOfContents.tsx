'use client'

import { useState, useEffect } from 'react'
import { policies } from '@/content/copy'

export function TableOfContents() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    policies.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="hidden lg:block sticky top-28 self-start" aria-label="Page sections">
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/30 mb-4">Contents</p>
      <ol className="flex flex-col gap-3">
        {policies.sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`font-sans text-sm transition-colors duration-200 ${
                active === section.id ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
