import { marqueeItems } from '@/content/copy'

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <section
      className="py-6 overflow-hidden"
      style={{ borderTop: '1px solid color-mix(in srgb, var(--color-ink) 8%, transparent)', borderBottom: '1px solid color-mix(in srgb, var(--color-ink) 8%, transparent)' }}
      aria-label="Keywords"
    >
      <div
        className="marquee-track flex gap-12 whitespace-nowrap"
        aria-hidden="true"
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display font-light text-2xl tracking-[0.06em] select-none"
            style={{ color: 'color-mix(in srgb, var(--color-ink) 40%, transparent)' }}
          >
            {item}{' '}
            <span style={{ color: 'var(--color-rose)', margin: '0 0.5rem' }}>·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
