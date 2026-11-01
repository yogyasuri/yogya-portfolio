/* ════════════════════════════════════════════════════════════
   MEDIA: every image on the site, in one place.

   To add or replace a photo: save it at the path shown (inside /public) and
   it appears automatically. Missing files show a designed placeholder.
   Fields: src (path inside /public) · label · alt · ratio · caption · credit
   Gallery position = order in the array (kept in the order assets were supplied).
   ════════════════════════════════════════════════════════════ */

const R = { portrait: '4 / 5', wide: '16 / 9', photo: '4 / 3', square: '1 / 1', cert: '1.414 / 1', cover: '16 / 10', tall: '3 / 4', a4: '1 / 1.414' }

const I = (src, label, ratio = R.wide, extra = {}) => ({
  src: `images/${src}`, label, ratio, alt: extra.alt ?? label, caption: extra.caption ?? '', credit: extra.credit ?? '', fit: extra.fit,
})

/* ── Logos used across the site ── */
export const logos = {
  iimJammu: 'images/logos/iim-jammu.png',
  cars24: 'images/logos/cars24.png',
}

/* ── Profile ── */
export const profileMedia = {
  beyond: I('personal/beyond-resume.webp', 'Yogya at night, arms outstretched', R.tall, { alt: 'Yogya Suri standing outdoors at night with arms outstretched' }),
}

/* ── Achievements: event photo, certificate, organiser logo, gallery ── */
const set = (folder, name, { photo, gallery = [], duo } = {}) => ({
  duo,
  photo: photo ?? I(`achievements/${folder}/event.webp`, `${name}: event or team photograph`, R.cover),
  certificate: I(`achievements/${folder}/certificate.webp`, `${name}: certificate`, R.cert),
  logo: I(`achievements/${folder}/logo.png`, 'Organiser logo', R.square),
  gallery,
})
const slide = (deck, p, label, ratio = R.wide) => I(`cases/${deck}/p${String(p).padStart(2, '0')}.webp`, label, ratio, { alt: label, fit: 'contain' })

export const achievementMedia = {
  'web3-strategia': set('web3-strategia', 'Web3 Strategia', {
    photo: I('achievements/web3-strategia/event.webp', 'Web3 Strategia winning team', R.cover, { alt: 'Yogya Suri with his winning Web3 Strategia team at Masters’ Union', fit: 'top' }),
    // the two images shown together on the achievement card: the winning moment, then the team
    duo: [
      I('achievements/web3-strategia/winning-picture.webp', 'The winning moment', R.tall, { alt: 'Yogya Suri at Masters’ Union holding the Web3 Strategia winning certificate', caption: 'National Winner · Masters’ Union' }),
      I('achievements/web3-strategia/event.webp', 'The winning team', R.tall, { alt: 'Yogya Suri with his Web3 Strategia teammates' }),
    ],
    gallery: [
      I('achievements/web3-strategia/winning-picture.webp', 'Receiving the Web3 Strategia win', R.tall, { alt: 'Yogya Suri at Masters’ Union holding the winning certificate', caption: 'National Winner · Masters’ Union' }),
      I('achievements/web3-strategia/winning-team.webp', 'The team with certificates', R.tall, { alt: 'Web3 Strategia winning team holding certificates', caption: 'Team with winning certificates' }),
    ],
  }),
  'maruti-xcelerate': set('maruti-xcelerate', 'Maruti Suzuki XCELerate', { photo: slide('maruti-xcelerate', 1, 'XCELerate 2026 · Team Swift, IIM Jammu') }),
  'v-guard': set('v-guard', 'V-Guard Big Idea', { photo: { ...slide('v-guard', 12, 'V-Guard Big Idea 2026 · creative campaign ideas', R.cover), fit: 'top' } }),
  'case-code-x': set('case-code-x', 'Case Code-X', { photo: slide('case-code-x', 1, 'Case Code-X · Team Future Guardians') }),
  casequesta: set('casequesta', 'CaseQuesta', {
    photo: I('achievements/casequesta/event.webp', 'At CaseQuesta, BITS Pilani', R.cover, { alt: 'Yogya Suri in a suit at BITS Pilani for CaseQuesta' }),
  }),
  'case-craze': set('case-craze', 'Case Craze 4.0', { photo: slide('case-craze', 1, 'Case Craze 4.0 · Team Veere, IIM Jammu') }),
}

/* ── Experience ── */
export const experienceMedia = {
  cars24: {
    cover: I('experience/cars24/workplace.webp', 'At work at Cars24', R.photo, { alt: 'Yogya Suri working at his desk at Cars24 wearing a headset' }),
    architecture: I('experience/cars24/ai-reference/architecture.webp', 'AI reference calling system architecture', '1024 / 426', { alt: 'Proposed architecture: customer phone, telephony gateway, LLM multilingual understanding, Gemini speech processing, validation engine with retry, CRM database and text-to-speech' }),
    gallery: [
      I('experience/cars24/team.webp', 'With the Cars24 team', R.photo, { alt: 'Yogya Suri with colleagues at Cars24', caption: 'With the team' }),
      I('experience/cars24/farewell.webp', 'Farewell from the Cars24 team', R.tall, { alt: 'Farewell cake from the Cars24 team', caption: 'Farewell day' }),
      I('experience/cars24/ai-reference/cover.webp', 'AI Reference Analysis presentation', R.wide, { alt: 'Title slide: AI Reference Analysis by Yogya Suri, IIM Jammu and Cars24', caption: 'AI Reference Analysis · internship presentation' }),
    ],
  },
}

/* ── Projects: cover + gallery; case competitions also carry their `deck` ── */
const deck = (slug, pages, labels, ratio = R.wide) => pages.map((p, i) => slide(slug, p, labels[i], ratio))

export const projectMedia = {
  'maruti-suzuki-xcelerate': {
    cover: slide('maruti-xcelerate', 1, 'XCELerate 2026 cover · Team Swift'),
    deck: deck('maruti-xcelerate', [1, 3, 4, 5, 6, 7, 8, 9, 10, 11], [
      'Cover · Team Swift, IIM Jammu', 'Diagnosis: Maruti has the SUVs, but not the SUV share', 'Brand perception diagnosis', 'Product or perception: what really converts',
      'Who Maruti must win: buyer personas', 'Positioning and portfolio architecture', 'Flagship: the Maruti Equity Account', 'Retail and channel experience',
      'Communications, content and partnerships', 'Roadmap, investment and payback',
    ]),
    gallery: [],
  },
  'v-guard-strategic-plan': {
    cover: slide('v-guard', 5, 'Focus / Fix / Enter / Exit architecture', R.a4),
    deck: deck('v-guard', [3, 4, 5, 6, 9, 10, 11, 12, 13], [
      'Segment baseline and financial problem', 'Portfolio prioritisation: two 2×2 matrices', 'Strategic choice architecture: Focus, Fix, Enter, Exit', 'Competitive positioning',
      'The financial plan: NPV by initiative', 'Scenario analysis', 'Risk mitigation and Business Model Canvas', 'Creative marketing ideas', 'Three-year implementation roadmap',
    ], R.a4),
    gallery: [],
  },
  'case-code-x': {
    cover: slide('case-code-x', 1, 'Case Code-X cover'),
    deck: deck('case-code-x', [1, 2, 3, 4, 5], ['Cover · Team Future Guardians', 'Margin crisis diagnosis', 'Data quality analysis', 'Outlier event analysis', 'Strategic recommendations']),
    gallery: [],
  },
  'case-craze': {
    cover: slide('case-craze', 1, 'Case Craze 4.0 cover'),
    deck: deck('case-craze', [1, 2, 3, 4, 5, 6], ['Cover · Team Veere, IIM Jammu', 'Market analysis', 'Strategic design: deal architecture and roadmap', 'Financial economics: scenarios', 'P&L projections and DCF valuation', 'Risk register and final verdict']),
    gallery: [],
  },
  'ai-reference-analysis': {
    cover: I('experience/cars24/ai-reference/cover.webp', 'Presentation cover', R.wide, { alt: 'Title slide: AI Reference Analysis by Yogya Suri, IIM Jammu and Cars24' }),
    gallery: [
      I('experience/cars24/ai-reference/traditional-pipeline.webp', 'Traditional pipeline', '1024 / 559', { alt: 'Traditional model: voice, speech-to-text, text, database', caption: 'The traditional model loses context and intent' }),
      I('experience/cars24/ai-reference/architecture.webp', 'Proposed system architecture', '1024 / 426', { alt: 'Proposed architecture from customer phone to CRM with validation and retry', caption: 'Proposed GenAI architecture' }),
      I('experience/cars24/ai-reference/sentiment-routing.webp', 'Sentiment routing', '839 / 528', { alt: 'Sentiment detection hub routing negative calls to a human agent and positive or neutral calls to the CRM', caption: 'Customer thinking: sentiment-based routing' }),
      I('experience/cars24/ai-reference/evolved-pipeline.webp', 'Traditional vs AI-powered pipeline', '455 / 542', { alt: 'Traditional voice pipeline compared with the evolved AI-powered pipeline', caption: 'From traditional to AI-powered pipeline' }),
    ],
  },
  // AI & analytics projects: screenshots + GitHub links to come
  'ipl-auction-advisor': {
    cover: I('projects/ipl-auction/correlation-matrix.webp', 'Correlation matrix: player metrics vs auction price', R.photo, { alt: 'Correlation matrix of IPL player performance metrics against auction price and predicted price', fit: 'contain' }),
    gallery: [
      I('projects/ipl-auction/correlation-matrix.webp', 'Correlation matrix', '1600 / 1200', { alt: 'Correlation matrix of player performance metrics vs auction price', caption: 'Player metrics vs auction price (from the repository)' }),
      I('projects/ipl-auction/github-card.webp', 'GitHub repository', '2 / 1', { alt: 'GitHub repository card for yogyasuri/IPL-Data', caption: 'github.com/yogyasuri/IPL-Data' }),
    ],
  },
  'google-play-store-analytics': {
    cover: I('projects/play-store/github-card.webp', 'GitHub repository: Google-Playstore-EDA', '2 / 1', { alt: 'GitHub repository card for yogyasuri/Google-Playstore-EDA', fit: 'contain' }),
    gallery: [I('projects/play-store/github-card.webp', 'GitHub repository', '2 / 1', { alt: 'GitHub repository card for yogyasuri/Google-Playstore-EDA', caption: 'github.com/yogyasuri/Google-Playstore-EDA' })],
  },
  'ai-humanizer': {
    cover: I('projects/ai-humanizer/cover.webp', 'AI Humanizer interface', '1599 / 984', { alt: 'AI Humanizer web app: AI-generated text input on the left, humanised output on the right' }),
    gallery: [I('projects/ai-humanizer/cover.webp', 'Application interface', '1599 / 984', { alt: 'AI Humanizer web app interface', caption: 'The AI Humanizer interface' })],
  },
  'multimodal-review-analysis': {
    cover: I('projects/multimodal-analysis/cover.webp', 'Project cover image'),
    gallery: [I('projects/multimodal-analysis/architecture.webp', 'Model architecture (BERT + ResNet-50)'), I('projects/multimodal-analysis/samples.webp', 'Sample review inputs'), I('projects/multimodal-analysis/results.webp', 'Results and metrics')],
  },
}

/* ── Journey: photos per stage, in the order supplied ── */
export const journeyMedia = {
  school: [I('journey/school-1.webp', 'School days in Delhi', R.tall, { alt: 'Yogya Suri as a school student in Delhi, in a yellow polo and hat' })],
  du: [
    I('personal/hosting/du-event-hosting.webp', 'Hosting an event at the University of Delhi', R.tall, { alt: 'Yogya Suri hosting an outdoor event with a microphone', caption: 'Hosting at DU' }),
    I('personal/hosting/hosting-2.webp', 'On stage at the lectern', R.tall, { alt: 'Yogya Suri speaking at a lectern', caption: 'On stage' }),
    I('journey/du-college.webp', 'College of Vocational Studies photograph', R.photo),
  ],
  jewellery: [
    I('journey/jewellery-1.webp', 'At the jewellery shop', R.photo, { alt: 'Yogya Suri at the counter of the jewellery shop' }),
    I('journey/jewellery-2.webp', 'Rings from the shop', R.tall, { alt: 'A hand holding several diamond rings from the jewellery shop' }),
  ],
  iim: [
    I('journey/iim-jammu-1.webp', 'The IIM Jammu batch', R.photo, { alt: 'Yogya Suri with his IIM Jammu batch in a lecture hall', caption: 'The batch' }),
    I('journey/iim-jammu-2.webp', 'Presenting at IIM Jammu', R.tall, { alt: 'Yogya Suri presenting in a classroom at IIM Jammu', caption: 'Presenting in class' }),
    I('journey/iim-jammu-3.webp', 'On the IIM Jammu campus', R.tall, { alt: 'Yogya Suri on the IIM Jammu campus road with mountains behind', caption: 'Campus' }),
    I('journey/iim-jammu-4.webp', 'With friends at IIM Jammu', R.photo, { alt: 'Yogya Suri taking a selfie with friends at IIM Jammu', caption: 'Friends' }),
  ],
}

/* ── Beyond the résumé: interests ── */
export const personalMedia = {
  chess: [
    I('personal/chess/playing-chess.webp', 'Playing chess', R.photo, { alt: 'Yogya Suri thinking over a chess board' }),
    I('personal/chess/iit-jammu-tournament.webp', 'IIT Jammu Chess Tournament: on stage', R.photo, { alt: 'Prize winners on stage at the IIT Jammu Convoquer 26 closing ceremony', caption: '2nd Runner-up · IIT Jammu' }),
  ],
  cricket: [
    I('personal/cricket/batting.webp', 'Batting', R.tall, { alt: 'Yogya Suri batting in cricket whites and pads' }),
    I('personal/cricket/on-the-ground.webp', 'On the ground', R.photo, { alt: 'Yogya Suri on a cricket ground with stumps behind' }),
    I('personal/cricket/side-arm.webp', 'Side-arm practice', R.tall, { alt: 'Yogya Suri practising in the nets' }),
  ],
  hosting: [
    I('personal/hosting/du-event-hosting.webp', 'Hosting an event', R.tall, { alt: 'Yogya Suri hosting an event with a microphone' }),
    I('personal/hosting/hosting-2.webp', 'At the lectern', R.tall, { alt: 'Yogya Suri speaking at a lectern' }),
  ],
  reading: [I('personal/reading/with-acharya-prashant.webp', 'With Acharya Prashant', R.photo, { alt: 'Yogya Suri with Acharya Prashant' }), I('personal/reading/favourite-book.webp', 'Favourite book: Truth Without Apology by Acharya Prashant', R.tall, { alt: 'Cover of Truth Without Apology by Acharya Prashant', fit: 'contain' })],
}

/* ── Articles: cover per slug ── */
export const articleCover = (slug) => I(`articles/${slug}.webp`, 'Article cover image', R.cover)
