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

  // Honeypot — check before validation so bots never see field-name hints in error responses
  if (typeof (body as Record<string, unknown>).website === 'string' && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true })
  }

  const result = enquirySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', fieldErrors: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  try {
    await sendEnquiryEmail(result.data)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Email send failed:', err)
    return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
  }
}
