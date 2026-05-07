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
      className="fixed right-6 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-0 hidden md:flex"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center gap-0">
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
