import { motion } from 'framer-motion'
import { experience } from '@/content/copy'

const scene = experience.scenes[0]
interface Props { isActive: boolean }

export function SceneEnquire({ isActive }: Props) {
  return (
    <div className="relative w-full h-screen flex flex-col justify-end pb-16 px-8 lg:px-20">
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(212,165,165,0.3) 0%, transparent 60%)' }}
        animate={isActive ? { width: [200, 300, 200], height: [200, 300, 200] } : { width: 200, height: 200 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-24 h-16 rounded-2xl rounded-bl-none bg-rose/20 border border-rose/30"
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        aria-hidden
      />
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
