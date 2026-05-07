import type { Metadata } from 'next'
import { RevealOnScroll } from '@/components/primitives/RevealOnScroll'
import { journal } from '@/content/copy'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Thoughts on rest, sensation, and the quiet art of doing less — from Soothe and Scratch.',
  openGraph: {
    title: 'Journal | Soothe and Scratch',
    description: 'Thoughts on rest, sensation, and the quiet art of doing less.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function JournalPage() {
  return (
    <div className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <RevealOnScroll className="mb-16">
        <h1 className="font-display font-light text-5xl lg:text-7xl text-ink tracking-tight mb-4">
          {journal.heading}
        </h1>
        <p className="font-sans text-base text-ink/50 max-w-md leading-relaxed">
          {journal.subhead}
        </p>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {journal.posts.map((post, i) => (
          <RevealOnScroll key={post.slug} delay={i * 0.08}>
            <article>
              <div className="aspect-[4/3] bg-rose/10 rounded-xl mb-6 flex items-end p-4">
                <span className="font-sans text-xs text-rose/40 uppercase tracking-widest">
                  {post.readTime} read
                </span>
              </div>
              <p className="font-sans text-xs uppercase tracking-[0.12em] text-ink/30 mb-2">
                {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h2 className="font-display font-light text-2xl text-ink mb-3 leading-tight">
                {post.title}
              </h2>
              <p className="font-sans text-sm text-ink/60 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}
