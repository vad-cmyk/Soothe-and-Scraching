import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[2]
interface Props { isActive: boolean }

export function SceneArrive({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-20 h-32 border-2 border-bg/15 rounded-t-full"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <motion.div
          className="absolute inset-0 rounded-t-full"
          style={{ background: 'linear-gradient(to bottom, rgba(201,169,110,0.08) 0%, transparent 100%)' }}
          animate={isActive ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
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
