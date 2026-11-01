import { experience } from '../content/experience'
import { experienceMedia } from '../content/media'
import { DetailPage, Block, GalleryBlock, NextCard, NotFound } from './Detail'
import { Chips, Rich, plain } from '../components/ui'
import ArchitectureFlow from '../components/ArchitectureFlow'

export default function ExperiencePage({ slug }) {
  const x = experience.find((e) => e.slug === slug)
  if (!x) return <NotFound />
  const d = x.detail
  const m = experienceMedia[x.slug]
  return (
    <DetailPage
      back={{ href: '#experience', label: 'Experience' }}
      eyebrow={<><span>{x.company}</span><span>{x.discipline}</span></>}
      title={plain(x.headline)}
      lede={x.summary}
      meta={[['Role', x.role], ['Organisation', `${x.company} · ${x.unit}`], ['Period', x.period]]}
      hero={{ img: m.cover, mark: x.company }}
    >
      <Block label="The problem" v={d.problem} todo="the problem you worked on" />
      <Block label="My role" v={d.role} />
      <Block label="Approach" v={d.approach} />
      <section className="dt-wide" data-reveal>
        <h2 className="dt-label">Two workstreams</h2>
        <div className="spot-tracks spot-tracks-row">
          {x.tracks.map((t) => (
            <section className={`spot-track spot-${t.key}`} key={t.key}>
              <p className="spot-kicker">{t.kicker}</p>
              <h4>{t.title}</h4>
              <ul className="ticks">{t.points.map((pt) => <li key={pt}><Rich text={pt} /></li>)}</ul>
              <Chips items={t.stack} />
              {t.href && <a className="link" href={t.href}>Read the case study <span aria-hidden="true">→</span></a>}
            </section>
          ))}
        </div>
      </section>
      <section className="dt-wide" data-reveal><h2 className="dt-label">AI reference calling: the architecture I proposed</h2><ArchitectureFlow /></section>
      <Block label="Key contributions"><ul className="ticks">{x.contributions.map((c) => <li key={c}><Rich text={c} /></li>)}</ul></Block>
      <Block label="Deliverables" v={d.deliverables} />
      <Block label="Outcomes" v={d.outcomes} />
      <Block label="Collaboration" v={x.collaboration} />
      <Block label="Tools"><Chips items={x.tools} /></Block>
      <Block label="What I learned" v={d.learnings} todo="key learnings, in your words" />
      <GalleryBlock label="Photographs & visuals" items={m.gallery} />
      <p className="dt-disclaimer" data-reveal>Shared at a level that respects company confidentiality. No internal data or proprietary details are disclosed; visuals are anonymised or approved.</p>
      <NextCard href="#work" kicker="Next" title="See the rest of the work" />
    </DetailPage>
  )
}
