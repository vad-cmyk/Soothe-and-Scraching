import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  contactMethod: z.string().min(2, 'Please enter a phone number or Instagram handle'),
  postcode: z.string().min(2, 'Please enter your postcode or area'),
  service: z.enum(['scalp', 'touch', 'extended', 'combo', 'not-sure'], {
    error: 'Please select a service',
  }),
  preferredTimes: z.string().optional(),
  additionalInfo: z.string().optional(),
  // Honeypot — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
