import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enquire',
  description: 'Book a mobile ASMR session with Elizabeth in London. Fill in the short form and she\'ll be in touch within 24 hours.',
}

export default function EnquireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
