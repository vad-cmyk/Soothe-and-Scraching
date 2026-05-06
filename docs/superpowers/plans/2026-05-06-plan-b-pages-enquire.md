# Soothe and Scratch — Plan B: Inner Pages + Enquire + Email API

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build all inner pages (About, Services, Policies, 404) plus the Enquire form with a working Resend email API route.

**Architecture:** Each page follows the same pattern: import copy from `content/copy.ts`, compose layout from `components/primitives/` and page-specific section components. The enquire form posts to `/api/enquire`, which validates with Zod, then sends via Resend. `lib/validation.ts` and `lib/email.ts` are shared utilities.

**Tech Stack:** Next.js 14 App Router, Framer Motion, shadcn/ui (Accordion), React Hook Form + Zod, Resend, Vitest for API/validation tests.

**Prerequisites:** Plan A complete. All primitives, layout components, content file, and images are in place.

---

## File Map

| File | Responsibility |
|------|---------------|
| `lib/validation.ts` | Zod schemas for the enquiry form |
| `lib/email.ts` | Resend email wrapper |
| `app/api/enquire/route.ts` | POST handler — validate → send email |
| `components/sections/about/` | AboutHero, Bio, AsmrDeepDive, Values |
| `components/sections/services/` | ServiceBlock, StickyPanel |
| `components/sections/policies/TableOfContents.tsx` | Sticky ToC |
| `app/about/page.tsx` | About page |
| `app/services/page.tsx` | Services page |
| `app/policies/page.tsx` | Policies page |
| `app/not-found.tsx` | 404 page |
| `app/enquire/page.tsx` | Enquire page |

---

## Task 1: Validation schemas

**Files:**
- Create: `lib/validation.ts`
- Create: `lib/__tests__/validation.test.ts`

- [ ] **Step 1: Write validation.ts**

```ts
import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email address'),
  contactMethod: z.string().min(2, 'Please enter a phone number or Instagram handle'),
  postcode: z.string().min(2, 'Please enter your postcode or area'),
  service: z.enum(['scalp', 'touch', 'extended', 'combo', 'not-sure'], {
    errorMap: () => ({ message: 'Please select a service' }),
  }),
  preferredTimes: z.string().optional(),
  additionalInfo: z.string().optional(),
  // Honeypot — must be empty
  website: z.string().max(0, 'Bot detected').optional(),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
```

- [ ] **Step 2: Write tests**

Create `lib/__tests__/validation.test.ts`:

```ts
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
```

- [ ] **Step 3: Run tests**

```bash
pnpm test
```

Expected: 6 new tests pass alongside Task 5's existing tests.

- [ ] **Step 4: Commit**

```bash
git add lib/validation.ts lib/__tests__/validation.test.ts
git commit -m "feat: add enquiry form Zod validation schema with tests"
```

---

## Task 2: Email utility

**Files:**
- Create: `lib/email.ts`
- Create: `lib/__tests__/email.test.ts`

- [ ] **Step 1: Write email.ts**

```ts
import { Resend } from 'resend'
import type { EnquiryInput } from './validation'

const resend = new Resend(process.env.RESEND_API_KEY)

const SERVICE_LABELS: Record<EnquiryInput['service'], string> = {
  scalp: 'Scalp & Hair (60 min)',
  touch: 'Light Touch & Tracing (60 min)',
  extended: 'Extended Session (90 min)',
  combo: 'Combo Session (120 min)',
  'not-sure': 'Not sure yet',
}

export async function sendEnquiryEmail(data: EnquiryInput): Promise<void> {
  const to = process.env.ENQUIRY_EMAIL
  if (!to) throw new Error('ENQUIRY_EMAIL environment variable is not set')

  const html = `
    <h2>New Soothe & Scratch Enquiry</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Contact</strong></td><td>${escapeHtml(data.contactMethod)}</td></tr>
      <tr><td><strong>Area</strong></td><td>${escapeHtml(data.postcode)}</td></tr>
      <tr><td><strong>Service</strong></td><td>${SERVICE_LABELS[data.service]}</td></tr>
      ${data.preferredTimes ? `<tr><td><strong>Preferred times</strong></td><td>${escapeHtml(data.preferredTimes)}</td></tr>` : ''}
      ${data.additionalInfo ? `<tr><td><strong>Additional info</strong></td><td>${escapeHtml(data.additionalInfo)}</td></tr>` : ''}
    </table>
  `

  const { error } = await resend.emails.send({
    from: 'Soothe & Scratch <enquiries@sootheandscratch.co.uk>', // TODO: verify sender domain in Resend
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
```

- [ ] **Step 2: Write tests (mock Resend)**

Create `lib/__tests__/email.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock Resend before importing email.ts
vi.mock('resend', () => ({
  Resend: vi.fn().mockImplementation(() => ({
    emails: {
      send: vi.fn().mockResolvedValue({ error: null }),
    },
  })),
}))

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
```

- [ ] **Step 3: Run tests**

```bash
pnpm test
```

Expected: all tests pass including the 2 new email tests.

- [ ] **Step 4: Commit**

```bash
git add lib/email.ts lib/__tests__/email.test.ts
git commit -m "feat: add Resend email utility with HTML template and tests"
```

---

## Task 3: Enquiry API route

**Files:**
- Create: `app/api/enquire/route.ts`

- [ ] **Step 1: Write route.ts**

```ts
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
      { error: 'Validation failed', issues: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  // Honeypot check
  if (result.data.website) {
    // Return 200 to fool bots — don't actually send
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
```

- [ ] **Step 2: Add .env.local**

Create `.env.local` (git-ignored):

```
RESEND_API_KEY=re_xxxxxxxxxxxx
ENQUIRY_EMAIL=your-email@example.com
```

Also add to `.gitignore` if not already present:

```
.env.local
.env*.local
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/api/enquire/route.ts .env.example
git commit -m "feat: add enquiry POST API route with validation and email dispatch"
```

---

## Task 4: Enquire page

**Files:**
- Create: `app/enquire/page.tsx`

- [ ] **Step 1: Write enquire/page.tsx**

```tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, MapPin, Clock, Heart } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { enquirySchema, type EnquiryInput } from '@/lib/validation'
import { enquire } from '@/content/copy'
import type { Metadata } from 'next'

// Note: metadata must be in a separate server component or page.tsx with 'use client' removed.
// Move metadata to a parent layout or use generateMetadata pattern for the non-client wrapper.
// For now, metadata is set in the wrapping server component approach below.

const ICON_MAP = { shield: Shield, 'map-pin': MapPin, clock: Clock, heart: Heart }

export default function EnquirePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
  })

  const onSubmit = async (data: EnquiryInput) => {
    setStatus('loading')
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = 'w-full font-sans text-sm bg-transparent border-b border-ink/20 pb-2 pt-1 text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/60 transition-colors duration-300'
  const labelClass = 'block font-sans text-xs uppercase tracking-[0.12em] text-ink/40 mb-2'
  const errorClass = 'font-sans text-xs text-rose mt-1' // rose is close enough for errors

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <h1 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight mb-4">
        {enquire.heading}
      </h1>
      <p className="font-sans text-base text-ink/50 mb-16 max-w-md leading-relaxed">
        {enquire.subhead}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* Form */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-16"
              >
                <p className="font-display font-light text-3xl text-ink mb-4">
                  {enquire.successMessage}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-10"
              >
                {/* Honeypot */}
                <input
                  {...register('website')}
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name" className={labelClass}>Name *</label>
                  <input id="name" {...register('name')} className={inputClass} placeholder="Your name" autoComplete="name" />
                  {errors.name && <p className={errorClass} role="alert">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className={labelClass}>Email *</label>
                  <input id="email" type="email" {...register('email')} className={inputClass} placeholder="your@email.com" autoComplete="email" />
                  {errors.email && <p className={errorClass} role="alert">{errors.email.message}</p>}
                </div>

                <div>
                  <label htmlFor="contactMethod" className={labelClass}>Phone or Instagram handle *</label>
                  <input id="contactMethod" {...register('contactMethod')} className={inputClass} placeholder="07700 900000 or @yourhandle" />
                  {errors.contactMethod && <p className={errorClass} role="alert">{errors.contactMethod.message}</p>}
                </div>

                <div>
                  <label htmlFor="postcode" className={labelClass}>Postcode or area *</label>
                  <input id="postcode" {...register('postcode')} className={inputClass} placeholder="SE1 or Clapham" autoComplete="postal-code" />
                  {errors.postcode && <p className={errorClass} role="alert">{errors.postcode.message}</p>}
                </div>

                <div>
                  <label htmlFor="service" className={labelClass}>Service interest *</label>
                  <select id="service" {...register('service')} className={`${inputClass} cursor-pointer`} defaultValue="">
                    <option value="" disabled>Select a service…</option>
                    <option value="scalp">Scalp & Hair (60 min)</option>
                    <option value="touch">Light Touch & Tracing (60 min)</option>
                    <option value="extended">Extended Session (90 min)</option>
                    <option value="combo">Combo Session (120 min)</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  {errors.service && <p className={errorClass} role="alert">{errors.service.message}</p>}
                </div>

                <div>
                  <label htmlFor="preferredTimes" className={labelClass}>Preferred dates / times</label>
                  <textarea id="preferredTimes" {...register('preferredTimes')} className={`${inputClass} resize-none`} rows={3} placeholder="Weekday evenings, weekend mornings…" />
                </div>

                <div>
                  <label htmlFor="additionalInfo" className={labelClass}>Anything else to know?</label>
                  <textarea id="additionalInfo" {...register('additionalInfo')} className={`${inputClass} resize-none`} rows={3} placeholder="Sensitivities, questions, anything at all…" />
                </div>

                {status === 'error' && (
                  <p className={errorClass} role="alert">{enquire.errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="self-start font-sans text-sm bg-ink text-bg px-8 py-3 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending…' : 'Send enquiry'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Reassurance column */}
        <div className="lg:col-span-2 lg:pt-2">
          <ul className="flex flex-col gap-6 mb-16">
            {enquire.reassurance.map((item) => {
              const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP]
              return (
                <li key={item.text} className="flex items-center gap-4">
                  <Icon size={16} className="text-rose flex-shrink-0" aria-hidden />
                  <span className="font-sans text-sm text-ink/70">{item.text}</span>
                </li>
              )
            })}
          </ul>

          <h2 className="font-display font-light text-xl text-ink mb-6">Common questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {enquire.faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-b border-ink/10">
                <AccordionTrigger className="font-sans text-sm text-ink/80 text-left py-4 hover:no-underline hover:text-ink">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="font-sans text-sm text-ink/60 leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
```

**Note:** Because this file uses `'use client'`, metadata must be handled in a wrapper. Create `app/enquire/layout.tsx`:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Book a mobile ASMR session with Elizabeth in London. Fill in the short form and she\'ll be in touch within 24 hours.',
}

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

- [ ] **Step 2: Test the form end-to-end**

```bash
pnpm dev
```

Open `http://localhost:3000/enquire`. Verify:
- [ ] All fields present and labeled
- [ ] Submit with empty fields → inline validation errors appear
- [ ] Submit with invalid email → email error appears
- [ ] Fill in valid data, submit → success message fades in (email only sends if `.env.local` has real keys)
- [ ] Honeypot field not visible, has `tabIndex={-1}`

- [ ] **Step 3: Commit**

```bash
git add app/enquire/ lib/
git commit -m "feat: add enquire page with React Hook Form, Zod validation, and email API"
```

---

## Task 5: About page

**Files:**
- Create: `app/about/page.tsx`
- Create: `components/sections/about/AboutHero.tsx`
- Create: `components/sections/about/Bio.tsx`
- Create: `components/sections/about/AsmrDeepDive.tsx`
- Create: `components/sections/about/Values.tsx`

- [ ] **Step 1: AboutHero.tsx**

```tsx
import Image from 'next/image'
import { about } from '@/content/copy'

export function AboutHero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <Image
        src="/images/about-portrait.jpg"
        alt={about.heroAlt}
        fill
        priority
        className="object-cover object-top"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)' }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Bio.tsx**

```tsx
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { about } from '@/content/copy'

export function Bio() {
  return (
    <section className="py-16 px-6 lg:px-12 max-w-4xl mx-auto">
      <div className="prose prose-lg max-w-none">
        {about.bio.map((para, i) => (
          <RevealOnScroll key={i} delay={i * 0.1}>
            <p
              className={`font-sans text-base text-ink/75 leading-[1.85] mb-6 ${
                i === 0
                  ? 'first-letter:font-display first-letter:text-6xl first-letter:font-light first-letter:float-left first-letter:mr-3 first-letter:leading-none'
                  : ''
              }`}
            >
              {para}
            </p>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: AsmrDeepDive.tsx**

```tsx
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { CountUp } from '@/components/primitives/CountUp'
import { about } from '@/content/copy'

export function AsmrDeepDive() {
  return (
    <section className="py-24 px-6 lg:px-12 bg-ink text-bg">
      <div className="max-w-7xl mx-auto">
        <RevealOnScroll>
          <h2 className="font-display font-light text-4xl lg:text-5xl text-bg tracking-tight mb-16 max-w-lg">
            What the research says
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {about.asmrStats.map((stat, i) => (
            <RevealOnScroll key={stat.label} delay={i * 0.1}>
              <div>
                <p className="font-display font-light text-7xl lg:text-8xl text-rose leading-none mb-4">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-sans text-base text-bg/70 leading-relaxed mb-2">
                  {stat.label}
                </p>
                <p className="font-sans text-xs text-bg/30 italic">{stat.source}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Values.tsx**

```tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { about } from '@/content/copy'

export function Values() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <RevealOnScroll className="mt-16 mb-12">
        <h2 className="font-display font-light text-4xl text-ink tracking-tight">
          How we work
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-ink/10">
        {about.values.map((value, i) => (
          <button
            key={value.name}
            className="text-left p-8 group focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset"
            onClick={() => setActive(active === i ? null : i)}
            aria-expanded={active === i}
          >
            <RevealOnScroll delay={i * 0.1}>
              <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/30 mb-4">
                0{i + 1}
              </p>
              <h3 className="font-display font-light text-3xl text-ink mb-4 group-hover:text-rose transition-colors duration-300">
                {value.name}
              </h3>
              <AnimatePresence>
                {active === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="font-sans text-sm text-ink/60 leading-relaxed overflow-hidden"
                  >
                    {value.description}
                  </motion.p>
                )}
              </AnimatePresence>
              {active !== i && (
                <span className="font-sans text-xs text-ink/30 group-hover:text-ink/50 transition-colors">
                  Read more
                </span>
              )}
            </RevealOnScroll>
          </button>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5: app/about/page.tsx**

```tsx
import type { Metadata } from 'next'
import { AboutHero } from '@/components/sections/about/AboutHero'
import { Bio } from '@/components/sections/about/Bio'
import { AsmrDeepDive } from '@/components/sections/about/AsmrDeepDive'
import { Values } from '@/components/sections/about/Values'
import { ClosingCta } from '@/components/sections/home/ClosingCta'

export const metadata: Metadata = {
  title: 'About Elizabeth',
  description: 'Meet Elizabeth, mobile ASMR practitioner based in South London. Learn about ASMR, the research behind it, and how Soothe and Scratch works.',
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <Bio />
      <AsmrDeepDive />
      <Values />
      <ClosingCta />
    </>
  )
}
```

- [ ] **Step 6: Commit**

```bash
git add app/about/ components/sections/about/
git commit -m "feat: add About page with bio, ASMR stats, and values"
```

---

## Task 6: Services page

**Files:**
- Create: `app/services/page.tsx`
- Create: `components/sections/services/ServiceBlock.tsx`
- Create: `components/sections/services/StickyPanel.tsx`

- [ ] **Step 1: ServiceBlock.tsx**

```tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { CountUp } from '@/components/primitives/CountUp'
import { services } from '@/content/copy'

type Service = typeof services.items[0]

interface Props {
  service: Service
  index: number
}

export function ServiceBlock({ service, index }: Props) {
  const ref = useRef<HTMLElement>(null)
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      id={service.id}
      className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto scroll-mt-20"
      data-service={service.id}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>

        {/* Image */}
        <RevealOnScroll className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${isEven ? '' : 'lg:col-start-2'}`} delay={0.1}>
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(42,31,45,0.3) 0%, transparent 60%)' }}
          />
        </RevealOnScroll>

        {/* Text */}
        <div className={isEven ? '' : 'lg:col-start-1 lg:row-start-1'}>
          <RevealOnScroll>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40 mb-2">
              {service.duration}
            </p>
          </RevealOnScroll>
          <RevealOnScroll delay={0.08}>
            <h2 className="font-display font-light text-4xl lg:text-5xl text-ink tracking-tight mb-2">
              {service.name}
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={0.12}>
            <p className="font-display font-light text-2xl text-rose mb-8">
              from £<CountUp target={service.price} />
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.16}>
            <p className="font-sans text-base text-ink/70 leading-relaxed mb-8">
              {service.description}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink/40 mb-4">
              What's included
            </p>
            <ul className="flex flex-col gap-2">
              {service.includes.map((item) => (
                <li key={item} className="font-sans text-sm text-ink/70 flex gap-3">
                  <span className="text-rose flex-shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: StickyPanel.tsx**

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { services } from '@/content/copy'

export function StickyPanel() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const sections = document.querySelectorAll('[data-service]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.getAttribute('data-service'))
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const activeService = services.items.find((s) => s.id === active)

  return (
    <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        {activeService && (
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-sans text-xs uppercase tracking-[0.18em] text-ink/30 [writing-mode:vertical-rl] rotate-180">
              {activeService.name}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  )
}
```

- [ ] **Step 3: app/services/page.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { ServiceBlock } from '@/components/sections/services/ServiceBlock'
import { StickyPanel } from '@/components/sections/services/StickyPanel'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { services } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description: 'Mobile ASMR services in London: Scalp & Hair, Light Touch, Extended, and Combo sessions. From £120.',
}

export default function ServicesPage() {
  return (
    <>
      <StickyPanel />

      <div className="pt-32 pb-8 px-6 lg:px-12 max-w-7xl mx-auto">
        <RevealOnScroll>
          <h1 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight mb-6">
            Services
          </h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <p className="font-sans text-base text-ink/60 max-w-xl leading-relaxed">
            {services.intro}
          </p>
        </RevealOnScroll>
      </div>

      {services.items.map((service, i) => (
        <ServiceBlock key={service.id} service={service} index={i} />
      ))}

      <div className="py-24 text-center px-6">
        <RevealOnScroll>
          <p className="font-display font-light text-3xl text-ink mb-8">
            Not sure which to choose?
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <MagneticButton className="inline-block">
            <Link
              href="/enquire"
              className="font-sans text-sm bg-ink text-bg px-8 py-3 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
            >
              Enquire — Elizabeth will advise
            </Link>
          </MagneticButton>
        </RevealOnScroll>
      </div>
    </>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add app/services/ components/sections/services/
git commit -m "feat: add Services page with alternating blocks and sticky side panel"
```

---

## Task 7: Policies page

**Files:**
- Create: `app/policies/page.tsx`
- Create: `components/sections/policies/TableOfContents.tsx`

- [ ] **Step 1: TableOfContents.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { policies } from '@/content/copy'

export function TableOfContents() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    policies.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="hidden lg:block sticky top-28 self-start" aria-label="Page sections">
      <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/30 mb-4">Contents</p>
      <ol className="flex flex-col gap-3">
        {policies.sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`font-sans text-sm transition-colors duration-200 ${
                active === section.id ? 'text-ink' : 'text-ink/40 hover:text-ink/70'
              }`}
            >
              {section.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
```

- [ ] **Step 2: app/policies/page.tsx**

```tsx
import type { Metadata } from 'next'
import { TableOfContents } from '@/components/sections/policies/TableOfContents'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { policies } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Policies',
  description: 'Soothe and Scratch policies: women-only service, cancellation, hygiene and safety, and privacy.',
}

export default function PoliciesPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <RevealOnScroll className="mb-16">
        <h1 className="font-display font-light text-5xl lg:text-6xl text-ink tracking-tight">
          Policies
        </h1>
      </RevealOnScroll>

      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-16 items-start">
        <TableOfContents />

        <div className="max-w-prose flex flex-col gap-16">
          {policies.sections.map((section, i) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <RevealOnScroll delay={i * 0.04}>
                <h2 className="font-display font-light text-3xl text-ink mb-6">
                  {section.title}
                </h2>
                {Array.isArray(section.body) ? (
                  <ul className="flex flex-col gap-3">
                    {section.body.map((item, j) => (
                      <li key={j} className="font-sans text-base text-ink/70 leading-relaxed flex gap-3">
                        <span className="text-rose flex-shrink-0 mt-1">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-sans text-base text-ink/70 leading-relaxed">
                    {section.body}
                  </p>
                )}
              </RevealOnScroll>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add app/policies/ components/sections/policies/
git commit -m "feat: add Policies page with sticky table of contents"
```

---

## Task 8: 404 page

**Files:**
- Create: `app/not-found.tsx`

- [ ] **Step 1: Write not-found.tsx**

```tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="font-sans text-xs uppercase tracking-[0.18em] text-ink/30 mb-8">404</p>
      <h1 className="font-display font-light text-5xl lg:text-6xl text-ink tracking-tight mb-6">
        This page is resting.
      </h1>
      <Link
        href="/"
        className="font-sans text-sm text-ink/50 hover:text-ink transition-colors underline underline-offset-4"
      >
        Return home
      </Link>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: add custom 404 page"
```

---

## Task 9: Full build verification

- [ ] **Step 1: Run full test suite**

```bash
pnpm test
```

Expected: all tests pass.

- [ ] **Step 2: Run TypeScript check**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Build**

```bash
pnpm build
```

Expected: build succeeds.

- [ ] **Step 4: Walk all pages on dev server**

```bash
pnpm dev
```

Visit each page:
- [ ] `/about` — hero image, bio with drop cap, count-up stats, values with click-reveal
- [ ] `/services` — 4 service blocks alternating layout, sticky side panel, count-up prices
- [ ] `/policies` — long-form, sticky ToC highlights active section on scroll
- [ ] `/404` (navigate to any non-existent path) — minimal calm page
- [ ] `/enquire` — form works, validation shows errors, FAQ accordion opens/closes
- [ ] Submit enquiry form with real env keys and verify email received

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: Plan B complete — all inner pages, enquire form, and email API"
```

---

## Plan B Complete

**Milestone delivered:** All inner pages built (About, Services, Policies, 404, Enquire) with working email API. The full site is navigable. Proceed to Plan C for the Experience page, Journal stub, animation polish, and SEO.
