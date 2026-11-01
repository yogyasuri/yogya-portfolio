import { useState } from 'react'
import { Media } from './ui'

/** Fanned stack of photos; tap or press Enter to bring the next one forward. */
export default function PhotoStack({ photos, label }) {
  const [top, setTop] = useState(0)
  const n = photos.length
  const next = () => setTop((t) => (t + 1) % n)
  return (
    <div className="pstack" style={{ '--n': n }}>
      {photos.map((img, k) => {
        const pos = (k - top + n) % n
        return (
          <div className="pstack-card" key={img.src} style={{ '--pos': pos, zIndex: n - pos }} aria-hidden={pos !== 0}>
            <Media img={img} />
          </div>
        )
      })}
      {n > 1 && (
        <button type="button" className="pstack-next" onClick={next} aria-label={`Next photo from ${label} (${top + 1} of ${n})`}>
          <span>{top + 1}/{n}</span> ↻
        </button>
      )}
    </div>
  )
}
