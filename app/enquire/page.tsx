'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, MapPin, Clock, Heart } from 'lucide-react'
import { enquirySchema, type EnquiryInput } from '@/lib/validation'
import { enquire } from '@/content/copy'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shield: Shield,
  'map-pin': MapPin,
  clock: Clock,
  heart: Heart,
}

const inputClass =
  'w-full font-sans text-sm bg-transparent border-b border-ink/20 pb-2 pt-1 text-ink placeholder:text-ink/30 focus:outline-none focus:border-ink/60 transition-colors duration-300'
const labelClass =
  'block font-sans text-xs uppercase tracking-[0.12em] text-ink/40 mb-2'
const errorClass = 'font-sans text-xs text-rose mt-1'

export default function EnquirePage() {
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
  })

  async function onSubmit(data: EnquiryInput) {
    setStatus('loading')
    try {
      const res = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-24 md:px-16 lg:px-24">
      {/* Page heading */}
      <div className="mb-16 max-w-4xl">
        <h1 className="font-display text-5xl font-light tracking-[-0.03em] text-ink mb-4">
          {enquire.heading}
        </h1>
        <p className="font-sans text-base text-ink/60 leading-[1.7]">
          {enquire.subhead}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-24 max-w-6xl">
        {/* Left column — form (3/5) */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="py-12"
              >
                <p className="font-display text-2xl font-light text-ink leading-relaxed">
                  {enquire.successMessage}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                {/* Honeypot */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
                >
                  <label htmlFor="website">Leave this field empty</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('website')}
                  />
                </div>

                <div className="space-y-10">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelClass}>
                      Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      className={inputClass}
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className={errorClass}>{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email *
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className={errorClass}>{errors.email.message}</p>
                    )}
                  </div>

                  {/* Contact method */}
                  <div>
                    <label htmlFor="contactMethod" className={labelClass}>
                      Phone or Instagram handle *
                    </label>
                    <input
                      id="contactMethod"
                      type="text"
                      placeholder="+44 7700 000000 or @yourhandle"
                      className={inputClass}
                      {...register('contactMethod')}
                    />
                    {errors.contactMethod && (
                      <p className={errorClass}>{errors.contactMethod.message}</p>
                    )}
                  </div>

                  {/* Postcode */}
                  <div>
                    <label htmlFor="postcode" className={labelClass}>
                      Postcode or area *
                    </label>
                    <input
                      id="postcode"
                      type="text"
                      placeholder="e.g. SE1, Brixton, Richmond"
                      className={inputClass}
                      {...register('postcode')}
                    />
                    {errors.postcode && (
                      <p className={errorClass}>{errors.postcode.message}</p>
                    )}
                  </div>

                  {/* Service */}
                  <div>
                    <label htmlFor="service" className={labelClass}>
                      Service *
                    </label>
                    <select
                      id="service"
                      className={`${inputClass} cursor-pointer appearance-none`}
                      defaultValue=""
                      {...register('service')}
                    >
                      <option value="" disabled>
                        Select a service…
                      </option>
                      <option value="scalp">Scalp &amp; Hair — 60 min</option>
                      <option value="touch">Light Touch &amp; Tracing — 60 min</option>
                      <option value="extended">Extended Session — 90 min</option>
                      <option value="combo">Combo Session — 120 min</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                    {errors.service && (
                      <p className={errorClass}>{errors.service.message}</p>
                    )}
                  </div>

                  {/* Preferred times */}
                  <div>
                    <label htmlFor="preferredTimes" className={labelClass}>
                      Preferred times
                    </label>
                    <textarea
                      id="preferredTimes"
                      rows={3}
                      placeholder="e.g. weekday mornings, Saturday afternoons…"
                      className={`${inputClass} resize-none`}
                      {...register('preferredTimes')}
                    />
                    {errors.preferredTimes && (
                      <p className={errorClass}>{errors.preferredTimes.message}</p>
                    )}
                  </div>

                  {/* Additional info */}
                  <div>
                    <label htmlFor="additionalInfo" className={labelClass}>
                      Anything else
                    </label>
                    <textarea
                      id="additionalInfo"
                      rows={3}
                      placeholder="Any questions, sensitivities, or context Elizabeth should know…"
                      className={`${inputClass} resize-none`}
                      {...register('additionalInfo')}
                    />
                    {errors.additionalInfo && (
                      <p className={errorClass}>{errors.additionalInfo.message}</p>
                    )}
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="relative inline-flex items-center gap-3 font-sans text-sm uppercase tracking-[0.12em] text-ink border-b border-ink pb-1 hover:opacity-60 focus-visible:opacity-60 active:opacity-40 transition-opacity duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? 'Sending…' : 'Send enquiry'}
                    </button>

                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${errorClass} mt-4`}
                      >
                        {enquire.errorMessage}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Right column — reassurance + FAQ (2/5) */}
        <div className="lg:col-span-2 space-y-16">
          {/* Reassurance list */}
          <div>
            <ul className="space-y-5">
              {enquire.reassurance.map((item) => {
                const Icon = iconMap[item.icon]
                return (
                  <li key={item.icon} className="flex items-center gap-4">
                    {Icon && (
                      <Icon size={16} className="shrink-0 text-rose" />
                    )}
                    <span className="font-sans text-sm text-ink/70 leading-[1.7]">
                      {item.text}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* FAQ accordion */}
          <div>
            <h2 className="font-sans text-xs uppercase tracking-[0.12em] text-ink/40 mb-6">
              Common questions
            </h2>
            <Accordion>
              {enquire.faq.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="font-sans text-sm text-ink font-normal py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-sans text-sm text-ink/60 leading-[1.7]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </main>
  )
}
