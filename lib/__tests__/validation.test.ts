import { describe, it, expect } from 'vitest'
import { enquirySchema } from '../validation'

const valid = {
  name: 'Sarah',
  email: 'sarah@example.com',
  contactMethod: '07700900000',
  postcode: 'SE1 7PB',
  service: 'scalp' as const,
}

describe('enquirySchema', () => {
  it('accepts a valid submission', () => {
    const result = enquirySchema.safeParse(valid)
    expect(result.success).toBe(true)
  })

  it('rejects missing name', () => {
    const result = enquirySchema.safeParse({ ...valid, name: '' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Please enter your name')
  })

  it('rejects invalid email', () => {
    const result = enquirySchema.safeParse({ ...valid, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect(result.error?.issues[0].message).toBe('Please enter a valid email address')
  })

  it('rejects invalid service enum', () => {
    const result = enquirySchema.safeParse({ ...valid, service: 'unknown' })
    expect(result.success).toBe(false)
  })

  it('rejects non-empty honeypot', () => {
    const result = enquirySchema.safeParse({ ...valid, website: 'http://spam.com' })
    expect(result.success).toBe(false)
  })

  it('accepts optional fields as undefined', () => {
    const result = enquirySchema.safeParse(valid)
    expect(result.success).toBe(true)
  })
})
