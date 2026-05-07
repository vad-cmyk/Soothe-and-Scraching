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
      audioRef.current.play().catch(() => setEnabled(false))
    } else {
      audioRef.current.pause()
    }
    localStorage.setItem(STORAGE_KEY, String(enabled))
    return () => { audioRef.current?.pause() }
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
