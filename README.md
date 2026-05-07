# Soothe and Scratch

Mobile ASMR website built with Next.js App Router.

## Getting started

```bash
pnpm install
pnpm dev
```

## Environment variables

Create `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx       # Resend API key for enquiry emails
ENQUIRY_EMAIL=hello@example.com      # Email address to receive enquiries
SITE_URL=https://sootheandscratch.co.uk  # Used for sitemap generation
```

## Content editing

All marketing copy lives in `/content/copy.ts`. Edit this file to update any text on the site. Items marked `TODO:` need replacing with real content from Elizabeth.

## Images

Brand images are in `public/images/`. To swap an image, replace the file with the same name and dimensions.

To add an ambient audio file for the `/experience` page, place an `.mp3` file at `public/audio/ambient.mp3`.

## Deployment

Deploy to Vercel. Set the environment variables above in the Vercel project settings.

After deploying, verify the sender domain `sootheandscratch.co.uk` is set up in Resend and DNS records are configured.

## Tech stack

- Next.js 16 App Router + TypeScript
- Tailwind CSS v4
- Framer Motion (page animations, scroll reveals)
- GSAP + ScrollTrigger (Experience page pinned scroll)
- Lenis (smooth scroll)
- shadcn/ui (Accordion)
- Resend (transactional email)
- React Hook Form + Zod (form validation)
- next-sitemap (SEO sitemap + robots.txt)
