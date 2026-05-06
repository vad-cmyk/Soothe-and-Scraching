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
  audioSrc: '/audio/ambient.mp3',
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
