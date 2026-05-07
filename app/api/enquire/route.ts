import { NextRequest, NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validation'
import { sendEnquiryEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const result = enquirySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', fieldErrors: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  // Honeypot — return 200 silently to fool bots
  if (result.data.website) {
    return NextResponse.json({ ok: true })
  }

  try {
    await sendEnquiryEmail(result.data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send failed:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
