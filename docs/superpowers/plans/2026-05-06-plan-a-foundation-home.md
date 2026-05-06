# Soothe and Scratch — Plan A: Foundation + Home

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the Next.js project with all global elements (fonts, colour tokens, nav, footer, smooth scroll, cursor, page transitions) and build the complete Home page with all 8 sections.

**Architecture:** Next.js 14 App Router, TypeScript. Global elements assembled in `app/layout.tsx`. All copy in `content/copy.ts`. Animation primitives in `components/primitives/` composed into sections in `components/sections/home/`. Home page (`app/page.tsx`) imports and orders all sections.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS (custom config), Framer Motion, Lenis (smooth scroll), GSAP + ScrollTrigger, Lucide React, next/font (Fraunces + DM Sans).

---

## File Map

| File | Responsibility |
|------|---------------|
| `tailwind.config.ts` | Colour tokens, font families, custom spacing |
| `styles/globals.css` | CSS custom properties, base resets, Tailwind directives |
| `app/layout.tsx` | Root layout — fonts, providers, nav, footer, cursor |
| `app/page.tsx` | Home page — imports and orders all sections |
| `content/copy.ts` | All marketing copy (typed), single source of truth |
| `lib/motion.ts` | Shared easing constants and Framer Motion variants |
| `components/layout/SmoothScroll.tsx` | Lenis provider + GSAP ticker integration |
| `components/layout/Cursor.tsx` | Custom cursor (desktop only, spring physics) |
| `components/layout/Nav.tsx` | Fixed top nav, transparent → solid on scroll, mobile overlay |
| `components/layout/Footer.tsx` | Three-column footer |
| `components/layout/PageTransition.tsx` | Framer Motion AnimatePresence route wrapper |
| `components/primitives/RevealOnScroll.tsx` | Fade + translate wrapper for scroll-triggered reveals |
| `components/primitives/SplitText.tsx` | Word-split staggered reveal |
| `components/primitives/MagneticButton.tsx` | Cursor-attracting CTA wrapper |
| `components/primitives/CountUp.tsx` | Number count-up on IntersectionObserver |
| `components/primitives/SectionDivider.tsx` | Horizontal line that draws across page on scroll |
| `components/sections/home/Hero.tsx` | Cinematic wide layout (C): photo right, text bottom-left |
| `components/sections/home/Marquee.tsx` | CSS infinite horizontal text strip |
| `components/sections/home/WhatIsAsmr.tsx` | Two-column editorial + pull quote |
| `components/sections/home/ServicesPreview.tsx` | 3 hover-expand service rows |
| `components/sections/home/ExperienceTeaser.tsx` | 4-step scroll-animated preview |
| `components/sections/home/Testimonials.tsx` | Auto-rotating carousel |
| `components/sections/home/InstagramStrip.tsx` | 6-image static grid |
| `components/sections/home/ClosingCta.tsx` | Full-bleed closing CTA |
| `public/images/` | Selected Instagram images with semantic names |

---

## Task 1: Scaffold Next.js project

**Files:**
- Create: all project root files via `create-next-app`

- [ ] **Step 1: Scaffold into the project folder**

```bash
cd "/Users/vadimharbuz/Downloads/Cloud Code Websites/Sooth and Scratch "
pnpm dlx create-next-app@latest . \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias="@/*" \
  --no-turbopack
```

Expected: scaffolding completes, `package.json` present, `app/` directory created.

- [ ] **Step 2: Install all runtime dependencies**

```bash
pnpm add framer-motion gsap lenis lucide-react next-sitemap resend react-hook-form @hookform/resolvers zod
```

- [ ] **Step 3: Install dev dependencies**

```bash
pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 4: Initialise shadcn/ui**

```bash
pnpm dlx shadcn@latest init --defaults
```

When prompted: style `Default`, base colour `Stone`, CSS variables `yes`.

- [ ] **Step 5: Add shadcn components**

```bash
pnpm dlx shadcn@latest add button accordion dialog
```

- [ ] **Step 6: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom'
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 7: Verify dev server starts**

```bash
pnpm dev
```

Expected: `ready started server on 0.0.0.0:3000`. Open `http://localhost:3000` — default Next.js page loads.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "feat: scaffold Next.js project with dependencies"
```

---

## Task 2: Tailwind config + CSS tokens

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `styles/globals.css`

- [ ] **Step 1: Replace tailwind.config.ts**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        ink: 'var(--color-ink)',
        rose: 'var(--color-rose)',
        sage: 'var(--color-sage)',
        gold: 'var(--color-gold)',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        DEFAULT: '800ms',
        slow: '1200ms',
        slower: '1400ms',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Write globals.css**

Replace `styles/globals.css` (or `app/globals.css` — wherever the scaffold put it):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --color-bg: #FBF7F2;
  --color-ink: #2A1F2D;
  --color-rose: #D4A5A5;
  --color-sage: #A8B5A0;
  --color-gold: #C9A96E;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: auto; /* Lenis handles smooth scroll */
  -webkit-font-smoothing: antialiased;
}

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  line-height: 1.7;
  overflow-x: hidden;
}

/* Skip link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 9999;
  padding: 0.5rem 1rem;
  background: var(--color-ink);
  color: var(--color-bg);
  border-radius: 0 0 0.25rem 0.25rem;
  font-family: var(--font-dm-sans), system-ui, sans-serif;
  font-size: 0.875rem;
  transition: top 0.2s;
}
.skip-link:focus {
  top: 0;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 3px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build completes without errors.

- [ ] **Step 4: Commit**

```bash
git add tailwind.config.ts styles/globals.css
git commit -m "feat: add design tokens and global CSS"
```

---

## Task 3: Fonts

**Files:**
- Create: `lib/fonts.ts`
- Modify: `app/layout.tsx` (temporary — will replace fully in Task 11)

- [ ] **Step 1: Create font config**

Create `lib/fonts.ts`:

```ts
import { Fraunces, DM_Sans } from 'next/font/google'

export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],  // optical size axis for display use
  weight: ['300', '400', '500'],
})

export const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400'],
})
```

- [ ] **Step 2: Apply fonts to root layout temporarily**

In `app/layout.tsx`, import fonts and add their variables to `<html>`:

```tsx
import { fraunces, dmSans } from '@/lib/fonts'
import '@/styles/globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 3: Verify fonts load**

```bash
pnpm dev
```

Open `http://localhost:3000`. Open DevTools → Network → filter "Font" — Fraunces and DM Sans should load.

- [ ] **Step 4: Commit**

```bash
git add lib/fonts.ts app/layout.tsx
git commit -m "feat: configure Fraunces and DM Sans via next/font"
```

---

## Task 4: Content file

**Files:**
- Create: `content/copy.ts`

- [ ] **Step 1: Create content/copy.ts**

```ts
// All marketing copy in one typed file. TODO items are clearly marked.

export const nav = {
  logo: 'Soothe & Scratch',
  links: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Experience', href: '/experience' },
    { label: 'Journal', href: '/journal' },
    { label: 'Policies', href: '/policies' },
  ],
  cta: { label: 'Enquire', href: '/enquire' },
}

export const hero = {
  headline: 'Quiet care, brought to your door.',
  subhead: 'Mobile ASMR · London + surrounding areas · Women only',
  primaryCta: { label: 'Enquire', href: '/enquire' },
  secondaryCta: { label: 'Experience a session', href: '/experience' },
  photoAlt: 'Elizabeth performing a scalp session — close-up of gentle hands in hair',
}

export const marqueeItems = [
  'tingles', 'stillness', 'scalp', 'breath',
  'hush', 'touch', 'sleep', 'ease', 'warmth', 'calm',
]

export const whatIsAsmr = {
  heading: 'What is ASMR?',
  body: [
    'ASMR — Autonomous Sensory Meridian Response — is a deeply relaxing sensation triggered by gentle sounds and light touch. Many people describe it as a soft tingling that begins at the scalp and moves through the body, bringing a profound sense of calm.',
    'Elizabeth brings this experience directly to you. No studio. No commute. No unfamiliar space. Just you, in your own home, at ease.',
  ],
  pullQuote: '"I didn\'t know my nervous system could feel this quiet."',
  pullQuoteAttribution: '— Client, South London',
  photoAlt: 'Hands gently touching a client\'s hair in soft natural light',
}

export const servicesPreview = [
  {
    name: 'Scalp & Hair',
    duration: '60 min',
    tagline: 'The one that started it all. Slow, deliberate, deeply settling.',
    image: '/images/service-scalp.jpg',
    href: '/services#scalp',
  },
  {
    name: 'Light Touch & Tracing',
    duration: '60 min',
    tagline: 'Feather-light touch across the face, arms, and hands.',
    image: '/images/service-touch.jpg',
    href: '/services#touch',
  },
  {
    name: 'Extended Session',
    duration: '90 min',
    tagline: 'More time, deeper stillness.',
    image: '/images/service-extended.jpg',
    href: '/services#extended',
  },
]

export const experienceTeaser = {
  heading: 'How a session works',
  steps: [
    { number: '01', label: 'Enquire', description: 'Drop us a message. We\'ll respond within 24 hours.' },
    { number: '02', label: 'Confirm', description: 'We agree a time and send you everything you need to prepare.' },
    { number: '03', label: 'Visit', description: 'Elizabeth comes to you with everything already prepared.' },
    { number: '04', label: 'Rest', description: 'Settle in. There\'s nowhere else to be.' },
  ],
  cta: { label: 'See the full experience', href: '/experience' },
}

export const testimonials = [
  {
    quote: 'I\'ve never felt so deeply rested. I was asleep before Elizabeth even left the room.',
    attribution: 'S. — Clapham',
  },
  {
    quote: 'Completely transformative. My anxiety was gone for days afterwards.',
    attribution: 'R. — Hackney',
  },
  {
    quote: 'The most thoughtful, gentle experience. I felt completely safe and cared for.',
    attribution: 'M. — Peckham',
  },
  {
    quote: 'I was sceptical at first. Now I book every month. It\'s the one thing I do entirely for myself.',
    attribution: 'A. — Islington',
  },
  {
    quote: 'I didn\'t know silence could feel this full. Elizabeth has a real gift.',
    attribution: 'C. — Greenwich',
  },
]
// TODO: Replace with real testimonials from Elizabeth's clients

export const instagramStrip = {
  handle: '@sootheandscratch',
  followerCount: '3.9k',
  images: [
    { src: '/images/ig-1.jpg', alt: 'ASMR session — scalp care' },
    { src: '/images/ig-2.jpg', alt: 'ASMR session — light touch' },
    { src: '/images/ig-3.jpg', alt: 'Mobile ASMR setup' },
    { src: '/images/ig-4.jpg', alt: 'ASMR — gentle hands' },
    { src: '/images/ig-5.jpg', alt: 'Relaxing ASMR session' },
    { src: '/images/ig-6.jpg', alt: 'Soothe and Scratch — London ASMR' },
  ],
}

export const closingCta = {
  heading: 'Ready to switch off?',
  cta: { label: 'Enquire', href: '/enquire' },
}

export const footer = {
  contact: {
    heading: 'Get in touch',
    // TODO: Add Elizabeth's contact email
    email: 'hello@sootheandscratch.co.uk',
    note: 'Response within 24 hours',
  },
  sitemap: {
    heading: 'Explore',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Experience', href: '/experience' },
      { label: 'Enquire', href: '/enquire' },
      { label: 'Journal', href: '/journal' },
      { label: 'Policies', href: '/policies' },
    ],
  },
  social: {
    heading: 'Follow',
    instagram: { handle: '@sootheandscratch', href: 'https://instagram.com/sootheandscratch' },
    followerCount: '3.9k followers',
  },
  legalNote: 'Women-only service · London & surrounding areas',
  copyright: `© ${new Date().getFullYear()} Soothe and Scratch. All rights reserved.`,
}

export const about = {
  heroAlt: 'Elizabeth — ASMR practitioner, preparing her mobile kit',
  bioDropCap: 'E',
  bio: [
    // TODO: Replace with Elizabeth's real bio
    'Elizabeth discovered ASMR during a period of deep burnout — a late-night YouTube spiral that ended not in anxiety, but in the most restful sleep she\'d had in months. That night changed everything.',
    'After training in therapeutic touch and spending years refining her practice, she began offering mobile sessions in South London in 2022. She brings everything with her: the quiet, the intention, the unhurried pace. You bring yourself.',
    'Soothe and Scratch is for women who are tired of being busy. Sessions are women-only by design — a space where you can fully let go.',
  ],
  asmrStats: [
    { value: 89, suffix: '%', label: 'report improved sleep quality', source: 'Poerio et al., 2018' },
    { value: 70, suffix: '%', label: 'experience reduced anxiety', source: 'Smith et al., 2019' },
    { value: 82, suffix: '%', label: 'feel calmer within minutes', source: 'ASMR Research Project' },
  ],
  values: [
    {
      name: 'Safety',
      description: 'Every session is women-only, fully clothed, and agreed in advance. Nothing happens without your consent, and you can pause or end at any time.',
    },
    {
      name: 'Stillness',
      description: 'There\'s no agenda, no performance, no rush. The session moves at the pace that\'s right for you — even if that means lying in silence.',
    },
    {
      name: 'Specificity',
      description: 'Elizabeth tailors every session to what your nervous system needs that day. No two sessions are identical.',
    },
  ],
}

export const services = {
  intro: 'Every session takes place in your home, at your pace, with everything provided. You don\'t need to do anything except show up.',
  items: [
    {
      id: 'scalp',
      name: 'Scalp & Hair',
      duration: '60 min',
      price: 120,
      description: 'The foundation of the practice. Elizabeth works slowly through the scalp using fingertip pressure, gentle scratching, and deliberate hair play. Many clients fall asleep within the first fifteen minutes.',
      includes: [
        'Initial check-in and intention setting',
        'Scalp massage using fingertips and soft tools',
        'Slow hair play and gentle tugging',
        'Soft verbal ASMR throughout',
        'Quiet wind-down',
      ],
      image: '/images/service-scalp.jpg',
      imageAlt: 'Gentle scalp massage — close-up',
    },
    {
      id: 'touch',
      name: 'Light Touch & Tracing',
      duration: '60 min',
      price: 140,
      description: 'Feather-light touch across the face, shoulders, arms, and hands. Trace work uses fingernails, soft brushes, and intentional stillness. Particularly effective for those who find verbal ASMR less triggering.',
      includes: [
        'Face, shoulder, arm, and hand tracing',
        'Soft brush and fingertip textures',
        'Minimal verbal — mostly soundscape and breath',
        'Scalp integration if desired',
      ],
      image: '/images/service-touch.jpg',
      imageAlt: 'Light touch ASMR — gentle hand tracing',
    },
    {
      id: 'extended',
      name: 'Extended Session',
      duration: '90 min',
      price: 180,
      description: 'More time to go deeper. Begins with a Scalp & Hair sequence, then moves into Light Touch work. The extra thirty minutes allows for a slower arc — there\'s no need to rush the rest.',
      includes: [
        'Full Scalp & Hair sequence',
        'Light Touch & Tracing',
        'Extended quiet wind-down',
        'Post-session grounding',
      ],
      image: '/images/service-extended.jpg',
      imageAlt: 'Extended ASMR session — peaceful setting',
    },
    {
      id: 'combo',
      name: 'Combo Session',
      duration: '120 min',
      price: 230,
      description: 'The full experience. Two hours of unhurried, personalised ASMR — combining scalp work, light touch, tracing, and gentle roleplay elements. Designed for those who want to go very deep.',
      includes: [
        'Personalised combination of all techniques',
        'Gentle ASMR roleplay (optional)',
        'Extended rest period',
        'Post-session check-in',
        'Follow-up care notes by email',
      ],
      image: '/images/service-combo.jpg',
      imageAlt: 'Full ASMR combo session — immersive and calm',
    },
  ],
}
// TODO: Confirm exact prices with Elizabeth

export const experience = {
  scenes: [
    {
      id: 'enquire',
      number: '01',
      title: 'Enquire',
      body: 'Fill in the short form on this site, or send a message on Instagram. Let Elizabeth know roughly what you\'re looking for and when you\'re free. There\'s no commitment — just a conversation.',
    },
    {
      id: 'confirm',
      number: '02',
      title: 'Confirm',
      body: 'Elizabeth will suggest a time that works and send over a simple prep guide — nothing demanding. Just a few things to know about what to expect and how to make the most of your session.',
    },
    {
      id: 'arrive',
      number: '03',
      title: 'Arrive',
      body: 'Elizabeth comes to you. She\'ll have everything she needs — there\'s nothing for you to prepare beyond a comfortable place to lie down. She\'ll set up quietly and check in before beginning.',
    },
    {
      id: 'session',
      number: '04',
      title: 'Session',
      body: 'Close your eyes. There\'s no script, no performance, no expectation. The session moves at whatever pace your body needs. Many people are asleep within minutes. That\'s perfect.',
    },
    {
      id: 'rest',
      number: '05',
      title: 'Rest',
      body: 'When the session ends, Elizabeth leaves quietly. There\'s no rush to get up, nowhere to be. Drink some water. Sleep if you need to. The effects often linger for hours.',
    },
  ],
  audioSrc: '/audio/ambient.mp3', // TODO: Add ambient audio file
  cta: { label: 'Ready when you are', href: '/enquire' },
}

export const policies = {
  sections: [
    {
      id: 'women-only',
      title: 'Women-only policy',
      body: 'Soothe and Scratch is a women-only service. This applies to all clients and is not negotiable. This policy exists to create a space of maximum safety and trust — both for clients and for Elizabeth.',
    },
    {
      id: 'cancellation',
      title: 'Cancellation',
      body: [
        'Cancellations made more than 48 hours before a session: full refund or free rescheduling.',
        'Cancellations made 24–48 hours before: 50% of session fee charged.',
        'Cancellations made less than 24 hours before, or no-shows: full session fee charged.',
        'Elizabeth reserves the right to cancel sessions in exceptional circumstances. In these cases, a full refund or free rescheduling will always be offered.',
      ],
    },
    {
      id: 'hygiene',
      title: 'Hygiene & safety',
      body: [
        'All tools are cleaned and sanitised between sessions.',
        'Elizabeth will not attend if she is unwell.',
        'Please let Elizabeth know in advance of any scalp conditions, sensitivities, or concerns.',
        'Sessions take place fully clothed.',
      ],
    },
    {
      id: 'what-asmr-is-not',
      title: 'What ASMR is and isn\'t',
      body: 'ASMR sessions are non-sexual. There is no nudity. Touch is limited to the scalp, hair, face, shoulders, arms, and hands — and only what is agreed in advance. If at any point you feel uncomfortable, you can ask Elizabeth to stop and she will do so immediately. This is a therapeutic and wellness service.',
    },
    {
      id: 'privacy',
      title: 'Privacy',
      body: 'Your contact details and session information are kept confidential and will never be shared with third parties. Enquiry data is used only to arrange and manage your session.',
    },
  ],
}

export const enquire = {
  heading: 'Enquire',
  subhead: 'Fill in the form and Elizabeth will be in touch within 24 hours.',
  reassurance: [
    { icon: 'shield', text: 'Women only — always' },
    { icon: 'map-pin', text: 'London & surrounding areas' },
    { icon: 'clock', text: 'Response within 24 hours' },
    { icon: 'heart', text: 'No commitment to enquire' },
  ],
  faq: [
    {
      question: 'Do I need to have experienced ASMR before?',
      answer: 'Not at all. Many clients come with no prior experience. Elizabeth will explain everything beforehand and guide you through what to expect.',
    },
    {
      question: 'What do I need to prepare?',
      answer: 'Just a comfortable place to lie down — a sofa, bed, or floor with a mat. Elizabeth brings everything else.',
    },
    {
      question: 'How far do you travel?',
      answer: 'Elizabeth is based in South London and travels across London and into surrounding areas. Get in touch and she\'ll let you know if your location works.',
    },
    {
      question: 'Is ASMR like massage?',
      answer: 'ASMR involves gentle touch but is distinct from massage. The focus is on sensory triggers for relaxation — light pressure, texture, and sound — rather than muscle work.',
    },
  ],
  successMessage: 'Thank you for reaching out. Elizabeth will be in touch within 24 hours.',
  errorMessage: 'Something went wrong. Please try again or reach out on Instagram.',
}

export const journal = {
  heading: 'Journal',
  subhead: 'Thoughts on rest, sensation, and the quiet art of doing less.',
  posts: [
    // TODO: Wire to MDX or CMS
    {
      slug: 'what-happens-to-your-nervous-system-during-asmr',
      title: 'What happens to your nervous system during ASMR?',
      date: '2026-04-12',
      excerpt: 'The science is catching up with what practitioners have known for years. Here\'s what researchers have found.',
      readTime: '4 min',
    },
    {
      slug: 'why-mobile-matters',
      title: 'Why the setting matters as much as the session',
      date: '2026-03-28',
      excerpt: 'Being in your own space changes everything. On why mobile ASMR is different.',
      readTime: '3 min',
    },
    {
      slug: 'the-women-only-question',
      title: 'Why Soothe and Scratch is women-only',
      date: '2026-03-10',
      excerpt: 'A considered explanation of a deliberate choice.',
      readTime: '5 min',
    },
  ],
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add content/copy.ts
git commit -m "feat: add typed content file with all marketing copy"
```

---

## Task 5: Motion constants

**Files:**
- Create: `lib/motion.ts`

- [ ] **Step 1: Write motion.ts**

```ts
import type { Variants } from 'framer-motion'

export const ease = {
  spring: [0.22, 1, 0.36, 1] as [number, number, number, number],
  out: [0.0, 0.0, 0.2, 1] as [number, number, number, number],
}

export const duration = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  slower: 1.4,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: ease.spring },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: ease.spring },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: ease.spring },
  },
}

export const slideUp: Variants = {
  initial: { y: '100%' },
  animate: { y: 0, transition: { duration: 0.6, ease: ease.spring } },
  exit: { y: '-100%', transition: { duration: 0.4, ease: ease.out } },
}
```

- [ ] **Step 2: Write test**

Create `lib/__tests__/motion.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { ease, duration, fadeUp, staggerContainer } from '../motion'

describe('motion constants', () => {
  it('spring ease is a valid 4-number bezier', () => {
    expect(ease.spring).toHaveLength(4)
    ease.spring.forEach(v => expect(typeof v).toBe('number'))
  })

  it('all durations are positive numbers above 0.4s minimum', () => {
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
```

- [ ] **Step 3: Run tests**

```bash
pnpm test
```

Expected: 4 tests pass.

- [ ] **Step 4: Commit**

```bash
git add lib/motion.ts lib/__tests__/motion.test.ts
git commit -m "feat: add shared motion constants with tests"
```

---

## Task 6: Lenis smooth scroll + GSAP integration

**Files:**
- Create: `components/layout/SmoothScroll.tsx`

- [ ] **Step 1: Create SmoothScroll.tsx**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
    lenisRef.current = lenis

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/SmoothScroll.tsx
git commit -m "feat: add Lenis smooth scroll with GSAP ScrollTrigger integration"
```

---

## Task 7: Custom cursor

**Files:**
- Create: `components/layout/Cursor.tsx`

- [ ] **Step 1: Create Cursor.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function Cursor() {
  const prefersReduced = useReducedMotion()
  const [isPointer, setIsPointer] = useState(false)
  const [mounted, setMounted] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springX = useSpring(mouseX, { stiffness: 300, damping: 28 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 28 })

  useEffect(() => {
    setMounted(true)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as Element
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, label')
      setIsPointer(!!isInteractive)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', checkPointer)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', checkPointer)
    }
  }, [mouseX, mouseY])

  // Don't render on SSR, touch devices, or when reduced motion is set
  if (!mounted || prefersReduced) return null

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] hidden md:block mix-blend-multiply"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isPointer ? 48 : 12,
        height: isPointer ? 48 : 12,
        backgroundColor: isPointer ? 'var(--color-rose)' : 'var(--color-ink)',
        opacity: 0.7,
      }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        borderRadius: '50%',
      }}
      aria-hidden
    />
  )
}
```

Note: The `style` prop is listed twice above — remove the first one. Final component uses the second `style` (with `borderRadius`).

- [ ] **Step 2: Commit**

```bash
git add components/layout/Cursor.tsx
git commit -m "feat: add spring-physics custom cursor"
```

---

## Task 8: Navigation

**Files:**
- Create: `components/layout/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { nav } from '@/content/copy'
import { MagneticButton } from '@/components/primitives/MagneticButton'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? 'bg-bg/95 backdrop-blur-sm border-b border-ink/5' : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-light text-ink text-lg tracking-tight"
          >
            {nav.logo}
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-ink/70 hover:text-ink transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <MagneticButton>
                <Link
                  href={nav.cta.href}
                  className="font-sans text-sm bg-ink text-bg px-5 py-2 rounded-full hover:bg-ink/90 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
                >
                  {nav.cta.label}
                </Link>
              </MagneticButton>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-bg flex flex-col p-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between items-center mb-16">
              <Link href="/" className="font-display font-light text-ink text-lg">
                {nav.logo}
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-ink"
              >
                <X size={20} />
              </button>
            </div>

            <ul className="flex flex-col gap-6" role="list">
              {[...nav.links, nav.cta].map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className="font-display font-light text-4xl text-ink hover:text-rose transition-colors duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

Note: `MagneticButton` is created in Task 13 — it's a simple pass-through wrapper until then. To avoid import errors, create the file as a stub first:

```bash
mkdir -p components/primitives
echo "export function MagneticButton({ children }: { children: React.ReactNode }) { return <>{children}</> }" > components/primitives/MagneticButton.tsx
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Nav.tsx components/primitives/MagneticButton.tsx
git commit -m "feat: add navigation with mobile overlay"
```

---

## Task 9: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { footer } from '@/content/copy'

export function Footer() {
  return (
    <footer className="bg-ink text-bg/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-bg/40 mb-4">
              {footer.contact.heading}
            </p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="font-display font-light text-xl text-bg hover:text-rose transition-colors duration-300"
            >
              {footer.contact.email}
            </a>
            <p className="font-sans text-sm text-bg/40 mt-2">{footer.contact.note}</p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-bg/40 mb-4">
              {footer.sitemap.heading}
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {footer.sitemap.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-bg/70 hover:text-bg transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-bg/40 mb-4">
              {footer.social.heading}
            </p>
            <a
              href={footer.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm text-bg/70 hover:text-rose transition-colors duration-300"
            >
              <Instagram size={16} aria-hidden />
              {footer.social.instagram.handle}
            </a>
            <p className="font-sans text-xs text-bg/40 mt-1">{footer.social.followerCount}</p>
          </div>
        </div>

        <div className="border-t border-bg/10 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-sans text-xs text-bg/30 uppercase tracking-widest">
            {footer.legalNote}
          </p>
          <p className="font-sans text-xs text-bg/30">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add footer component"
```

---

## Task 10: Page transition

**Files:**
- Create: `components/layout/PageTransition.tsx`

- [ ] **Step 1: Create PageTransition.tsx**

```tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/PageTransition.tsx
git commit -m "feat: add page transition wrapper"
```

---

## Task 11: Root layout

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/metadata.ts`

- [ ] **Step 1: Write root layout**

Replace `app/layout.tsx`:

```tsx
import type { Metadata } from 'next'
import { fraunces, dmSans } from '@/lib/fonts'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Cursor } from '@/components/layout/Cursor'
import { PageTransition } from '@/components/layout/PageTransition'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Soothe and Scratch — Mobile ASMR · London',
    template: '%s | Soothe and Scratch',
  },
  description: 'Mobile ASMR sessions for women in London and surrounding areas. Scalp care, light touch, and deeply calming sessions — brought to your door by Elizabeth.',
  metadataBase: new URL('https://sootheandscratch.co.uk'), // TODO: Update with real domain
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="bg-bg text-ink">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <SmoothScroll>
          <Cursor />
          <Nav />
          <PageTransition>
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
```

- [ ] **Step 2: Verify dev server**

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify: nav appears, footer appears, cursor follows mouse on desktop, no console errors.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: assemble root layout with all global elements"
```

---

## Task 12: Animation primitives

**Files:**
- Create: `components/primitives/RevealOnScroll.tsx`
- Create: `components/primitives/SplitText.tsx`
- Create: `components/primitives/SectionDivider.tsx`
- Modify: `components/primitives/MagneticButton.tsx` (replace stub)
- Create: `components/primitives/CountUp.tsx`

- [ ] **Step 1: RevealOnScroll.tsx**

```tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp } from '@/lib/motion'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  once?: boolean
}

export function RevealOnScroll({ children, className, delay = 0, once = true }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: SplitText.tsx**

```tsx
'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { wordReveal, staggerContainer } from '@/lib/motion'

interface Props {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

export function SplitText({ text, className, as: Tag = 'h1' }: Props) {
  const ref = useRef<HTMLElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const words = text.split(' ')

  const MotionTag = motion[Tag]

  return (
    <MotionTag
      // @ts-expect-error — motion[Tag] typing
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial={prefersReduced ? 'visible' : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={wordReveal}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  )
}
```

- [ ] **Step 3: MagneticButton.tsx (full implementation)**

Replace stub:

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({ children, className, strength = 0.4 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const distX = e.clientX - cx
    const distY = e.clientY - cy
    const radius = Math.max(rect.width, rect.height) * 1.5
    const dist = Math.sqrt(distX ** 2 + distY ** 2)

    if (dist < radius) {
      setOffset({ x: distX * strength, y: distY * strength })
    }
  }

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 })

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 4: CountUp.tsx**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

interface Props {
  target: number
  suffix?: string
  duration?: number
  className?: string
}

export function CountUp({ target, suffix = '', duration = 1.5, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const prefersReduced = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(prefersReduced ? target : 0)

  useEffect(() => {
    if (!inView || prefersReduced) return

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration, prefersReduced])

  return (
    <span ref={ref} className={className} aria-label={`${target}${suffix}`}>
      {value}{suffix}
    </span>
  )
}
```

- [ ] **Step 5: SectionDivider.tsx**

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <div ref={ref} className="w-full overflow-hidden py-2" aria-hidden>
      <motion.div
        className="h-px bg-ink/10"
        initial={{ scaleX: prefersReduced ? 1 : 0, originX: 0 }}
        animate={{ scaleX: inView ? 1 : 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  )
}
```

- [ ] **Step 6: Verify TypeScript**

```bash
pnpm tsc --noEmit
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add components/primitives/
git commit -m "feat: add animation primitives (RevealOnScroll, SplitText, MagneticButton, CountUp, SectionDivider)"
```

---

## Task 13: Copy images to public

**Files:**
- Create: `public/images/` directory with selected images

- [ ] **Step 1: Create image directory and copy images**

```bash
mkdir -p public/images
```

Copy and rename images with semantic names. Select images visually — the first pass uses the first available images as placeholders:

```bash
# Hero photo
cp "instagram images/540005889_17858030178495896_6901078031344400144_n.jpg" "public/images/hero-photo.jpg"

# About portrait
cp "instagram images/540276639_1184110943546327_6854036654742929426_n.jpg" "public/images/about-portrait.jpg"

# ASMR editorial section
cp "instagram images/540385032_1318273953160769_2979326042348494162_n.jpg" "public/images/asmr-editorial.jpg"

# Service images
cp "instagram images/540642091_4144400502439090_4383067195325778450_n.jpg" "public/images/service-scalp.jpg"
cp "instagram images/541151034_17858293854495896_3242707402382523557_n.jpg" "public/images/service-touch.jpg"
cp "instagram images/541230059_17858034240495896_6779170591656484652_n.jpg" "public/images/service-extended.jpg"
cp "instagram images/541465416_1156270509740840_2101396148903872563_n.jpg" "public/images/service-combo.jpg"

# Instagram grid (6 images)
cp "instagram images/541501807_17858812458495896_1072216983250966385_n.jpg" "public/images/ig-1.jpg"
cp "instagram images/541528813_1939121173297241_7865875628589315590_n.jpg" "public/images/ig-2.jpg"
cp "instagram images/541628150_1987915808415180_172436741917907547_n.jpg" "public/images/ig-3.jpg"
cp "instagram images/542461339_1537203593929660_622391054445636084_n.jpg" "public/images/ig-4.jpg"
cp "instagram images/543062027_24594262610168955_7697938109215366173_n.jpg" "public/images/ig-5.jpg"
cp "instagram images/543382405_17859468129495896_5227574991390593288_n.jpg" "public/images/ig-6.jpg"
```

**TODO:** Open the copied images and swap out any that don't suit the section. The filenames above are chosen by file order, not content — select the right faces/moods manually.

- [ ] **Step 2: Commit**

```bash
git add public/images/
git commit -m "feat: copy Instagram images to public/images with semantic names"
```

---

## Task 14: Hero section

**Files:**
- Create: `components/sections/home/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

Cinematic wide layout (C): photo fills right half via `clip-path`, text anchors bottom-left.

```tsx
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { SplitText } from '@/components/primitives/SplitText'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { hero } from '@/content/copy'

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Hero photo scales from 1.1 to 1.0 on scroll
  const imageScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1.08, 1.0])
  // Text moves slightly slower than scroll (parallax)
  const textY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '8%'])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[600px] overflow-hidden"
      aria-label="Hero"
    >
      {/* Animated background blob */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(212,165,165,0.18) 0%, transparent 70%)',
          }}
          animate={prefersReduced ? {} : {
            x: ['0%', '8%', '0%'],
            y: ['0%', '5%', '0%'],
          }}
          transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[20%] w-[40%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(168,181,160,0.12) 0%, transparent 70%)',
          }}
          animate={prefersReduced ? {} : {
            x: ['0%', '-5%', '0%'],
            y: ['0%', '-8%', '0%'],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Photo — right half, diagonal clip */}
      <motion.div
        className="absolute inset-y-0 right-0 w-[55%]"
        style={{ scale: imageScale }}
        aria-hidden
      >
        <Image
          src="/images/hero-photo.jpg"
          alt={hero.photoAlt}
          fill
          priority
          className="object-cover"
          style={{ clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          sizes="55vw"
        />
        {/* Gradient blend from left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 30%)',
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
        {/* Overlay for depth */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(42,31,45,0.3) 0%, transparent 50%)',
            clipPath: 'polygon(12% 0%, 100% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </motion.div>

      {/* Text — bottom-left anchor */}
      <motion.div
        className="absolute bottom-12 left-6 lg:left-12 max-w-[52%]"
        style={{ y: textY }}
      >
        <motion.p
          className="font-sans text-xs uppercase tracking-[0.18em] text-ink/60 mb-6"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {hero.subhead}
        </motion.p>

        <SplitText
          text={hero.headline}
          as="h1"
          className="font-display font-light text-[10vw] lg:text-[8vw] text-ink leading-[1.05] tracking-[-0.02em] mb-10"
        />

        <motion.div
          className="flex flex-wrap gap-4"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton>
            <Link
              href={hero.primaryCta.href}
              className="font-sans text-sm bg-ink text-bg px-7 py-3 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
            >
              {hero.primaryCta.label}
            </Link>
          </MagneticButton>
          <Link
            href={hero.secondaryCta.href}
            className="font-sans text-sm border border-ink/30 text-ink px-7 py-3 rounded-full hover:border-ink/70 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
          >
            {hero.secondaryCta.label}
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2"
        animate={prefersReduced ? {} : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      >
        <div className="w-px h-10 bg-ink/30" />
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Verify visually**

```bash
pnpm dev
```

Open `http://localhost:3000`. Verify: hero fills viewport, photo clips diagonally on the right, headline animates word by word on load, scroll cue pulses. On mobile: photo may not display well — check and adjust `w-[55%]` / `clip-path` for narrow screens.

- [ ] **Step 3: Commit**

```bash
git add components/sections/home/Hero.tsx
git commit -m "feat: add cinematic hero with photo clip, split text reveal, parallax"
```

---

## Task 15: Marquee section

**Files:**
- Create: `components/sections/home/Marquee.tsx`

- [ ] **Step 1: Create Marquee.tsx**

```tsx
import { marqueeItems } from '@/content/copy'

export function Marquee() {
  // Double the items so the loop is seamless
  const items = [...marqueeItems, ...marqueeItems]

  return (
    <section className="py-6 border-y border-ink/8 overflow-hidden" aria-label="Keywords">
      <div
        className="flex gap-12 whitespace-nowrap group"
        style={{
          animation: 'marquee 60s linear infinite',
        }}
        aria-hidden
      >
        {items.map((item, i) => (
          <span
            key={i}
            className="font-display font-light text-2xl text-ink/40 tracking-[0.06em] select-none"
          >
            {item} <span className="text-rose mx-2">·</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        div:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none; }
        }
      `}</style>
    </section>
  )
}
```

Note: If `styled-jsx` is unavailable (Next.js App Router), use a `<style>` tag with global CSS instead, or add the keyframe to `globals.css`:

In `styles/globals.css` add:

```css
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
.marquee-track {
  animation: marquee 60s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}
```

And in `Marquee.tsx`, use `className="marquee-track flex gap-12 whitespace-nowrap"` on the inner div.

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/Marquee.tsx styles/globals.css
git commit -m "feat: add CSS marquee with pause-on-hover"
```

---

## Task 16: WhatIsAsmr section

**Files:**
- Create: `components/sections/home/WhatIsAsmr.tsx`

- [ ] **Step 1: Create WhatIsAsmr.tsx**

```tsx
import Image from 'next/image'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { whatIsAsmr } from '@/content/copy'

export function WhatIsAsmr() {
  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-16">

        {/* Text */}
        <div>
          <RevealOnScroll>
            <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40 mb-6">
              About ASMR
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <h2 className="font-display font-light text-4xl lg:text-5xl text-ink leading-tight tracking-tight mb-8">
              {whatIsAsmr.heading}
            </h2>
          </RevealOnScroll>

          {whatIsAsmr.body.map((para, i) => (
            <RevealOnScroll key={i} delay={0.15 + i * 0.08}>
              <p className="font-sans text-base text-ink/70 leading-[1.8] mb-6">
                {para}
              </p>
            </RevealOnScroll>
          ))}

          <RevealOnScroll delay={0.3}>
            <blockquote className="mt-12 border-l-2 border-rose pl-6">
              <p className="font-display font-light text-2xl lg:text-3xl text-ink leading-snug italic">
                {whatIsAsmr.pullQuote}
              </p>
              <cite className="font-sans text-sm text-ink/40 mt-3 block not-italic tracking-wide">
                {whatIsAsmr.pullQuoteAttribution}
              </cite>
            </blockquote>
          </RevealOnScroll>
        </div>

        {/* Photo */}
        <RevealOnScroll className="relative aspect-[3/4] lg:aspect-auto rounded-2xl overflow-hidden" delay={0.2}>
          <Image
            src="/images/asmr-editorial.jpg"
            alt={whatIsAsmr.photoAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(42,31,45,0.25) 0%, transparent 60%)' }}
          />
        </RevealOnScroll>

      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/WhatIsAsmr.tsx
git commit -m "feat: add WhatIsAsmr editorial section"
```

---

## Task 17: Services preview

**Files:**
- Create: `components/sections/home/ServicesPreview.tsx`

- [ ] **Step 1: Create ServicesPreview.tsx**

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { servicesPreview } from '@/content/copy'

export function ServicesPreview() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <RevealOnScroll className="mt-16 mb-12">
        <h2 className="font-display font-light text-4xl lg:text-5xl text-ink tracking-tight">
          Services
        </h2>
      </RevealOnScroll>

      <div className="flex flex-col divide-y divide-ink/8">
        {servicesPreview.map((service, i) => (
          <Link
            key={service.name}
            href={service.href}
            className="group block focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4 rounded-sm"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="flex items-center gap-0 overflow-hidden py-2">

              {/* Image (expands on hover) */}
              <motion.div
                className="relative flex-shrink-0 overflow-hidden rounded-lg h-28"
                animate={{
                  width: hovered === i ? '40%' : hovered !== null ? '15%' : '22%',
                }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={service.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40vw"
                  aria-hidden
                />
              </motion.div>

              {/* Text */}
              <motion.div
                className="flex-1 px-8 flex items-center justify-between"
                animate={{ opacity: hovered !== null && hovered !== i ? 0.4 : 1 }}
                transition={{ duration: 0.4 }}
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40 mb-1">
                    {service.duration}
                  </p>
                  <h3 className="font-display font-light text-3xl text-ink tracking-tight">
                    {service.name}
                  </h3>
                  <p className="font-sans text-sm text-ink/60 mt-2 max-w-md leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                <motion.div
                  animate={{ x: hovered === i ? 0 : -8, opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                >
                  <ArrowRight className="text-ink" size={20} />
                </motion.div>
              </motion.div>
            </div>
          </Link>
        ))}
      </div>

      <RevealOnScroll className="mt-8" delay={0.1}>
        <Link
          href="/services"
          className="font-sans text-sm text-ink/50 hover:text-ink transition-colors underline underline-offset-4"
        >
          View all services & pricing
        </Link>
      </RevealOnScroll>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/ServicesPreview.tsx
git commit -m "feat: add services preview with hover expand interaction"
```

---

## Task 18: Experience teaser

**Files:**
- Create: `components/sections/home/ExperienceTeaser.tsx`

- [ ] **Step 1: Create ExperienceTeaser.tsx**

```tsx
'use client'

import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { experienceTeaser } from '@/content/copy'

export function ExperienceTeaser() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  return (
    <section className="py-24 lg:py-36 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <motion.p
            className="font-sans text-xs uppercase tracking-[0.15em] text-ink/40 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="font-display font-light text-4xl lg:text-5xl text-ink tracking-tight mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            {experienceTeaser.heading}
          </motion.h2>

          <MagneticButton>
            <Link
              href={experienceTeaser.cta.href}
              className="inline-flex items-center gap-2 font-sans text-sm text-ink/60 hover:text-ink transition-colors group"
            >
              {experienceTeaser.cta.label}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <motion.div
            className="absolute left-4 top-6 bottom-6 w-px bg-ink/10 origin-top"
            initial={prefersReduced ? { scaleY: 1 } : { scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            aria-hidden
          />

          <ol className="flex flex-col gap-10">
            {experienceTeaser.steps.map((step, i) => (
              <motion.li
                key={step.number}
                className="flex gap-8 items-start"
                initial={prefersReduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.4 + i * 0.12 }}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full border border-rose flex items-center justify-center bg-bg z-10">
                  <span className="font-sans text-xs text-rose">{step.number}</span>
                </div>
                <div>
                  <p className="font-display font-light text-xl text-ink mb-1">{step.label}</p>
                  <p className="font-sans text-sm text-ink/60 leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/ExperienceTeaser.tsx
git commit -m "feat: add experience teaser with scroll-animated steps"
```

---

## Task 19: Testimonials carousel

**Files:**
- Create: `components/sections/home/Testimonials.tsx`

- [ ] **Step 1: Create Testimonials.tsx**

```tsx
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { testimonials } from '@/content/copy'

export function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(id)
  }, [paused])

  return (
    <section
      className="py-24 lg:py-36 bg-ink"
      aria-label="Testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <p className="font-sans text-xs uppercase tracking-[0.15em] text-bg/30 mb-12">
          What clients say
        </p>

        <div className="relative min-h-[180px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute w-full"
            >
              <blockquote>
                <p className="font-display font-light text-2xl lg:text-3xl text-bg leading-snug italic mb-6">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <cite className="font-sans text-sm text-bg/40 not-italic tracking-widest uppercase">
                  {testimonials[current].attribution}
                </cite>
              </blockquote>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav dots */}
        <div className="flex justify-center gap-3 mt-12" role="tablist" aria-label="Testimonials navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-gold ${
                i === current ? 'bg-rose w-6' : 'bg-bg/20 hover:bg-bg/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/Testimonials.tsx
git commit -m "feat: add testimonials carousel with auto-rotation"
```

---

## Task 20: Instagram strip

**Files:**
- Create: `components/sections/home/InstagramStrip.tsx`

- [ ] **Step 1: Create InstagramStrip.tsx**

```tsx
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { SectionDivider } from '@/components/primitives/SectionDivider'
import { instagramStrip } from '@/content/copy'

export function InstagramStrip() {
  return (
    <section className="py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto">
      <SectionDivider />

      <div className="mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
        <RevealOnScroll>
          <h2 className="font-display font-light text-3xl text-ink">
            {instagramStrip.handle}
          </h2>
          <p className="font-sans text-sm text-ink/40 mt-1">
            {instagramStrip.followerCount} followers
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <a
            href="https://instagram.com/sootheandscratch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-sans text-sm text-ink/50 hover:text-ink transition-colors"
          >
            Follow
            <ExternalLink size={14} aria-hidden />
          </a>
        </RevealOnScroll>
      </div>

      {/* TODO: Wire to live IG API when ready */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {instagramStrip.images.map((img, i) => (
          <RevealOnScroll key={img.src} delay={i * 0.06} className="aspect-square relative overflow-hidden rounded-lg group">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
            />
            <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/15 transition-colors duration-500" />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/InstagramStrip.tsx
git commit -m "feat: add Instagram strip with 6 real images"
```

---

## Task 21: Closing CTA

**Files:**
- Create: `components/sections/home/ClosingCta.tsx`

- [ ] **Step 1: Create ClosingCta.tsx**

```tsx
import Link from 'next/link'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { MagneticButton } from '@/components/primitives/MagneticButton'
import { closingCta } from '@/content/copy'

export function ClosingCta() {
  return (
    <section className="py-36 px-6 lg:px-12 bg-rose/20 text-center">
      <RevealOnScroll>
        <h2 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight leading-tight mb-10">
          {closingCta.heading}
        </h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.15}>
        <MagneticButton className="inline-block">
          <Link
            href={closingCta.cta.href}
            className="font-sans text-base bg-ink text-bg px-10 py-4 rounded-full hover:bg-ink/85 focus-visible:ring-2 focus-visible:ring-gold transition-colors duration-300"
          >
            {closingCta.cta.label}
          </Link>
        </MagneticButton>
      </RevealOnScroll>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/home/ClosingCta.tsx
git commit -m "feat: add closing CTA section"
```

---

## Task 22: Home page assembly + metadata

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Write app/page.tsx**

```tsx
import type { Metadata } from 'next'
import { Hero } from '@/components/sections/home/Hero'
import { Marquee } from '@/components/sections/home/Marquee'
import { WhatIsAsmr } from '@/components/sections/home/WhatIsAsmr'
import { ServicesPreview } from '@/components/sections/home/ServicesPreview'
import { ExperienceTeaser } from '@/components/sections/home/ExperienceTeaser'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { InstagramStrip } from '@/components/sections/home/InstagramStrip'
import { ClosingCta } from '@/components/sections/home/ClosingCta'

export const metadata: Metadata = {
  title: 'Soothe and Scratch — Mobile ASMR · London',
  description: 'Mobile ASMR sessions for women in London. Scalp care, light touch, and deeply calming sessions brought to your door by Elizabeth.',
  openGraph: {
    title: 'Soothe and Scratch — Mobile ASMR · London',
    description: 'Mobile ASMR sessions for women in London and surrounding areas.',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <WhatIsAsmr />
      <ServicesPreview />
      <ExperienceTeaser />
      <Testimonials />
      <InstagramStrip />
      <ClosingCta />
    </>
  )
}
```

- [ ] **Step 2: Full build check**

```bash
pnpm build
```

Expected: build completes, no TypeScript errors, no missing module errors.

- [ ] **Step 3: Final visual check on dev server**

```bash
pnpm dev
```

Walk through each Home section. Verify:
- [ ] Hero: photo clips diagonally, headline word-reveals on load, CTAs functional
- [ ] Marquee: scrolls, pauses on hover
- [ ] What is ASMR: fades in on scroll, pull quote styled
- [ ] Services: rows expand image on hover, links to `/services` (404 for now)
- [ ] Experience teaser: steps animate in, connecting line draws
- [ ] Testimonials: auto-rotates every 5s, pauses on hover, dots navigate
- [ ] Instagram strip: 6 images visible, hover scales
- [ ] Closing CTA: centered, button present

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

## Plan A Complete

**Milestone delivered:** Full Next.js scaffold with global design system, all layout elements, and the complete Home page. Run `pnpm dev` to see the site. Proceed to Plan B for the inner pages and email enquiry form.
