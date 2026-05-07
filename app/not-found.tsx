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
        className="font-sans text-sm text-ink/50 hover:text-ink focus-visible:outline-none focus-visible:underline focus-visible:decoration-gold transition-colors underline underline-offset-4"
      >
        Return home
      </Link>
    </div>
  )
}
