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
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {scene.number}
        </motion.p>
        <motion.h2
          className="font-display font-light text-5xl lg:text-6xl tracking-tight mb-6 transition-colors duration-[1500ms]"
          style={{ color: isActive ? 'var(--color-ink)' : 'var(--color-bg)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {scene.title}
        </motion.h2>
        <motion.p
          className="font-sans text-base leading-relaxed transition-colors duration-[1500ms]"
          style={{ color: isActive ? 'rgba(42,31,45,0.65)' : 'rgba(251,247,242,0.6)' }}
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
