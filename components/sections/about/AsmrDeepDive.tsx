import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { CountUp } from '@/components/primitives/CountUp'
import { about } from '@/content/copy'

export function AsmrDeepDive() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-ink text-bg">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-display font-light text-4xl lg:text-5xl text-bg tracking-tight mb-16 max-w-lg">
            What the research says
          </h2>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {about.asmrStats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div>
                <p className="font-display font-light text-7xl lg:text-8xl text-rose leading-none mb-4">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-sans text-base text-bg/70 leading-relaxed mb-2">{stat.label}</p>
                <p className="font-sans text-xs text-bg/30 italic">{stat.source}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
