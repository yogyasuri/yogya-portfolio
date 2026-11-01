/* ════════════════════════════════════════════════════════════
   PROFILE: identity, links and homepage copy.
   Empty strings ('') are unconfirmed details. They are hidden on the
   live site and show as gold "✎ to add" notes while running `npm run dev`.
   ════════════════════════════════════════════════════════════ */

export const profile = {
  name: 'Yogya Suri',
  firstName: 'Yogya',
  initials: 'YS',
  logo: 'images/profile/logo.webp', // personal logo (source: assets-src/logo-original.png)

  institution: 'Indian Institute of Management Jammu',
  institutionShort: 'IIM Jammu',
  programme: 'MBA / PGP',
  batch: '2025–27',
  specialisation: 'AI and Product Management Consulting',
  ugDegree: 'B.Sc. (Hons.) Computer Science',
  ugInstitution: 'College of Vocational Studies, University of Delhi',
  ugShort: 'University of Delhi',

  tagline: ['Business meets AI.', 'Product meets Strategy.'],
  intro: 'I connect technology, data and strategic thinking to solve complex business problems and build meaningful products.',
  roles: ['AI & Product Enthusiast', 'Business Strategy Explorer', 'Data-Driven Problem Solver', 'Technology-to-Business Thinker'],
  focus: ['AI', 'Product Management', 'Business Strategy', 'Consulting'],

  // Contact (from 'contact details.pdf'). The mobile number is deliberately NOT published.
  email: 'mbahc25097@iimj.ac.in',
  linkedin: 'https://www.linkedin.com/in/yogya-suri-48413b210',
  github: 'https://github.com/yogyasuri',
  chess: '',      // Chess.com profile URL (optional)
  resume: '',     // e.g. 'Yogya-Suri-Resume.pdf' placed in /public (no phone number)
  heroVideo: 'media/hero-character.mp4',          // 3D character video (has audio; plays muted until the visitor turns sound on)
  heroPoster: 'media/hero-character-poster.webp',  // first frame, shown while loading and for reduced motion
  siteUrl: '',    // final domain, used for social previews
}

// Section 02: verified proof points only. Each links to where it is explained.
export const proofPoints = [
  { value: '16,295', label: 'IPL ball-by-ball records processed', context: 'IPL Auction Advisor · role-wise R² up to 0.96', href: '#/work/ipl-auction-advisor' },
  { value: '2.31M+', label: 'Google Play Store apps analysed', context: 'Play Store analytics · 24 transformed features', href: '#/work/google-play-store-analytics' },
  { value: '4', label: 'ETL pipelines developed', context: 'Cars24 · Loans24 NBFC internship', href: '#/experience/cars24' },
  { value: '30 min', from: '1 day', label: 'Operational buffer time', context: 'Contributed to this reduction in the relevant Cars24 workflow', href: '#/experience/cars24' },
]

// "Now / Currently exploring" strip
export const now = [
  `PGP at ${profile.institutionShort}, batch ${profile.batch}`,
  `Specialising in ${profile.specialisation}`,
  'Open to conversations on AI, product and strategy',
]

export const about = {
  // used by the full-story page (#/about)
  paragraphs: [
    `I’m Yogya Suri, a Computer Science graduate from the University of Delhi, now pursuing my MBA at IIM Jammu (2025–27) with a focus on AI and Product Management Consulting.`,
    'My journey has taken me from programming and data analytics, through a year in the jewellery business, towards a broader understanding of business, products and strategy.',
    'Through my product management internship at Cars24, national case competitions and independent technology projects, I’ve explored how data and technology can translate into meaningful business outcomes.',
    'I enjoy understanding complex problems, structuring them, questioning assumptions and developing practical solutions, whether through an AI application, a predictive model, a product concept or a business strategy.',
  ],
  personal: 'Outside work, I enjoy chess, cricket, hosting events, reading and exploring philosophy.',
  beliefs: [
    { title: 'Understand before you solve.', text: 'The right answer usually starts with structuring the problem properly.' },
    { title: 'Question the assumptions.', text: 'A model, a deck or a product is only as strong as the premises underneath it.' },
    { title: 'Make it practical.', text: 'Technology and strategy matter when they translate into real outcomes for a business.' },
  ],
}

// "Beyond the résumé": the personal dimension. Deliberately no biography here.
export const personal = {
  title: ['The person behind the pursuits.'],
  lede: '',
  // In Yogya's own words
  story: [
    'I have never wanted to define myself entirely through what I study, what I achieve or where I work. I find myself equally interested in understanding people, questioning ideas, exploring unfamiliar subjects and experiencing things outside my immediate world.',
    'I am naturally curious. I tend to look beyond the obvious, ask questions and understand why things work the way they do. I enjoy conversations that challenge my perspective, ideas that make me think and experiences that take me out of my comfort zone.',
    'I am ambitious, but I also believe that growth is not always linear. There is a lot to learn from uncertainty, setbacks, unexpected opportunities and the people we encounter along the way.',
    'I appreciate independence of thought. I would rather understand something for myself than accept it simply because it is widely believed. I value honest conversations, intellectual freedom and the willingness to reconsider my own assumptions.',
    'I also have a reflective side. I am interested in philosophy, human behaviour and questions that go beyond everyday routines. For me, learning is not restricted to classrooms, and curiosity should not have a defined subject.',
    'Ultimately, I want to keep exploring, questioning, building and experiencing. There is always more to understand, and I find that idea exciting.',
  ],
  signoff: 'Still curious. Still questioning. Always evolving.',
  // Personal reflections, in Yogya's own words, go here when provided: [{ k: 'Over the board', text: '…' }]
  lenses: [],
}

export const contact = {
  title: 'Let’s build something meaningful.',
  text: 'Whether it’s an interesting business problem, an AI product idea, a strategic challenge or simply a conversation about technology and business, I’d be glad to connect.',
}
