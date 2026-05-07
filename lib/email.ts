import { Resend } from 'resend'
import type { EnquiryInput } from './validation'

const SERVICE_LABELS: Record<EnquiryInput['service'], string> = {
  scalp: 'Scalp & Hair (60 min)',
  touch: 'Light Touch & Tracing (60 min)',
  extended: 'Extended Session (90 min)',
  combo: 'Combo Session (120 min)',
  'not-sure': 'Not sure yet',
}

export async function sendEnquiryEmail(data: EnquiryInput): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const to = process.env.ENQUIRY_EMAIL
  if (!to) throw new Error('ENQUIRY_EMAIL environment variable is not set')

  const html = `
    <h2>New Soothe &amp; Scratch Enquiry</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Contact</strong></td><td>${escapeHtml(data.contactMethod)}</td></tr>
      <tr><td><strong>Area</strong></td><td>${escapeHtml(data.postcode)}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(SERVICE_LABELS[data.service])}</td></tr>
      ${data.preferredTimes ? `<tr><td><strong>Preferred times</strong></td><td>${escapeHtml(data.preferredTimes)}</td></tr>` : ''}
      ${data.additionalInfo ? `<tr><td><strong>Additional info</strong></td><td>${escapeHtml(data.additionalInfo)}</td></tr>` : ''}
    </table>
  `

  const { error } = await resend.emails.send({
    from: 'Soothe & Scratch <enquiries@sootheandscratch.co.uk>',
    to,
    replyTo: data.email,
    subject: `New enquiry from ${data.name}`,
    html,
  })

  if (error) throw new Error(`Resend error: ${error.message}`)
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
