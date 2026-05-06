# Soothe and Scratch — Plan C: Experience Page + Journal + Polish + SEO

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Experience page (GSAP pinned scroll story), Journal stub, then complete the polish pass (reduced-motion, accessibility, Lighthouse) and SEO layer (metadata, JSON-LD, sitemap).

**Architecture:** The Experience page uses GSAP ScrollTrigger to pin a container while five scenes advance on scroll. GSAP is loaded client-side only via dynamic import to avoid SSR. Each scene is a separate component. The audio toggle persists state in localStorage. All remaining pages follow patterns from Plans A and B.

**Tech Stack:** GSAP + ScrollTrigger, Framer Motion, Lenis, next-sitemap, Next.js Metadata API, JSON-LD.

**Prerequisites:** Plans A and B complete. All primitives, layout, pages, and email API are in place.

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/experience/page.tsx` | Experience page — imports pinned scroll + CTA |
| `components/sections/experience/PinnedScroll.tsx` | GSAP ScrollTrigger container + scene manager |
| `components/sections/experience/scenes/SceneEnquire.tsx` | Scene 1 |
| `components/sections/experience/scenes/SceneConfirm.tsx` | Scene 2 |
| `components/sections/experience/scenes/SceneArrive.tsx` | Scene 3 |
| `components/sections/experience/scenes/SceneSession.tsx` | Scene 4 — includes audio toggle |
| `components/sections/experience/scenes/SceneRest.tsx` | Scene 5 |
| `components/sections/experience/ProgressIndicator.tsx` | Side dots + line |
| `components/sections/experience/AudioToggle.tsx` | Audio toggle with localStorage persistence |
| `components/sections/experience/ReducedMotionFallback.tsx` | Static stack for prefers-reduced-motion |
| `app/journal/page.tsx` | Journal stub — editorial 3-column index |
| `app/layout.tsx` | Add JSON-LD LocalBusiness schema |
| `next-sitemap.config.js` | Sitemap config |

---

## Task 1: Experience page — GSAP pinned scroll

**Files:**
- Create: `components/sections/experience/PinnedScroll.tsx`
- Create: `components/sections/experience/ProgressIndicator.tsx`
- Create: `components/sections/experience/scenes/` (5 scene files)
- Create: `components/sections/experience/AudioToggle.tsx`
- Create: `components/sections/experience/ReducedMotionFallback.tsx`

- [ ] **Step 1: AudioToggle.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { experience } from '@/content/copy'

const STORAGE_KEY = 'sas-audio-enabled'

export function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'true') setEnabled(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    if (!audioRef.current) {
      audioRef.current = new Audio(experience.audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = 0.3
    }

    if (enabled) {
      audioRef.current.play().catch(() => {
        // Autoplay blocked — silently fail
        setEnabled(false)
      })
    } else {
      audioRef.current.pause()
    }

    localStorage.setItem(STORAGE_KEY, String(enabled))

    return () => {
      audioRef.current?.pause()
    }
  }, [enabled, mounted])

  if (!mounted) return null

  return (
    <button
      onClick={() => setEnabled((e) => !e)}
      aria-label={enabled ? 'Mute ambient sound' : 'Play ambient sound'}
      aria-pressed={enabled}
      className="flex items-center gap-2 font-sans text-xs text-bg/50 hover:text-bg transition-colors focus-visible:ring-2 focus-visible:ring-gold rounded-sm px-2 py-1"
    >
      {enabled ? <Volume2 size={14} aria-hidden /> : <VolumeX size={14} aria-hidden />}
      <span>{enabled ? 'Sound on' : 'Sound off'}</span>
    </button>
  )
}
```

Note: `experience.audioSrc` points to `/audio/ambient.mp3` — create the directory but leave the file as `TODO`:

```bash
mkdir -p public/audio
touch public/audio/README.md
echo "# TODO: Add ambient.mp3 audio file here" > public/audio/README.md
```

- [ ] **Step 2: ProgressIndicator.tsx**

```tsx
'use client'

import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

interface Props {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: Props) {
  return (
    <aside
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-0 hidden md:flex"
      aria-label="Session progress"
      aria-hidden // Decorative — scene headings convey same info
    >
      <div className="relative flex flex-col items-center gap-0">
        {/* Track line */}
        <div className="absolute w-px bg-bg/10 top-2 bottom-2 left-1/2 -translate-x-1/2" />

        {experience.scenes.map((scene, i) => (
          <div key={scene.id} className="flex flex-col items-center">
            <motion.div
              className="w-1.5 h-1.5 rounded-full z-10 relative"
              animate={{
                backgroundColor: i === current ? 'var(--color-rose)' : 'rgba(251,247,242,0.2)',
                scale: i === current ? 1.5 : 1,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {i < total - 1 && (
              <motion.div
                className="w-px origin-top"
                style={{ height: 40 }}
                animate={{ backgroundColor: i < current ? 'rgba(212,165,165,0.4)' : 'rgba(251,247,242,0.1)' }}
                transition={{ duration: 0.6 }}
              />
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
```

- [ ] **Step 3: Scene components (5 files)**

Create `components/sections/experience/scenes/SceneEnquire.tsx`:

```tsx
import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[0]

interface Props { isActive: boolean }

export function SceneEnquire({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      {/* Background: soft pulsing dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,165,165,0.3) 0%, transparent 60%)' }}
        animate={isActive ? { width: [200, 300, 200], height: [200, 300, 200] } : { width: 200, height: 200 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      {/* Message bubble illustration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-24 h-16 rounded-2xl rounded-bl-none bg-rose/20 border border-rose/30"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        aria-hidden
      />

      {/* Copy */}
      <div className="max-w-lg">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {scene.number}
        </motion.p>
        <motion.h2
          className="font-display font-light text-5xl lg:text-6xl text-bg tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {scene.title}
        </motion.h2>
        <motion.p
          className="font-sans text-base text-bg/60 leading-relaxed"
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          {scene.body}
        </motion.p>
      </div>
    </div>
  )
}
```

Create `components/sections/experience/scenes/SceneConfirm.tsx`:

```tsx
import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[1]
interface Props { isActive: boolean }

export function SceneConfirm({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      {/* Calendar/clock motif */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <div className="w-28 h-28 rounded-full border border-sage/40 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border border-sage/20 flex items-center justify-center">
            <div className="w-px h-8 bg-sage/40 origin-bottom" style={{ transform: 'rotate(-30deg)' }} />
          </div>
        </div>
      </motion.div>

      <div className="max-w-lg">
        <motion.p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {scene.number}
        </motion.p>
        <motion.h2 className="font-display font-light text-5xl lg:text-6xl text-bg tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          {scene.title}
        </motion.h2>
        <motion.p className="font-sans text-base text-bg/60 leading-relaxed"
          initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          {scene.body}
        </motion.p>
      </div>
    </div>
  )
}
```

Create `components/sections/experience/scenes/SceneArrive.tsx`:

```tsx
import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[2]
interface Props { isActive: boolean }

export function SceneArrive({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      {/* Door/threshold motif */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-20 h-32 border-2 border-bg/15 rounded-t-full"
        initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} aria-hidden
      >
        <motion.div
          className="absolute inset-0 rounded-t-full"
          style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.08) 0%, transparent 100%)' }}
          animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="max-w-lg">
        <motion.p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {scene.number}
        </motion.p>
        <motion.h2 className="font-display font-light text-5xl lg:text-6xl text-bg tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          {scene.title}
        </motion.h2>
        <motion.p className="font-sans text-base text-bg/60 leading-relaxed"
          initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          {scene.body}
        </motion.p>
      </div>
    </div>
  )
}
```

Create `components/sections/experience/scenes/SceneSession.tsx`:

```tsx
import { motion } from 'framer-motion'
import { AudioToggle } from '../AudioToggle'
import { experience } from '@/content/copy'

const scene = experience.scenes[3]
interface Props { isActive: boolean }

export function SceneSession({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      {/* Ambient gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              top: '50%',
              left: '50%',
              x: '-50%',
              y: '-50%',
              background: `radial-gradient(circle, ${
                i === 0 ? 'rgba(212,165,165,0.12)' :
                i === 1 ? 'rgba(168,181,160,0.08)' :
                'rgba(201,169,110,0.05)'
              } 0%, transparent 70%)`,
            }}
            animate={isActive ? {
              scale: [1, 1.1 + i * 0.05, 1],
              rotate: [0, 15 + i * 10, 0],
            } : { scale: 1 }}
            transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>

      <div className="max-w-lg">
        <motion.p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4"
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {scene.number}
        </motion.p>
        <motion.h2 className="font-display font-light text-5xl lg:text-6xl text-bg tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          {scene.title}
        </motion.h2>
        <motion.p className="font-sans text-base text-bg/60 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          {scene.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}>
          <AudioToggle />
        </motion.div>
      </div>
    </div>
  )
}
```

Create `components/sections/experience/scenes/SceneRest.tsx`:

```tsx
import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[4]
interface Props { isActive: boolean }

export function SceneRest({ isActive }: Props) {
  return (
    <div
      className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20 transition-colors duration-[2000ms]"
      style={{ backgroundColor: isActive ? '#FAF8F5' : 'transparent' }}
    >
      <div className="max-w-lg">
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.18em] mb-4 transition-colors duration-[1500ms]"
          style={{ color: isActive ? 'rgba(42,31,45,0.3)' : 'rgba(251,247,242,0.3)' }}
          initial={{ opacity: 0 }} animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}>
          {scene.number}
        </motion.p>
        <motion.h2
          className="font-display font-light text-5xl lg:text-6xl tracking-tight mb-6 transition-colors duration-[1500ms]"
          style={{ color: isActive ? 'var(--color-ink)' : 'var(--color-bg)' }}
          initial={{ opacity: 0, y: 20 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}>
          {scene.title}
        </motion.h2>
        <motion.p
          className="font-sans text-base leading-relaxed transition-colors duration-[1500ms]"
          style={{ color: isActive ? 'rgba(42,31,45,0.65)' : 'rgba(251,247,242,0.6)' }}
          initial={{ opacity: 0, y: 12 }} animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}>
          {scene.body}
        </motion.p>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: ReducedMotionFallback.tsx**

```tsx
import Link from 'next/link'
import { AudioToggle } from './AudioToggle'
import { experience } from '@/content/copy'

export function ReducedMotionFallback() {
  return (
    <div className="bg-ink">
      {experience.scenes.map((scene, i) => (
        <section
          key={scene.id}
          className="min-h-screen flex flex-col justify-end pb-16 px-8 lg:px-20 border-b border-bg/5 last:border-0"
          style={{ backgroundColor: i === 4 ? '#FAF8F5' : undefined }}
        >
          <p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4">
            {scene.number}
          </p>
          <h2 className={`font-display font-light text-5xl lg:text-6xl tracking-tight mb-6 ${i === 4 ? 'text-ink' : 'text-bg'}`}>
            {scene.title}
          </h2>
          <p className={`font-sans text-base leading-relaxed max-w-lg ${i === 4 ? 'text-ink/65' : 'text-bg/60'}`}>
            {scene.body}
          </p>
          {i === 3 && <div className="mt-6"><AudioToggle /></div>}
        </section>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: PinnedScroll.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { ProgressIndicator } from './ProgressIndicator'
import { SceneEnquire } from './scenes/SceneEnquire'
import { SceneConfirm } from './scenes/SceneConfirm'
import { SceneArrive } from './scenes/SceneArrive'
import { SceneSession } from './scenes/SceneSession'
import { SceneRest } from './scenes/SceneRest'
import { ReducedMotionFallback } from './ReducedMotionFallback'
import { experience } from '@/content/copy'

const SCENES = [SceneEnquire, SceneConfirm, SceneArrive, SceneSession, SceneRest]
const SCENE_COUNT = SCENES.length

export function PinnedScroll() {
  const prefersReduced = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentScene, setCurrentScene] = useState(0)

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return

    // GSAP loaded dynamically to avoid SSR
    let gsapInstance: typeof import('gsap') | null = null
    let ScrollTriggerInstance: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null
    let st: import('gsap/ScrollTrigger').ScrollTrigger | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)
      gsapInstance = { gsap } as any
      ScrollTriggerInstance = ScrollTrigger

      // ScrollTrigger value tracks 0 → 1 across the full pinned height
      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${SCENE_COUNT * 100}vh`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const sceneIndex = Math.min(
            SCENE_COUNT - 1,
            Math.floor(self.progress * SCENE_COUNT)
          )
          setCurrentScene(sceneIndex)
        },
      })
    }

    init()

    return () => {
      st?.kill()
    }
  }, [prefersReduced])

  if (prefersReduced) {
    return <ReducedMotionFallback />
  }

  return (
    <>
      <ProgressIndicator current={currentScene} total={SCENE_COUNT} />

      {/* The pinned container height = SCENE_COUNT * 100vh for scroll travel */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${SCENE_COUNT * 100}vh` }}
        aria-label="Session experience — scroll to explore"
      >
        {/* The pinned panel that GSAP pins */}
        <div className="sticky top-0 h-screen bg-ink overflow-hidden">
          {SCENES.map((SceneComponent, i) => (
            <div
              key={experience.scenes[i].id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                currentScene === i ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              <SceneComponent isActive={currentScene === i} />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
```

**Important:** The GSAP `pin: true` approach with `sticky top-0` is a client-side-only pattern. The container has a fixed scroll height (5 × 100vh = 500vh) set as `height` so Lenis has scroll distance to work with. GSAP pins the inner sticky panel.

- [ ] **Step 6: app/experience/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { PinnedScroll } from '@/components/sections/experience/PinnedScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { experience } from '@/content/copy'

export const metadata: Metadata = {
  title: 'The Experience',
  description: 'See exactly how a Soothe and Scratch mobile ASMR session works — from enquiry through to rest.',
}

export default function ExperiencePage() {
  return (
    <>
      {/* Page header — brief, before the scroll story starts */}
      <div className="pt-32 pb-12 px-8 lg:px-20 bg-ink">
        <p className="font-sans text-xs uppercase tracking-[0.18em] text-bg/30 mb-4">How it works</p>
        <h1 className="font-display font-light text-6xl lg:text-8xl text-bg tracking-tight">
          A session, from start to rest.
        </h1>
        <p className="font-sans text-sm text-bg/40 mt-6">Scroll to follow along.</p>
      </div>

      <PinnedScroll />

      {/* CTA after the scroll story */}
      <div className="py-32 px-8 text-center bg-bg">
        <p className="font-display font-light text-4xl lg:text-5xl text-ink mb-10">
          {experience.cta.label}
        </p>
        <MagneticButton className="inline-block">
          <Link
            href={experience.cta.href}
            className="font-sans text-sm bg-ink text-bg px-10 py-4 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
          >
            Enquire
          </Link>
        </MagneticButton>
      </div>
    </>
  )
}
```

- [ ] **Step 7: Verify Experience page**

```bash
pnpm dev
```

Open `http://localhost:3000/experience`. Verify:
- [ ] Page header visible on load (aubergine background)
- [ ] Scroll down: pinned container appears, scenes transition
- [ ] Scene 1 (Enquire): pulsing dot + message bubble + copy
- [ ] Scene 4 (Session): ambient gradients, audio toggle button visible, clicking it plays audio if file exists
- [ ] Scene 5 (Rest): background fades to near-white, text colour changes
- [ ] After scrolling past all 5 scenes: CTA section appears
- [ ] Side progress dots track current scene
- [ ] Test with `prefers-reduced-motion: reduce` in browser DevTools: page shows static stacked version

- [ ] **Step 8: Commit**

```bash
git add app/experience/ components/sections/experience/ public/audio/
git commit -m "feat: add Experience page with GSAP pinned scroll, 5 scenes, audio toggle"
```

---

## Task 2: Journal stub

**Files:**
- Create: `app/journal/page.tsx`

- [ ] **Step 1: Write journal/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { journal } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on rest, sensation, and the quiet art of doing less — from Soothe and Scratch.',
}

// TODO: Wire to MDX or a CMS (Sanity, Contentful, etc.)
export default function JournalPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <RevealOnScroll className="mb-16">
        <h1 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight mb-4">
          {journal.heading}
        </h1>
        <p className="font-sans text-base text-ink/50 max-w-md leading-relaxed">
          {journal.subhead}
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {journal.posts.map((post, i) => (
          <RevealOnScroll key={post.slug} delay={i * 0.08}>
            <article>
              {/* Placeholder image */}
              <div className="aspect-[4/3] bg-rose/10 rounded-xl mb-6 flex items-end p-4">
                <span className="font-sans text-xs text-rose/40 uppercase tracking-widest">
                  {post.readTime} read
                </span>
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink/30 mb-2">
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h2 className="font-display font-light text-2xl text-ink mb-3 leading-tight">
                {/* TODO: Wire Link to real post when CMS is connected */}
                {post.title}
              </h2>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/journal/
git commit -m "feat: add Journal stub page with placeholder posts"
```

---

## Task 3: Accessibility audit + fixes

- [ ] **Step 1: Run axe in browser**

Install axe DevTools browser extension, open each page at `http://localhost:3000`, run the scan. Fix any violations — common issues:

- Missing `aria-label` on icon-only buttons → add `aria-label`
- Colour contrast failures → check `text-ink/40` against white background — adjust opacity up if needed
- Missing `lang` on HTML → already set in layout.tsx (`lang="en"`)
- `<select>` without label → already labeled in enquire form

- [ ] **Step 2: Verify skip link**

Tab into `http://localhost:3000` — the skip link "Skip to content" should appear at the top. Pressing Enter should move focus to `<main>`.

- [ ] **Step 3: Check focus visibility on all interactive elements**

Tab through each page. Verify every link, button, and form element shows the gold focus ring (`outline: 2px solid var(--color-gold)`). If any are missing, add `focus-visible:ring-2 focus-visible:ring-gold` to the element.

- [ ] **Step 4: Verify keyboard navigation on Experience page**

Navigate to `/experience`. Keyboard-only: verify the audio toggle is reachable by Tab. Verify progress indicator is `aria-hidden` and not focusable.

- [ ] **Step 5: Verify heading hierarchy**

Open each page in browser. Use Accessibility tree in DevTools: verify heading levels go h1 → h2 → h3 with no skips.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "fix: accessibility audit — focus rings, aria labels, heading hierarchy"
```

---

## Task 4: Performance audit

- [ ] **Step 1: Check all images use next/image**

```bash
grep -r '<img ' app/ components/ --include='*.tsx' | grep -v 'next/image'
```

Expected: no results. All `<img>` tags should be `<Image>` from `next/image`.

- [ ] **Step 2: Verify hero image has priority**

In `components/sections/home/Hero.tsx`, confirm `<Image ... priority>` is set on the hero photo. This triggers `<link rel="preload">`.

- [ ] **Step 3: Verify below-fold images have lazy loading**

`next/image` is lazy by default (no `priority` prop). Confirm no below-fold images have `priority` set.

- [ ] **Step 4: Run build and check bundle**

```bash
pnpm build
```

Review the output. If any route shows a large JS bundle (> 200kB first load), identify the cause. Common culprits:
- GSAP not being dynamically imported → already handled in `PinnedScroll.tsx` with dynamic `import('gsap')`
- Large images not optimised → next/image handles this

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "perf: verify next/image, lazy loading, and dynamic GSAP import"
```

---

## Task 5: Per-page metadata

**Files:**
- Modify: `app/about/page.tsx`, `app/services/page.tsx`, `app/experience/page.tsx`, `app/journal/page.tsx`, `app/enquire/page.tsx`, `app/policies/page.tsx`

All pages already have `export const metadata` set in Plans A and B. This task verifies and adds OpenGraph/Twitter card data.

- [ ] **Step 1: Add OpenGraph to all inner pages**

For each page that doesn't yet have `openGraph` in its metadata, add:

```tsx
openGraph: {
  title: 'Page Title | Soothe and Scratch',
  description: 'Page description.',
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
},
```

Update `app/about/page.tsx`:

```tsx
export const metadata: Metadata = {
  title: 'About Elizabeth',
  description: 'Meet Elizabeth, mobile ASMR practitioner in South London. Learn about ASMR and how Soothe and Scratch sessions work.',
  openGraph: {
    title: 'About Elizabeth | Soothe and Scratch',
    description: 'Meet Elizabeth, mobile ASMR practitioner in South London.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}
```

Repeat the pattern for services, experience, journal, enquire, and policies pages.

- [ ] **Step 2: Verify metadata in browser**

```bash
pnpm dev
```

Open DevTools → Elements → `<head>` on each page. Confirm `<meta property="og:title">` and `<meta name="twitter:card">` are present.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add OpenGraph and Twitter card metadata to all pages"
```

---

## Task 6: JSON-LD LocalBusiness schema

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add JSON-LD to home page**

In `app/page.tsx`, add before the page sections:

```tsx
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Soothe and Scratch',
  description: 'Mobile ASMR sessions for women in London and surrounding areas.',
  url: 'https://sootheandscratch.co.uk', // TODO: Update with real domain
  telephone: '', // TODO: Add phone if applicable
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressRegion: 'Greater London',
    addressCountry: 'GB',
  },
  areaServed: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: 51.5074,
      longitude: -0.1278,
    },
    geoRadius: '30000',
  },
  priceRange: '££',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '09:00',
    closes: '21:00',
  },
  sameAs: ['https://instagram.com/sootheandscratch'],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Hero />
      {/* ... rest of sections */}
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000`. DevTools → Elements → search for `application/ld+json`. Confirm schema is present.

Test with Google's Rich Results Test (paste the page HTML) — confirm no errors.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add LocalBusiness JSON-LD schema to home page"
```

---

## Task 7: Sitemap + robots.txt

**Files:**
- Create: `next-sitemap.config.js`

- [ ] **Step 1: Create next-sitemap config**

```js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://sootheandscratch.co.uk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
  },
  exclude: ['/api/*'],
}
```

- [ ] **Step 2: Add postbuild script**

In `package.json`, modify the `build` script:

```json
"build": "next build && next-sitemap"
```

Or add separately:

```json
"postbuild": "next-sitemap"
```

- [ ] **Step 3: Add SITE_URL to .env.local**

```
SITE_URL=https://sootheandscratch.co.uk
```

- [ ] **Step 4: Build and verify**

```bash
pnpm build
```

Expected: `public/sitemap.xml` and `public/robots.txt` generated.

Open `public/sitemap.xml` — verify all 7 routes appear (`/`, `/about`, `/services`, `/experience`, `/journal`, `/enquire`, `/policies`).

- [ ] **Step 5: Commit**

```bash
git add next-sitemap.config.js public/sitemap.xml public/robots.txt package.json
git commit -m "feat: add sitemap and robots.txt via next-sitemap"
```

---

## Task 8: README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Write README.md**

```markdown
# Soothe and Scratch

Mobile ASMR website built with Next.js 14 App Router.

## Getting started

```bash
pnpm install
pnpm dev
```

## Environment variables

Create `.env.local`:

```
RESEND_API_KEY=re_xxxxxxxxxxxx       # Resend API key for enquiry emails
ENQUIRY_EMAIL=hello@example.com      # Email address to receive enquiries
SITE_URL=https://sootheandscratch.co.uk  # Used for sitemap generation
```

## Content editing

All marketing copy lives in `/content/copy.ts`. Edit this file to update any text on the site. Items marked `TODO:` need replacing with real content from Elizabeth.

## Images

Brand images are in `public/images/`. They were selected from Elizabeth's Instagram feed. To swap an image, replace the file with the same name and dimensions.

To add an ambient audio file for the `/experience` page, place an `.mp3` file at `public/audio/ambient.mp3`.

## Deployment

Deploy to Vercel. Set the environment variables above in the Vercel project settings.

After deploying, verify the sender domain `sootheandscratch.co.uk` is set up in Resend and DNS records are configured.

## Tech stack

- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Framer Motion (page animations, reveals)
- GSAP + ScrollTrigger (Experience page pinned scroll)
- Lenis (smooth scroll)
- shadcn/ui (Button, Accordion, Dialog)
- Resend (transactional email)
- React Hook Form + Zod (form validation)
- next-sitemap (SEO)
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: add README with setup and content editing guide"
```

---

## Task 9: Final build + verification

- [ ] **Step 1: Run tests**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 2: TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Production build**

```bash
pnpm build
```

Expected: all routes build successfully. Check for any warnings.

- [ ] **Step 4: Walk the full site on the dev server**

```bash
pnpm dev
```

- [ ] `/` — hero, marquee, all sections, testimonials auto-rotate, IG strip
- [ ] `/about` — portrait, drop-cap bio, count-up stats, values click-reveal
- [ ] `/services` — 4 alternating blocks, sticky side panel, count-up prices
- [ ] `/experience` — pinned scroll, 5 scenes, audio toggle, progress dots
- [ ] `/journal` — 3-column stub grid
- [ ] `/enquire` — form validation, submit, success state
- [ ] `/policies` — sticky ToC, links to each section
- [ ] 404 — navigate to `/xyz` — calm 404 page
- [ ] Nav — transparent on hero, solid on scroll
- [ ] Nav mobile — hamburger opens full-screen overlay
- [ ] Custom cursor — follows mouse, scales on hover over interactive elements
- [ ] Page transitions — soft fade between routes

- [ ] **Step 5: Test prefers-reduced-motion**

In Chrome DevTools: Rendering → Emulate CSS prefers-reduced-motion: reduce.

- [ ] Lenis disabled (page scrolls natively)
- [ ] SplitText shows instantly
- [ ] Experience page shows static stacked scenes
- [ ] Cursor not rendered
- [ ] Marquee stopped

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: Plan C complete — Experience page, journal, polish, and SEO"
```

---

## Plan C Complete

**Milestone delivered:** Full site complete and launch-ready. Experience page with GSAP pinned scroll, all accessibility fixes, sitemap, robots.txt, and README. Deploy to Vercel with environment variables set.

**Outstanding TODOs for Elizabeth:**
- Replace placeholder testimonials with real client quotes (`content/copy.ts`)
- Replace practitioner bio with Elizabeth's real story (`content/copy.ts`)
- Confirm exact pricing for all services (`content/copy.ts`)
- Add ambient audio file to `public/audio/ambient.mp3`
- Set up Resend sender domain (sootheandscratch.co.uk) and verify DNS records
- Replace placeholder images if any don't suit their sections (`public/images/`)
- Add real OG image files for social sharing
- Wire Instagram grid to live API when ready
- Update `metadataBase` URL in `app/layout.tsx` with real domain
