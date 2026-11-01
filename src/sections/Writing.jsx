import { useEffect, useRef, useState } from 'react'
import { articles, writingCategories } from '../content/record'
import { articleCover } from '../content/media'
import { Tilt } from '../lib/motion'
import { SectionHead, Media } from '../components/ui'

/** One horizontal row of equal-size article cards, scrolled with buttons, swipe or the keyboard. */
export default function Writing() {
  const [cat, setCat] = useState('All')
  const [edges, setEdges] = useState({ start: true, end: false })
  const row = useRef(null)
  const cats = ['All', ...writingCategories]
  const list = cat === 'All' ? articles : articles.filter((a) => a.category === cat)
  const published = articles.some((a) => a.status !== 'draft')

  const update = () => {
    const r = row.current
    if (!r) return
    setEdges({ start: r.scrollLeft < 8, end: r.scrollLeft + r.clientWidth > r.scrollWidth - 8 })
  }
  useEffect(() => {
    const r = row.current
    update()
    r.scrollTo({ left: 0 })
    r.addEventListener('scroll', update, { passive: true })
    addEventListener('resize', update)
    return () => { r.removeEventListener('scroll', update); removeEventListener('resize', update) }
  }, [cat])

  const scroll = (dir) => {
    const r = row.current
    const card = r.querySelector('.wr-cell')
    const step = card ? card.offsetWidth + 20 : r.clientWidth * 0.8
    r.scrollBy({ left: dir * step, behavior: 'smooth' })
  }

  return (
    <section className="section" id="writing" aria-labelledby="wr-title">
      <div className="wrap" data-stage>
        <SectionHead
          no="06" label="Articles" title="Thinking beyond the deliverables." id="wr-title"
          intro={published ? 'Notes on AI, product, strategy and what I’m learning along the way.' : 'Essays I’m currently writing on AI, product, strategy and learning. They’ll appear here as they’re published.'}
        />
        <div className="wr-toolbar" data-reveal>
          <div className="filters" role="group" aria-label="Filter writing">
            {cats.map((c) => <button key={c} className="filter" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <div className="wr-arrows">
            <button type="button" className="wr-arrow" onClick={() => scroll(-1)} disabled={edges.start} aria-label="Scroll articles left">‹</button>
            <button type="button" className="wr-arrow" onClick={() => scroll(1)} disabled={edges.end} aria-label="Scroll articles right">›</button>
          </div>
        </div>
        <div className={`wr-row ${edges.start ? '' : 'fade-start'} ${edges.end ? '' : 'fade-end'}`}>
          <ul className="wr-track" ref={row} tabIndex={0} aria-label="Articles">
            {list.map((a, i) => {
              const live = a.status !== 'draft' && a.body?.length
              return (
                <li className="wr-cell" key={a.slug} style={{ '--i': i }}>
                  <Tilt as="article" max={5} className={`wr-card ${live ? '' : 'is-draft'}`}>
                    {live && <a className="wk-hit" href={`#/writing/${a.slug}`} aria-label={a.title} />}
                    <Media img={articleCover(a.slug)} />
                    <div className="wr-body">
                      <p className="wr-cat">{a.category}</p>
                      <h3 className="wr-title">{a.title}</h3>
                      <p className="wr-meta">{live ? `${a.date} · ${a.minutes} min read` : 'In the works'}</p>
                    </div>
                  </Tilt>
                </li>
              )
            })}
            {list.length === 0 && <li className="wr-none">Nothing in this category yet.</li>}
          </ul>
        </div>
      </div>
    </section>
  )
}
