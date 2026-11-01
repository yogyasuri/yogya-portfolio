/* ════════════════════════════════════════════════════════════
   EXPERIENCE. Cars24 is the only professional experience. It is the
   spotlight of the Work & Experience section and has its page at
   #/experience/cars24. Never add confidential company information.
   '' = not yet confirmed (hidden on the live site).
   ════════════════════════════════════════════════════════════ */

export const experience = [
  {
    slug: 'cars24',
    company: 'Cars24',
    unit: 'Loans24 NBFC',
    role: 'Product Management Intern',
    discipline: 'Product Management',
    period: '', // TODO: internship dates
    headline: '**Cloud data**, **product thinking** and an **AI-first redesign** of reference calling.',
    summary: 'Product, cloud data and AI work inside Loans24, the NBFC arm of Cars24: from ETL pipelines on a cloud data stack to proposing an LLM-based voice pipeline and its system architecture.',
    contributions: [
      'Built **four ETL pipelines** and **KPI dashboards** on a **cloud data stack**: Snowflake, SQL and Apache Superset.',
      'Integrated fragmented data sources across the **DCF and C2C** departments.',
      'Contributed to reducing operational buffer time from **one day to 30 minutes**.',
      '**Proposed the AI reference calling solution** and **designed its system architecture** (AI Reference Analysis).',
      'Worked on **UI/UX components** for ERP development.',
    ],
    collaboration: 'Worked cross-functionally alongside professionals whose backgrounds include IIM Calcutta, ISB and IIT Kharagpur.',
    tools: ['Snowflake', 'SQL', 'Apache Superset', 'Gemini', 'LLMs'],
    // Two workstreams shown as panels in the spotlight
    tracks: [
      {
        key: 'cloud', kicker: 'Cloud data platform', title: 'From fragmented sources to live KPIs',
        points: ['**Four ETL pipelines** on Snowflake', '**KPI dashboards** in Apache Superset', '**DCF and C2C** data integrated', 'Operational buffer: **1 day → 30 min**'],
        stack: ['Snowflake (cloud data warehouse)', 'SQL', 'Apache Superset'],
      },
      {
        key: 'ai', kicker: 'AI reference calling · my proposal', title: 'AI Reference Analysis',
        points: ['**LLM reasoning** extracts structured intent from calls', '**Multilingual**: Hinglish and regional accents', '**Validation rules** with automatic retry', '**Sentiment-based hand-off** to a human agent'],
        stack: ['Gemini (enterprise cloud)', 'Twilio / Exotel', 'Text-to-speech', 'CRM'],
        href: '#/work/ai-reference-analysis',
      },
    ],
    detail: {
      problem: 'Data relevant to DCF and C2C operations sat across fragmented sources, which made it harder to track performance and act on it quickly. Separately, automated reference calls were losing accuracy to accents, background noise and conversational nuance.',
      role: 'Product Management Intern within Loans24 NBFC, working across product, cloud data, business intelligence and AI.',
      approach: [
        'Built ETL pipelines to bring fragmented DCF and C2C data sources together on Snowflake.',
        'Turned the integrated data into KPI dashboards in Apache Superset.',
        'Identified the gaps in the traditional voice → speech-to-text → database pipeline used for reference calls.',
        'Proposed an LLM-based solution and designed its system architecture: telephony gateway, multilingual understanding, entity extraction, validation with retry, sentiment routing and CRM write-back.',
        'Worked on UI/UX components as part of ERP development.',
      ],
      deliverables: ['Four ETL pipelines', 'KPI dashboards', 'AI Reference Analysis: solution proposal and system architecture', 'ERP UI/UX components'],
      outcomes: ['Contributed to reducing operational buffer time in the relevant workflow from one day to 30 minutes.'],
      learnings: '', // TODO: what you took away from the internship, in your words
    },
  },
]
