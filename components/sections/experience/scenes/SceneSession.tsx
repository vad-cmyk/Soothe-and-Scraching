import { motion } from 'framer-motion'
import { AudioToggle } from '../AudioToggle'
import { experience } from '@/content/copy'

const scene = experience.scenes[3]
interface Props { isActive: boolean }

export function SceneSession({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden>
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
            animate={isActive ? { scale: [1, 1.1 + i * 0.05, 1], rotate: [0, 15 + i * 10, 0] } : { scale: 1 }}
            transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </motion.div>
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
          className="font-sans text-base text-bg/60 leading-relaxed mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          {scene.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <AudioToggle />
        </motion.div>
      </div>
    </div>
  )
}
