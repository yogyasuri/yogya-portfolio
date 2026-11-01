/**
 * Animated view of the AI reference calling architecture Yogya proposed at Cars24.
 * Stages pop in one after another in 3D once the diagram scrolls into view,
 * and pulses travel along the connectors. Content mirrors the original deck.
 */
const STAGES = [
  { k: '01', title: 'Customer phone', sub: 'Audio input from the reference call' },
  { k: '02', title: 'Telephony gateway', sub: 'Twilio / Exotel' },
  { k: '03', title: 'LLM multilingual understanding', sub: 'Hinglish, dialects, language switching' },
  { k: '04', title: 'Speech processing · Gemini', sub: 'Entities & intent: names, numbers, cities, codes' },
  { k: '05', title: 'Validation engine', sub: 'Rule checks · retry if invalid', retry: true },
  { k: '06', title: 'CRM database', sub: 'Clean, structured data written back' },
]

export default function ArchitectureFlow({ compact = false }) {
  return (
    <figure className={`arch ${compact ? 'arch-compact' : ''}`} data-reveal aria-label="Proposed AI reference calling architecture">
      <ol className="arch-flow">
        {STAGES.map((s, i) => (
          <li className={`arch-node ${s.retry ? 'has-retry' : ''}`} key={s.k} style={{ '--n': i }}>
            <span className="arch-k">{s.k}</span>
            <b>{s.title}</b>
            <span className="arch-sub">{s.sub}</span>
            {s.retry && <span className="arch-retry" aria-label="On failure, ask the caller to repeat">↺ retry</span>}
            {i < STAGES.length - 1 && <span className="arch-link" aria-hidden="true"><i /></span>}
          </li>
        ))}
      </ol>
      <div className="arch-fork" style={{ '--n': STAGES.length }}>
        <span className="arch-fork-label">Sentiment detection hub</span>
        <span className="arch-branch arch-neg">Negative → human agent intervention</span>
        <span className="arch-branch arch-pos">Positive / neutral → CRM</span>
        <span className="arch-branch arch-tts">Text-to-speech replies to the caller</span>
      </div>
      <figcaption>The architecture I proposed: LLM reasoning extracts structured intent instead of relying on a perfect transcript.</figcaption>
    </figure>
  )
}
