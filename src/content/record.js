/* ════════════════════════════════════════════════════════════
   ACHIEVEMENTS, JOURNEY, TOOLBOX, WRITING, BEYOND THE RÉSUMÉ
   Images for all of these live in src/content/media.js.
   Source of truth for case content: the competition decks in assets-src/resources.
   ════════════════════════════════════════════════════════════ */

// status: 'winner' | 'semifinal' | 'finalist' | 'case'. Each gets its own visual treatment.
// caseStudy → full case page at #/work/<slug>; otherwise the achievement page #/achievements/<slug>.
export const achievements = [
  {
    slug: 'web3-strategia',
    name: 'Web3 Strategia',
    status: 'winner', statusLabel: 'National Winner',
    org: 'Masters’ Union',
    text: 'Predictive modelling for lead installation forecasting, with a focus on data-driven resource allocation and operational efficiency.',
    details: [], // TODO: the problem, your approach and what won it
    date: '', certificateUrl: '',
  },
  {
    slug: 'maruti-xcelerate',
    name: 'Maruti Suzuki XCELerate 2026',
    status: 'semifinal', statusLabel: 'Semi-finalist',
    org: 'B-Track · Team Swift · IIM Jammu',
    text: 'Rebuilding Aspiration in the SUV Portfolio: a trust-to-aspiration strategy built on 12 showroom visits, 45+ buyer and dealer interviews and a 253-response survey across 8 cities.',
    caseStudy: 'maruti-suzuki-xcelerate',
    details: ['MARS framework: Maruti owners first, Aspiring buyers next, Relevant experience, Stronger brand and communication.', 'Flagship proposal: the Maruti Equity Account, a guaranteed, service-verified car value shown next to the EMI for a Maruti SUV.'],
    date: '', certificateUrl: '',
  },
  {
    slug: 'v-guard',
    name: 'V-Guard Big Idea Business Plan Competition 2026',
    status: 'semifinal', statusLabel: 'National Semi-finalist',
    org: 'V-Guard Industries · Team Future Guardian · IIM Jammu',
    text: 'A portfolio blueprint across 14 product categories and nine initiatives: ₹385 crore proposed capex for ₹1,765 crore of reconstructed NPV (team estimates).',
    caseStudy: 'v-guard-strategic-plan',
    details: ['Figures are outputs of the team’s proposed model, not actual V-Guard results.'],
    date: '', certificateUrl: '',
  },
  {
    slug: 'case-code-x',
    name: 'Case Code-X',
    status: 'finalist', statusLabel: 'National Finalist',
    org: 'IIM Indore × IIM Calcutta · Team Future Guardians',
    text: 'Quick commerce profitability turnaround: diagnosing why QC orders lose money, stress-testing the data and proposing five margin levers.',
    caseStudy: 'case-code-x',
    details: [],
    date: '', certificateUrl: '',
  },
  {
    slug: 'casequesta',
    name: 'CaseQuesta',
    status: 'finalist', statusLabel: 'National Finalist',
    org: 'BITS Pilani',
    text: 'Business plan for an autonomous call-based system.',
    details: [],
    date: '', certificateUrl: '',
  },
  {
    slug: 'case-craze',
    name: 'Case Craze 4.0',
    status: 'case', statusLabel: 'Case submission', // TODO: confirm the result to show here
    org: 'Elira Labs · Team Veere · IIM Jammu',
    text: 'India market entry for a lab-grown diamond technology leader: market sizing, a 51/49 joint-venture structure, DCF valuation and a risk register with kill switches.',
    caseStudy: 'case-craze',
    details: [],
    date: '', certificateUrl: '',
  },
]

/* Journey: four chronological stages. `when` is a label, never an invented date.
   Photos for each stage are listed in media.js → journeyMedia[id], in order. */
export const journey = [
  {
    id: 'school', when: 'Stage 01 · School', place: 'Delhi',
    title: 'Kamal Public School', org: 'Class 10 & Class 12 · PCM',
    text: 'Where the foundation was laid in Physics, Chemistry and Mathematics.',
    highlights: ['Scored 91.33% in Class 12', 'Ranked among the top 15 students in the school in the PCM stream'],
  },
  {
    id: 'du', when: 'Stage 02 · Undergraduate', place: 'University of Delhi',
    title: 'B.Sc. (Hons.) Computer Science', org: 'College of Vocational Studies, University of Delhi',
    text: 'Programming, data and analytics in the classroom; hosting and organising events outside it.',
    highlights: ['Hosted college events'], // TODO: add more DU highlights

  },
  {
    id: 'jewellery', when: 'Stage 03 · Business', place: 'One year',
    title: 'The jewellery business', org: 'Hands-on business exposure',
    text: 'A year of hands-on experience in the jewellery business, between university and the MBA.',
    highlights: [], // TODO: specifics of the role and what you learned
  },
  {
    id: 'iim', when: 'Stage 04 · MBA', place: 'IIM Jammu · 2025–27',
    title: 'Indian Institute of Management Jammu', org: 'MBA · AI and Product Management Consulting',
    text: 'Where it comes together: AI, strategy and business, tested in the classroom, at Cars24 and in national case competitions.',
    highlights: [
      'Product Management Intern at Cars24 (Loans24 NBFC): cloud data pipelines and an AI reference calling proposal',
      'Semi-finalist, Maruti Suzuki XCELerate 2026 · National Semi-finalist, V-Guard Big Idea 2026',
      'National Finalist, Case Code-X (IIM Indore × IIM Calcutta) · Case Craze 4.0 (Elira Labs)',
    ],
    iim: true,
    link: { href: '#achievements', label: 'See the achievements' },
  },
]

export const toolbox = [
  { name: 'AI & Machine Learning', glyph: 'AI', items: ['Generative AI', 'LLMs', 'Claude', 'Gemini API', 'RAG', 'NLP', 'BERT', 'Transformers', 'Scikit-learn', 'PyTorch', 'TensorFlow', 'Hugging Face', 'LangChain', 'Prompt engineering'] },
  { name: 'Data & Analytics', glyph: 'DA', items: ['Python', 'Pandas', 'NumPy', 'SQL', 'MySQL', 'PostgreSQL', 'Snowflake', 'Apache Superset', 'Power BI', 'Predictive modelling', 'Data visualisation'] },
  { name: 'Product & Technology', glyph: 'PT', items: ['Product management', 'Product discovery', 'Product analytics', 'UI/UX', 'Technical architecture', 'API integration', 'HTML', 'CSS', 'JavaScript'] },
  { name: 'Strategy & Consulting', glyph: 'SC', items: ['Market sizing', 'TAM / SAM / SOM', 'Competitive benchmarking', 'Financial modelling', 'NPV', 'DCF valuation', 'ROI', 'Go-to-market', 'Customer research', 'Strategic prioritisation', 'Business transformation'] },
  { name: 'Communication', glyph: 'CO', items: ['Executive presentations', 'Storytelling', 'Public speaking', 'Event hosting', 'Stakeholder communication'] },
]

export const writingCategories = ['AI & Technology', 'Product & Strategy', 'Business & Markets', 'Personal Reflections']
// status 'draft' shows "In the works" with no page. To publish: status 'published', add date, minutes, dek and body (paragraphs).
export const articles = [
  { slug: 'beyond-the-ai-hype', title: 'Beyond the AI Hype: Where Does AI Actually Create Business Value?', category: 'AI & Technology', status: 'draft' },
  { slug: 'what-case-competitions-teach', title: 'What National Case Competitions Teach You About Business Strategy', category: 'Business & Markets', status: 'draft' },
  { slug: 'from-cs-to-product', title: 'From Computer Science to Product Management', category: 'Personal Reflections', status: 'draft' },
  { slug: 'strategy-beyond-the-deck', title: 'Why Good Strategy Needs More Than a Good Presentation', category: 'Product & Strategy', status: 'draft' },
  { slug: 'products-that-solve-problems', title: 'Building Products That Solve Problems', category: 'Product & Strategy', status: 'draft' },
]

// Interests shown in "Beyond the résumé"
export const beyond = [
  {
    key: 'chess', title: 'Chess',
    text: 'Competitive chess player.',
    honours: [{ label: '2nd Runner-up', event: 'IIT Jammu Chess Tournament' }],
    stat: { value: '~1,911', label: 'latest reported rapid rating' }, // edit when it changes
    linkKey: 'chess', linkLabel: 'Chess.com profile',
  },
  { key: 'cricket', title: 'Cricket', text: 'Batter and wicketkeeper.' },
  {
    key: 'hosting', title: 'Hosting & public speaking',
    text: 'Core team member at Advaita Society. Coordinated an Interaction with Acharya Prashant event and have hosted events for 200+ attendees.',
    stat: { value: '1,000+', label: 'registrations for an event I coordinated' },
  },
  { key: 'reading', title: 'Reading & philosophy', text: 'Drawn to the Gita, philosophy, the teachings of Acharya Prashant, human behaviour and ideas. On the shelf: Truth Without Apology.' },
]
