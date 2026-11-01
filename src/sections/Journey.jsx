import { useEffect, useRef, useState } from 'react'
import { journey } from '../content/record'
import { journeyMedia } from '../content/media'
import { useScrollProgress, reduced, goTo } from '../lib/motion'
import { SectionHead, IIMLogo, Todo } from '../components/ui'
import PhotoStack from '../components/PhotoStack'

function Stage({ j, i, active, next }) {
  const photos = journeyMedia[j.id] ?? []
  return (
    <li id={`stage-${j.id}`} className={`jr-item ${i % 2 ? 'is-right' : 'is-left'} ${active ? 'is-active' : ''}`}>
      <span className="jr-node" aria-hidden="true"><span className="jr-node-core">{String(i + 1).padStart(2, '0')}</span></span>
      <article className="jr-card" data-reveal>
        <div className="jr-media"><PhotoStack photos={photos} label={j.title} /></div>
        <div className="jr-body">
          <p className="jr-when">{j.when}<span>{j.place}</span></p>
          <h3>{j.iim && <IIMLogo className="jr-iim" />}{j.title}</h3>
          <p className="jr-org">{j.org}</p>
          <p className="jr-text">{j.text}</p>
          {j.highlights.length > 0
            ? <ul className="ticks jr-highlights">{j.highlights.map((h) => <li key={h}>{h}</li>)}</ul>
            : <Todo block>highlights for this stage</Todo>}
          <div className="jr-actions">
            {j.link && <a className="link" href={j.link.href}>{j.link.label} <span aria-hidden="true">→</span></a>}
            {next && (
              <button type="button" className="jr-next" onClick={() => goTo(`#stage-${next.id}`)}>
                Next chapter: {next.title} <span aria-hidden="true">↓</span>
              </button>
            )}
          </div>
        </div>
      </article>
    </li>
  )
}

/** Curved road through every milestone. It draws itself with scroll; nodes light up as it reaches them. */
export default function Journey() {
  const list = useRef(null)
  const trail = useRef(null)
  const orb = useRef(null)
  const geo = useRef({ len: 0, stops: [] })
  const [shape, setShape] = useState({ d: '', w: 0, h: 0 })
  const [reached, setReached] = useState(-1)

  useEffect(() => {
    const build = () => {
      const L = list.current
      if (!L) return
      // layout offsets, not bounding rects, so section entrance transforms can't skew the road
      const r = { width: L.offsetWidth, height: L.offsetHeight }
      const pts = [...L.querySelectorAll('.jr-node')].map((el) => {
        let x = el.offsetWidth / 2, y = el.offsetHeight / 2, n = el
        while (n && n !== L) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent }
        return [x, y]
      })
      if (!pts.length) return
      const amp = r.width < 700 ? 16 : Math.min(180, r.width * 0.14)
      let d = `M ${pts[0][0]} 0 `
      let prev = [pts[0][0], 0]
      pts.concat([[pts[pts.length - 1][0], r.height]]).forEach((p, i) => {
        const dir = i % 2 ? 1 : -1
        const dy = (p[1] - prev[1]) / 2
        d += `C ${prev[0] + amp * dir} ${prev[1] + dy}, ${p[0] + amp * dir} ${p[1] - dy}, ${p[0]} ${p[1]} `
        prev = p
      })
      geo.current.stops = pts.map((p) => p[1] / r.height)
      setShape({ d, w: r.width, h: r.height })
    }
    build()
    const ro = new ResizeObserver(build)
    ro.observe(list.current)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!shape.d || !trail.current) return
    const len = trail.current.getTotalLength()
    geo.current.len = len
    trail.current.style.strokeDasharray = `${len}`
    trail.current.style.strokeDashoffset = `${len}`
    // road measured: recompute progress for the current scroll position
    dispatchEvent(new Event('scroll'))
  }, [shape.d])

  useScrollProgress(list, (raw) => {
    const p = reduced ? 1 : raw // reduced motion: show the whole road
    const { len, stops } = geo.current
    const path = trail.current
    if (!len || !path) return
    path.style.strokeDashoffset = `${len * (1 - p)}`
    const pt = path.getPointAtLength(len * p)
    if (orb.current) orb.current.style.transform = `translate(${pt.x}px, ${pt.y}px)`
    // vertical position of the road's tip vs each node
    const tip = pt.y / (shape.h || 1)
    let n = -1
    stops.forEach((s, i) => { if (tip >= s - 0.01) n = i })
    setReached((prev) => (prev === n ? prev : n))
  }, { start: 0.75, end: 0.55 })

  return (
    <section className="section journey" id="journey" aria-labelledby="jr-title">
      <div className="wrap" data-stage>
        <SectionHead no="04" label="Journey" title="The road so far." intro="From a school in Delhi to IIM Jammu: four chapters, each one leading to the next. Follow the road." id="jr-title" center />
        <ol className="jr-list" ref={list}>
          <svg className="jr-map" width={shape.w} height={shape.h} viewBox={`0 0 ${shape.w || 1} ${shape.h || 1}`} aria-hidden="true">
            <path d={shape.d} className="jr-road" />
            <path d={shape.d} className="jr-trail" ref={trail} />
          </svg>
          <span className="jr-orb" ref={orb} aria-hidden="true" />
          {journey.map((j, i) => <Stage key={j.id} j={j} i={i} active={i <= reached} next={journey[i + 1]} />)}
        </ol>
      </div>
    </section>
  )
}
