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
