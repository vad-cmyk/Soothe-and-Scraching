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

    let st: { kill: () => void } | null = null

    const init = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${SCENE_COUNT * 100}vh`,
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const sceneIndex = Math.min(SCENE_COUNT - 1, Math.floor(self.progress * SCENE_COUNT))
          setCurrentScene(sceneIndex)
        },
      })
    }

    init()

    return () => { st?.kill() }
  }, [prefersReduced])

  if (prefersReduced) {
    return <ReducedMotionFallback />
  }

  return (
    <>
      <ProgressIndicator current={currentScene} total={SCENE_COUNT} />
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${SCENE_COUNT * 100}vh` }}
        aria-label="Session experience — scroll to explore"
      >
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
