import { useState } from 'react'
import { achievements } from '../content/record'
import { achievementMedia } from '../content/media'
import { projects } from '../content/projects'
import { Tilt } from '../lib/motion'
import { SectionHead, StatusBadge, Media, WithIIM, RoleChips } from '../components/ui'

const maruti = projects.find((p) => p.slug === 'maruti-suzuki-xcelerate')
export const achievementHref = (a) => (a.caseStudy ? `#/work/${a.caseStudy}` : `#/achievements/${a.slug}`)
const roleOf = (a) => projects.find((p) => p.slug === a.caseStudy)?.myRole

function AchievementCard({ a, i, lead = false }) {
  const [open, setOpen] = useState(false)
  const m = achievementMedia[a.slug]
  const id = `ach-more-${a.slug}`
  return (
    <div className={`ach-cell ach-cell-${a.status} ${lead ? 'is-lead' : ''}`} data-reveal style={{ '--i': i }}>
      <Tilt as="article" className={`ach ach-${a.status}`} max={lead ? 3 : 4}>
        <div className="ach-media">
          {m.duo
            ? <div className="ach-duo">{m.duo.map((img, k) => <div className={`ach-duo-item ach-duo-${k}`} key={img.src}><Media img={img} /></div>)}</div>
            : <Media img={m.photo} mark={String(i + 1).padStart(2, '0')} />}
        </div>
        <Media img={m.logo} className="ach-logo-media" hideIfMissing />
        <div className="ach-body">
          <StatusBadge status={a.status}>{a.statusLabel}</StatusBadge>
          <h3><a href={achievementHref(a)}>{a.name}</a></h3>
          <p className="ach-org"><WithIIM>{a.org}</WithIIM></p>
          <p className="ach-text">{a.text}</p>
          <RoleChips role={roleOf(a)} />
          <div className="ach-actions">
            <button className="ach-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
              {open ? 'Hide details' : 'Certificate & details'} <span aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            <a className="link" href={achievementHref(a)}>{a.caseStudy ? 'Case study' : 'Full details'} <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="ach-more" id={id} hidden={!open}>
          <div className="ach-more-grid">
            <Media img={m.certificate} />
            <Media img={m.gallery[0]} />
          </div>
          {a.details.length > 0 && <ul className="ticks">{a.details.map((d) => <li key={d}>{d}</li>)}</ul>}
        </div>
      </Tilt>
    </div>
  )
}

export default function Achievements() {
  return (
    <section className="section ach-section" id="achievements" aria-labelledby="ach-title">
      <div className="wrap" data-stage>
        <SectionHead
          no="01" label="Achievements"
          title={['Tested through challenges.', 'Recognised through results.']}
          intro="National case competitions where I worked on real business questions under pressure, from forecasting and growth strategy to cost optimisation and brand strategy."
          id="ach-title"
        />
        <div className="ach-grid">
          {achievements.map((a, i) => <AchievementCard key={a.slug} a={a} i={i} lead={i === 0} />)}
        </div>

        <div className="feature-wrap" data-reveal>
        <Tilt as="a" max={4} className="feature" href={`#/work/${maruti.slug}`}>
          <div className="feature-copy">
            <p className="eyebrow">Featured case study · {maruti.recognition.label}</p>
            <h3>Rebuilding Aspiration in the SUV Portfolio</h3>
            <p>{maruti.question}</p>
            <span className="link">Inside the Team Swift strategy <span aria-hidden="true">→</span></span>
          </div>
          <ol className="feature-mars" aria-label={maruti.framework.name}>
            {maruti.framework.items.map(([k, v], i) => <li key={k} style={{ '--i': i }}><b>{k}</b><span>{v}</span></li>)}
          </ol>
        </Tilt>
        </div>
      </div>
    </section>
  )
}
