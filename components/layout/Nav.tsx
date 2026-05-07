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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'bg-[var(--color-bg)]/95 backdrop-blur-sm border-b border-[var(--color-ink)]/5'
            : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="font-display font-light text-[var(--color-ink)] text-lg tracking-tight"
          >
            {nav.logo}
          </Link>

          <ul className="hidden md:flex items-center gap-8" role="list">
            {nav.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-sans text-sm text-[var(--color-ink)]/70 hover:text-[var(--color-ink)] transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <MagneticButton>
                <Link
                  href={nav.cta.href}
                  className="font-sans text-sm bg-[var(--color-ink)] text-[var(--color-bg)] px-5 py-2 rounded-full hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[var(--color-gold)] transition-opacity duration-300"
                >
                  {nav.cta.label}
                </Link>
              </MagneticButton>
            </li>
          </ul>

          <button
            className="md:hidden p-2 text-[var(--color-ink)]"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col p-8"
            style={{ backgroundColor: 'var(--color-bg)' }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex justify-between items-center mb-16">
              <Link
                href="/"
                className="font-display font-light text-[var(--color-ink)] text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {nav.logo}
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="p-2 text-[var(--color-ink)]"
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
                    className="font-display font-light text-4xl text-[var(--color-ink)] hover:text-[var(--color-rose)] transition-colors duration-300"
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
