import Link from 'next/link'
import { footer } from '@/content/copy'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-ink)' }} className="pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* Contact */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] mb-4"
               style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}>
              {footer.contact.heading}
            </p>
            <a
              href={`mailto:${footer.contact.email}`}
              className="font-display font-light text-xl hover:text-[var(--color-rose)] transition-colors duration-300"
              style={{ color: 'var(--color-bg)' }}
            >
              {footer.contact.email}
            </a>
            <p className="font-sans text-sm mt-2"
               style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}>
              {footer.contact.note}
            </p>
          </div>

          {/* Sitemap */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] mb-4"
               style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}>
              {footer.sitemap.heading}
            </p>
            <ul className="flex flex-col gap-2" role="list">
              {footer.sitemap.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm hover:opacity-100 transition-opacity duration-300"
                    style={{ color: 'color-mix(in srgb, var(--color-bg) 70%, transparent)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="font-sans text-xs uppercase tracking-[0.15em] mb-4"
               style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}>
              {footer.social.heading}
            </p>
            <a
              href={footer.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm hover:text-[var(--color-rose)] transition-colors duration-300"
              style={{ color: 'color-mix(in srgb, var(--color-bg) 70%, transparent)' }}
            >
              <InstagramIcon size={16} />
              {footer.social.instagram.handle}
            </a>
            <p className="font-sans text-xs mt-1"
               style={{ color: 'color-mix(in srgb, var(--color-bg) 40%, transparent)' }}>
              {footer.social.followerCount}
            </p>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4"
             style={{ borderTop: '1px solid color-mix(in srgb, var(--color-bg) 10%, transparent)' }}>
          <p className="font-sans text-xs uppercase tracking-widest"
             style={{ color: 'color-mix(in srgb, var(--color-bg) 30%, transparent)' }}>
            {footer.legalNote}
          </p>
          <p className="font-sans text-xs"
             style={{ color: 'color-mix(in srgb, var(--color-bg) 30%, transparent)' }}>
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
