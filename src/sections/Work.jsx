import { useState } from 'react'
import { projects, categories } from '../content/projects'
import { experience } from '../content/experience'
import { proofPoints } from '../content/profile'
import { projectMedia, experienceMedia, logos } from '../content/media'
import { Tilt } from '../lib/motion'
import { SectionHead, SubHead, StatusBadge, Chips, Media, Todo, TechLogo, Rich } from '../components/ui'
import ArchitectureFlow from '../components/ArchitectureFlow'

const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]))
const cars24 = experience.find((x) => x.slug === 'cars24')
// Case competitions live under Achievements; Work lists AI & analytics projects.
const items = projects.filter((p) => p.category !== 'case').map((p) => ({
  ...p, href: `#/work/${p.slug}`, mark: p.cover.big, cover: projectMedia[p.slug].cover, visuals: projectMedia[p.slug].gallery.length,
}))

/** Cars24: the professional experience, given the spotlight. */
function Cars24Spotlight() {
  const x = cars24
  const m = experienceMedia[x.slug]
  return (
    <div className="spot-wrap" id="experience">
    <SubHead kicker="Professional experience · Spotlight" title="Cars24" id="cars24-title" />
    <article className="spot" aria-labelledby="cars24-title">
      <div className="spot-head" data-reveal>
        <p className="eyebrow">Professional experience · {x.role}</p>
        <p className="spot-company"><img className="spot-logo" src={import.meta.env.BASE_URL + logos.cars24} alt="Cars24" width="256" height="192" /><span className="sr-only">{x.company}</span><span>{x.unit}</span></p>
        <p className="spot-headline"><Rich text={x.headline} /></p>
        {!x.period && <Todo>internship dates</Todo>}
      </div>

      <div className="spot-grid">
        <div className="spot-media" data-reveal>
          <div className="spot-layer spot-layer-main"><Media img={m.gallery[0]} mark={x.company} /></div>
          <div className="spot-layer spot-layer-float"><Media img={m.cover} /></div>
        </div>
        <div className="spot-tracks">
          {x.tracks.map((t, i) => (
            <div className="spot-track-cell" key={t.key} data-reveal style={{ '--i': i }}>
              <Tilt as="section" max={6} className={`spot-track spot-${t.key}`} aria-labelledby={`track-${t.key}`}>
                <p className="spot-kicker">{t.kicker}</p>
                <h4 id={`track-${t.key}`}>{t.title}</h4>
                <ul className="ticks">{t.points.map((pt) => <li key={pt}><Rich text={pt} /></li>)}</ul>
                <Chips items={t.stack} />
                {t.href && <a className="link" href={t.href}>Read the case study <span aria-hidden="true">→</span></a>}
              </Tilt>
            </div>
          ))}
        </div>
      </div>

      <ArchitectureFlow />

      <div className="spot-foot" data-reveal>
        <p className="exp-note">{x.collaboration}</p>
        <div className="spot-ctas">
          <a className="btn btn-primary" href={`#/experience/${x.slug}`}>The full Cars24 story <span aria-hidden="true">→</span></a>
          <a className="btn btn-secondary" href="#/work/ai-reference-analysis">AI Reference Analysis <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </article>
    </div>
  )
}

function WorkCard({ p, i, wide = false }) {
  return (
    <div className={`wk-cell ${wide ? 'is-wide' : ''}`} data-reveal style={{ '--i': i }}>
      <Tilt as="article" className="wk-card" max={wide ? 3 : 4}>
        <a href={p.href} className="wk-hit" aria-label={`${p.title}: open case study`} />
        <div className="wk-media">
          <Media img={p.cover} mark={p.mark} />
          <span className="wk-visuals">+{p.visuals} visuals</span>
        </div>
        <div className="wk-body">
          <p className="wk-meta"><span>{p.org ?? catLabel[p.category]}</span><span>{p.kicker}</span></p>
          <h3>{p.title}</h3>
          {p.recognition?.label && <StatusBadge status={p.recognition.status}>{p.recognition.label}</StatusBadge>}
          <p className="wk-text">{p.summary}</p>
          <Chips items={p.tools.slice(0, 4)} />
          <div className="wk-links">
            <span className="link wk-more" aria-hidden="true">Case study →</span>
            {p.link && <a className="wk-gh" href={p.link} target="_blank" rel="noreferrer"><TechLogo name="github" />GitHub ↗</a>}
          </div>
        </div>
      </Tilt>
    </div>
  )
}

export default function Work() {
  const [cat, setCat] = useState('all')
  const list = cat === 'all' ? items : items.filter((p) => p.category === cat)
  return (
    <section className="section tint" id="work" aria-labelledby="work-title">
      <div className="wrap" data-stage>
        <SectionHead no="02" label="Work & experience" title={['Ideas into execution.']} intro="A product management internship at Cars24, and the AI and analytics projects behind the work." id="work-title" />

        <Cars24Spotlight />

        <ul className="proof-grid" aria-label="Proof points">
          {proofPoints.map((p, i) => (
            <li key={p.label} data-reveal style={{ '--i': i }}>
              <a href={p.href} className="proof-card">
                <span className="proof-value">
                  {p.from && <s className="proof-from" aria-label={`from ${p.from}`}>{p.from}</s>}
                  {p.from && <span className="proof-arrow" aria-hidden="true">→</span>}
                  {p.value}
                </span>
                <span className="proof-label">{p.label}</span>
                <span className="proof-context">{p.context}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="filters" role="group" aria-label="Filter projects" data-reveal>
          {categories.map((c) => {
            const n = c.id === 'all' ? items.length : items.filter((p) => p.category === c.id).length
            return <button key={c.id} className="filter" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.label}<span>{n}</span></button>
          })}
        </div>
        <p className="sr-only" aria-live="polite">{list.length} projects shown</p>

        <SubHead kicker="Independent work · GitHub" title="AI & Analytics Projects" />
        <div className="wk-grid">{list.map((p, i) => <WorkCard key={p.slug} p={p} i={i} wide={p.spotlight} />)}</div>
      </div>
    </section>
  )
}
