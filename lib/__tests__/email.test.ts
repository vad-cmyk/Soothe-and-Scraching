import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('resend', () => {
  const mockSend = vi.fn().mockResolvedValue({ data: null, error: null })
  function MockResend() {
    return { emails: { send: mockSend } }
  }
  return { Resend: MockResend }
})

import { sendEnquiryEmail } from '../email'

const validData = {
  name: 'Sarah',
  email: 'sarah@example.com',
  contactMethod: '07700900000',
  postcode: 'SE1 7PB',
  service: 'scalp' as const,
}

describe('sendEnquiryEmail', () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = 'test-key'
    process.env.ENQUIRY_EMAIL = 'hello@sootheandscratch.co.uk'
  })

  it('sends without throwing when Resend succeeds', async () => {
    await expect(sendEnquiryEmail(validData)).resolves.toBeUndefined()
  })

  it('throws when ENQUIRY_EMAIL is not set', async () => {
    delete process.env.ENQUIRY_EMAIL
    await expect(sendEnquiryEmail(validData)).rejects.toThrow('ENQUIRY_EMAIL environment variable is not set')
  })
})
