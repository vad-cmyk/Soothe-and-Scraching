import { describe, it, expect } from 'vitest'
import { ease, duration, fadeUp, staggerContainer } from '../motion'

describe('motion constants', () => {
  it('spring ease is a valid 4-number bezier', () => {
    expect(ease.spring).toHaveLength(4)
    ease.spring.forEach(v => expect(typeof v).toBe('number'))
  })

  it('all durations are at or above 0.4s minimum', () => {
    Object.values(duration).forEach(d => {
      expect(d).toBeGreaterThanOrEqual(0.4)
    })
  })

  it('fadeUp has hidden and visible states', () => {
    expect(fadeUp.hidden).toBeDefined()
    expect(fadeUp.visible).toBeDefined()
  })

  it('staggerContainer has staggerChildren in visible transition', () => {
    const visible = staggerContainer.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.06)
  })
})
