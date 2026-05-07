'use client'

import Image from 'next/image'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { CountUp } from '@/components/primitives/CountUp'

type Service = {
  id: string
  name: string
  duration: string
  price: number
  description: string
  includes: string[]
  image: string
  imageAlt: string
}

interface Props {
  service: Service
  index: number
}

export function ServiceBlock({ service, index }: Props) {
  const isEven = index % 2 === 0

  return (
    <section
      id={service.id}
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
      data-service={service.id}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>

        {/* Image */}
        <RevealOnScroll
          className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`}
          delay={0.1}
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(42,31,45,0.3) 0%, transparent 60%)' }}
          />
        </RevealOnScroll>

        {/* Text */}
        <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
          <RevealOnScroll>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40 mb-2">{service.duration}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2 className="font-display font-light text-4xl lg:text-5xl text-ink tracking-tight mb-2">{service.name}</h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.12}>
            <p className="font-display font-light text-2xl text-rose mb-8">
              from £<CountUp target={service.price} />
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.16}>
            <p className="font-sans text-base text-ink/70 leading-relaxed mb-8">{service.description}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.2}>
            <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink/40 mb-4">What&apos;s included</p>
            <ul className="flex flex-col gap-2">
              {service.includes.map((item) => (
                <li key={item} className="font-sans text-sm text-ink/70 flex gap-3">
                  <span className="text-rose flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
