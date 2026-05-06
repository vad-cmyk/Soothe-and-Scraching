# Soothe and Scratch — Website Design Spec
**Date:** 2026-05-06
**Status:** Approved

---

## Overview

Multi-page marketing website for Soothe and Scratch, a mobile ASMR service based in London. Women-only audience. The site should feel like the experience: quiet, slow, tactile, hypnotic. Wow factor comes from craft and restraint, not noise.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ App Router, TypeScript |
| Styling | Tailwind CSS (config, not CDN) |
| Animation | Framer Motion (React), GSAP + ScrollTrigger (scroll sequences) |
| Smooth scroll | Lenis |
| Components | shadcn/ui (Button, Dialog, Accordion) |
| Icons | Lucide |
| Forms | React Hook Form + Zod |
| Email | Resend (`/api/enquire` route handler) |
| Fonts | next/font — Fraunces (display) + DM Sans (body) |
| SEO | next-sitemap |
| Deploy | Vercel |

---

## Brand

**Practitioner:** Elizabeth

**Palette (CSS variables):**
- `--color-bg`: `#FBF7F2` — warm off-white background
- `--color-ink`: `#2A1F2D` — deep aubergine text
- `--color-rose`: `#D4A5A5` — dusty rose accent 1
- `--color-sage`: `#A8B5A0` — sage accent 2
- `--color-gold`: `#C9A96E` — muted gold, hover states

**Typography:**
- Display: Fraunces, weight 300–500, optical size on large headings
- Body: DM Sans, weight 300–400
- Heading tracking: `-0.03em`; body line-height: `1.7`
- Display sizes: 10–14vw on hero

**Motion:**
- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` (spring-like)
- Durations: 0.8s–1.4s; hero minimum 1.2s
- Reveals: fade + 20px translate, no bounce
- Animate only `transform` and `opacity` — never `transition-all`
- Honor `prefers-reduced-motion` everywhere

---

## Sitemap

| Route | Page |
|-------|------|
| `/` | Home |
| `/about` | About Elizabeth + What is ASMR |
| `/services` | Services and pricing |
| `/experience` | How a session works (showpiece) |
| `/journal` | Blog/journal index (stub) |
| `/enquire` | Booking enquiry form |
| `/policies` | Cancellation, hygiene, women-only |
| `not-found.tsx` | Custom 404 |

---

## Global Elements

### Navigation
- Fixed top nav, transparent over hero → solid `--color-bg` after scroll threshold
- Logo wordmark left (Fraunces), links + Enquire CTA right
- Mobile: full-screen overlay with staggered link reveal animation
- Persistent "Enquire" CTA (filled, `--color-ink`)

### Custom Cursor (desktop only)
- 12px soft circle, lags behind real cursor with spring physics
- Scales to 48px + color shift over interactive elements
- Falls back to native cursor on touch devices

### Smooth Scroll
- Lenis site-wide
- Disabled when `prefers-reduced-motion` is set

### Page Transitions
- Framer Motion `AnimatePresence` — panel slides up in `--color-rose` (~600ms) between routes

### Footer
- Three columns: contact (Elizabeth's email), sitemap links, social
- Instagram: @sootheandscratch (3.9k followers — social proof)
- Women-only notice, service area, copyright

---

## Pages

### Home (`/`)

**Hero — Cinematic wide (Layout C)**
- Full viewport height
- Right half: real Instagram photo, full-bleed, clipped with a diagonal `clip-path`
- Left half: headline anchors bottom-left — Fraunces, 10–14vw
- Headline text: "Quiet care, brought to your door."
- Word-stagger reveal: 60ms between words, 1.2s per word, fade + 20px translate
- Subhead (small caps): "Mobile ASMR · London + surrounding areas · Women only"
- CTAs: "Enquire" (filled) + "Experience a session" (ghost → `/experience`)
- Background: animated gradient blob (dusty rose + sage, very slow 20s+ loop)
- Scroll cue: animated downward line

**Section 2 — Marquee**
- Slow CSS infinite marquee (~60s loop): "tingles · stillness · scalp · breath · hush · touch · sleep · ease ·"
- Pauses on hover

**Section 3 — What is ASMR**
- Two-column editorial: prose left, Instagram photo right
- One pull quote in oversized Fraunces

**Section 4 — Services preview**
- Three services as horizontal full-width rows (Scalp & Hair, Light Touch, Extended — Combo Session omitted from home preview for space)
- Desktop hover: hovered row's image expands 30% → 60% width (slow ease); siblings compress
- Click → `/services`

**Section 5 — Experience teaser**
- 4-step animated preview: Enquire → Confirm → Visit → Rest
- Steps fade/slide in on scroll, connected by animated line that draws on scroll
- CTA: "See the full experience" → `/experience`

**Section 6 — Testimonials**
- Auto-rotating carousel, 5 anonymised quotes (large Fraunces)
- Format: "S. — Clapham"
- Manual nav dots, pauses on hover
- 5 placeholder testimonials — `TODO: replace with real quotes`

**Section 7 — Instagram strip**
- 6 real images from `instagram images/` folder
- "Follow @sootheandscratch" CTA
- `TODO: wire to live IG API when ready`

**Section 8 — Closing CTA**
- Full-bleed warm background
- Headline: "Ready to switch off?"
- Single Enquire button

---

### About (`/about`)

- Full-bleed portrait at top (real Instagram photo — hands/setup, no face required)
- Elizabeth's bio in editorial layout — large drop cap on first paragraph
- 3-paragraph placeholder bio with `TODO: replace` note
- "What is ASMR" deep-dive with three count-up stats on scroll: sleep quality, anxiety, focus
- Values section: Safety, Stillness, Specificity — hover-reveal descriptions
- Closing CTA → `/enquire`

---

### Services (`/services`)

Four services, alternating left/right image layout:
1. Scalp & Hair — 60 min — from £120
2. Light Touch & Tracing — 60 min — from £140
3. Extended Session — 90 min — from £180
4. Combo Session — 120 min — from £230

Each block: name, duration, description, included bullet prose, price counts up from 0 on scroll.

Sticky side panel on desktop: currently-viewed service name fades between as user scrolls.

Closing comparison strip + Enquire CTA.

`TODO: confirm exact prices with Elizabeth`

---

### Experience (`/experience`) — showpiece

**Structure:** GSAP ScrollTrigger pinned container. 5 scenes × ~100vh scroll each. Full-screen immersive layout (B) — each scene fills the viewport; ambient visual behind; copy anchors bottom-left matching hero composition.

**Scenes:**
1. **Enquire** — pulsing dot, message bubble illustration, DM/form copy
2. **Confirm** — calendar/clock motif, preparation copy
3. **Arrive** — door/threshold motif, arrival copy
4. **Session** — slow moving gradient + soft particle field, session copy; ambient audio toggle (UI wired, `src` TODO)
5. **Rest** — fades to near-white, aftercare copy

**Side progress indicator:** Vertical line + 5 dots, current scene highlighted.

**Audio toggle:** Stored in `localStorage`, off by default. Clear icon. Muted unless user opts in.

**After pinned sequence:** Unpin → CTA section "Ready when you are" → `/enquire`

**Reduced-motion fallback:** All five scenes as normal vertical stack, static visuals, no pinning.

---

### Journal (`/journal`)

Stub. Editorial 3-column index (desktop) / 1-column (mobile), 3 placeholder posts.
`TODO: wire to MDX or CMS`

---

### Enquire (`/enquire`)

**Layout:** Two-column desktop — form left, reassurance copy right.

**Form fields (Zod + React Hook Form):**
- Name (required)
- Email (required, validated)
- Phone or Instagram handle (required)
- Postcode or area (required)
- Service interest (select: 4 services + "not sure")
- Preferred dates/times (textarea)
- Anything else (textarea)
- Honeypot field

**Submission:** POST to `/api/enquire` → Resend email to `process.env.ENQUIRY_EMAIL`.
**Success:** Form fades out, calm thank-you message + expected 24h response time.
**Error:** Inline gentle copy.

**Reassurance column:** Women only, London + surrounding, 24h response, 4-question FAQ accordion (shadcn Accordion).

---

### Policies (`/policies`)

Long-form, `max-w-prose`. Sections: Women-only policy, Cancellation, Hygiene & safety, What ASMR is and isn't (explicit non-sexual statement), Privacy.

Sticky table of contents on desktop.

---

### 404 (`not-found.tsx`)

Minimal. "This page is resting." Link home.

---

## Interactions (12 total)

1. **Hero headline reveal** — word split, staggered fade + 20px translate, 60ms between words
2. **Custom cursor** — 12px → 48px spring-lag circle, desktop only
3. **Magnetic buttons** — primary CTAs attract cursor within ~80px
4. **Scroll-linked image scale** — hero photo 1.1 → 1.0 on scroll into view
5. **Marquee** — pure CSS infinite, pauses on hover
6. **Services hover expansion** — row image 30% → 60% width, siblings compress
7. **Count-up numbers** — About stats + Services prices animate into view
8. **Pinned scroll story** — GSAP ScrollTrigger, 5 full-screen scenes on `/experience`
9. **Section divider draw** — horizontal line draws across page between major sections
10. **Subtle parallax** — backgrounds 0.85× scroll speed, foreground 1×
11. **Page transitions** — rose panel slides up between routes (~600ms)
12. **Ambient audio toggle** — `/experience`, localStorage-persistent, off by default

---

## Assets

**Images:** Real Instagram images from `instagram images/` (51 images available).
- Home hero: use a close-up scalp/hair/hands image
- Home IG grid: 6 chosen images
- About portrait: use a setup/hands image
- Services alternating: assign per service

**Audio:** `TODO — add ambient audio file to /public/audio/ambient.mp3`

---

## Content

All marketing copy lives in `/content/copy.ts` (typed, single source of truth).

Copy voice: calm, warm, unhurried, gently feminine. Never clinical, never cheeky.
Practitioner name: Elizabeth throughout.
Unknown specifics: `TODO:` comments with plausible defaults.

---

## Accessibility

- All interactions keyboard-navigable
- Visible focus states: warm gold ring (`--color-gold`)
- Skip-to-content link
- Semantic HTML, correct heading hierarchy per page
- `prefers-reduced-motion`: disable Lenis, parallax, cursor follower, pinned story (static stack fallback), typing reveal → instant fade
- Color contrast: AA minimum on all text
- Form inputs labeled; error messages announced via `aria-live`

---

## SEO

- Per-page metadata via Next.js Metadata API
- OpenGraph + Twitter card images (placeholder, `TODO: design real OG images`)
- JSON-LD `LocalBusiness` schema on home: London, women-only service
- `next-sitemap` for sitemap + robots.txt

---

## Env Vars

```
RESEND_API_KEY=
ENQUIRY_EMAIL=
```

---

## Project Structure

```
/app
  layout.tsx
  page.tsx
  about/page.tsx
  services/page.tsx
  experience/page.tsx
  journal/page.tsx
  enquire/page.tsx
  policies/page.tsx
  not-found.tsx
  api/enquire/route.ts
/components
  layout/     Nav, Footer, PageTransition, SmoothScroll, Cursor
  ui/         shadcn components
  sections/   Hero, Marquee, ServicesPreview, ExperienceTeaser,
              Testimonials, InstagramStrip, ClosingCta, etc.
  primitives/ SplitText, MagneticButton, CountUp, RevealOnScroll,
              ScrollScene
/lib
  motion.ts        shared eases, durations, Framer variants
  email.ts         Resend wrapper
  validation.ts    Zod schemas
/styles
  globals.css
/content
  copy.ts          all marketing copy, typed
/public
  /images          selected Instagram images (copied from instagram images/)
  /audio           TODO: ambient.mp3
```

---

## Build Order

1. **Scaffold** — Next.js init, fonts, CSS variables, base layout, Nav, Footer, SmoothScroll, Cursor
2. **Home** — all 8 sections in order
3. **About, Services, Policies, 404**
4. **Enquire** — form + `/api/enquire` email route
5. **Experience** — pinned scroll story (dedicated pass)
6. **Journal** — stub
7. **Polish** — animation refinement, reduced-motion audit, accessibility audit, Lighthouse
8. **SEO** — metadata, sitemap, schema, robots.txt
