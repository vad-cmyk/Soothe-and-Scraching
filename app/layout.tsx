import type { Metadata } from 'next'
import { fraunces, dmSans } from '@/lib/fonts'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { Cursor } from '@/components/layout/Cursor'
import { PageTransition } from '@/components/layout/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Soothe and Scratch — Mobile ASMR · London',
    template: '%s | Soothe and Scratch',
  },
  description: 'Mobile ASMR sessions for women in London and surrounding areas. Scalp care, light touch, and deeply calming sessions — brought to your door by Elizabeth.',
  metadataBase: new URL('https://sootheandscratch.co.uk'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
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
