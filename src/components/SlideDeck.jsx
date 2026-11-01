import { useEffect, useRef, useState } from 'react'

const BASE = import.meta.env.BASE_URL

/**
 * Viewer for the original competition slides: main stage + thumbnail strip,
 * arrow keys / buttons, and a full-screen view for reading the detail.
 * Slides are shown uncropped, in their original design.
 */
export default function SlideDeck({ slides, title }) {
  const [i, setI] = useState(0)
  const [full, setFull] = useState(false)
  const dialog = useRef(null)
  const strip = useRef(null)
  const n = slides.length
  const go = (k) => setI((c) => (k + n) % n)

  useEffect(() => {
    const d = dialog.current
    if (full && !d.open) d.showModal()
    if (!full && d.open) d.close()
  }, [full])

  useEffect(() => {
    strip.current?.querySelector(`[data-k="${i}"]`)?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [i])

  const keys = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1) }
  }
  const s = slides[i]
  const portrait = s.ratio.includes('1.414') && s.ratio.startsWith('1 /')

  return (
    <div className="deck" role="region" aria-roledescription="slide deck" aria-label={`${title}: original presentation`} onKeyDown={keys}>
      <div className={`deck-stage ${portrait ? 'is-portrait' : ''}`}>
        <button type="button" className="deck-view" onClick={() => setFull(true)} aria-label={`Open slide ${i + 1} full screen: ${s.label}`}>
          <img key={s.src} src={BASE + s.src} alt={s.alt} loading="lazy" decoding="async" />
        </button>
        <button type="button" className="deck-nav deck-prev" onClick={() => go(i - 1)} aria-label="Previous slide">‹</button>
        <button type="button" className="deck-nav deck-next" onClick={() => go(i + 1)} aria-label="Next slide">›</button>
      </div>
      <div className="deck-bar">
        <p className="deck-caption" aria-live="polite"><b>{String(i + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')} · {s.label}</p>
        <button type="button" className="deck-full" onClick={() => setFull(true)}>View full screen ⤢</button>
      </div>
      <div className="deck-strip" ref={strip}>
        {slides.map((t, k) => (
          <button type="button" key={t.src} data-k={k} className={`deck-thumb ${k === i ? 'is-on' : ''}`} onClick={() => setI(k)} aria-label={`Slide ${k + 1}: ${t.label}`} aria-current={k === i ? 'true' : undefined}>
            <img src={BASE + t.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      <dialog className="deck-modal" ref={dialog} onClose={() => setFull(false)} onKeyDown={keys} onClick={(e) => e.target === dialog.current && setFull(false)} aria-label={`${title}, slide ${i + 1}`}>
        {full && (
          <div className="deck-modal-inner">
            <img src={BASE + s.src} alt={s.alt} />
            <div className="deck-modal-bar">
              <button type="button" onClick={() => go(i - 1)} aria-label="Previous slide">‹</button>
              <span>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} · {s.label}</span>
              <button type="button" onClick={() => go(i + 1)} aria-label="Next slide">›</button>
              <button type="button" className="deck-close" onClick={() => setFull(false)} aria-label="Close full screen">×</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  )
}
