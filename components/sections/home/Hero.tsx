'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { SplitText } from '@/components/primitives/SplitText'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { hero } from '@/content/copy'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [1.08, 1.0]
  )
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? ['0%', '0%'] : ['0%', '8%']
  )

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated gradient blob background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(212,165,165,0.18) 0%, transparent 70%)',
          }}
          animate={prefersReduced ? {} : { x: ['0%', '8%', '0%'], y: ['0%', '5%', '0%'] }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[20%] w-[40%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,181,160,0.12) 0%, transparent 70%)',
          }}
          animate={prefersReduced ? {} : { x: ['0%', '-5%', '0%'], y: ['0%', '-8%', '0%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Photo — right half, diagonal clip */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[55%]"
        style={{ scale: imageScale }}
        aria-hidden="true"
      >
        <Image
          src="/images/hero-photo.jpg"
          alt={hero.photoAlt}
          fill
          priority
          className="object-cover"
          style={{ clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          sizes="55vw"
        />
        {/* Left-edge gradient blend */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 30%)',
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Bottom depth overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(42,31,45,0.3) 0%, transparent 50%)',
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </motion.div>

      {/* Text — anchored bottom-left */}
      <motion.div
        className="absolute bottom-12 left-6 lg:left-12 max-w-[52%]"
        style={{ y: textY }}
      >
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.18em] mb-6"
          style={{ color: 'color-mix(in srgb, var(--color-ink) 60%, transparent)' }}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.subhead}
        </motion.p>

        <SplitText
          text={hero.headline}
          as="h1"
          className="font-display font-light text-[10vw] lg:text-[7vw] leading-[1.05] tracking-[-0.02em] mb-10"
        />

        <motion.div
          className="flex flex-wrap gap-4"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton>
            <Link
              href={hero.primaryCta.href}
              className="font-sans text-sm px-7 py-3 rounded-full focus-visible:ring-2 transition-opacity duration-300 hover:opacity-85"
              style={{
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-bg)',
                outlineColor: 'var(--color-gold)',
              }}
            >
              {hero.primaryCta.label}
            </Link>
          </MagneticButton>
          <Link
            href={hero.secondaryCta.href}
            className="font-sans text-sm px-7 py-3 rounded-full focus-visible:ring-2 transition-colors duration-300"
            style={{
              border: '1px solid color-mix(in srgb, var(--color-ink) 30%, transparent)',
              color: 'var(--color-ink)',
              outlineColor: 'var(--color-gold)',
            }}
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <div
          className="w-px h-10"
          style={{ backgroundColor: 'color-mix(in srgb, var(--color-ink) 30%, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
