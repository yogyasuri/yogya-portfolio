import { projects, categories } from '../content/projects'
import { projectMedia } from '../content/media'
import { DetailPage, Block, GalleryBlock, NextCard, NotFound } from './Detail'
import { StatusBadge, Chips, ExtLink, Todo, WithIIM, RoleBreakdown, RoleChips } from '../components/ui'
import SlideDeck from '../components/SlideDeck'
import ArchitectureFlow from '../components/ArchitectureFlow'

const catLabel = { ...Object.fromEntries(categories.map((c) => [c.id, c.label])), case: 'National case competition' }

function Financials({ p }) {
  if (!p.financials?.length) return null
  const filled = p.financials.filter((f) => f.value)
  if (!filled.length && !import.meta.env.DEV) return null
  return (
    <section className="dt-block" data-reveal>
      <h2 className="dt-label">Financial model</h2>
      <div className="dt-content">
        <p className="fin-flag">Projected · team-proposed estimates, not actual company performance</p>
        <div className="fin-grid">
          {p.financials.map((f) => (
            <div className="fin" key={f.label}>
              <span>{f.label}</span>
              {f.value ? <b>{f.value}</b> : <Todo>from the deck</Todo>}
            </div>
          ))}
        </div>
        {p.financialNote && <p className="fin-note">{p.financialNote}</p>}
      </div>
    </section>
  )
}

export default function CaseStudy({ slug }) {
  const i = projects.findIndex((x) => x.slug === slug)
  if (i < 0) return <NotFound />
  const p = projects[i]
  const m = projectMedia[p.slug]
  const isCase = p.category === 'case'
  // "next" stays within the same group: case competitions, or projects
  const group = projects.filter((x) => (x.category === 'case') === isCase)
  const next = group[(group.findIndex((x) => x.slug === p.slug) + 1) % group.length]
  const isTeam = Boolean(p.team)
  const strategy = isCase

  return (
    <DetailPage
      back={isCase ? { href: '#achievements', label: 'Achievements' } : { href: '#work', label: 'All work' }}
      eyebrow={<><span>{catLabel[p.category]}</span><span>{p.kicker}</span>{p.recognition?.label && <StatusBadge status={p.recognition.status}>{p.recognition.label}</StatusBadge>}<RoleChips role={p.myRole} /></>}
      title={p.title}
      lede={p.summary}
      meta={[['Type', isTeam ? 'Team project' : p.org ? 'Internship project' : 'Project'], ['Organisation', p.org], ['Team', p.team && <WithIIM>{p.team}</WithIIM>], ['Key figure', p.metric && `${p.metric.value} ${p.metric.label}`]]}
      hero={m.cover.ratio.startsWith('1 / 1.4') ? undefined : { img: m.cover, mark: p.cover.big }}
    >
      {p.recognition?.status === 'case' && <Todo block>competition result for {p.short}</Todo>}
      {p.impact && (
        <section className="dt-impact" data-reveal aria-label="Projected impact">
          {p.impact.map(([v, l]) => <div key={l}><b>{v}</b><span>{l}</span></div>)}
          <p>Projected by the team · not actual company results</p>
        </section>
      )}
      {p.myRole
        ? (
          <section className="dt-wide dt-role" data-reveal>
            <h2 className="dt-label">My contribution{isTeam && ' · within the team'}</h2>
            <RoleBreakdown role={p.myRole} />
          </section>
        )
        : <Block label={isTeam ? 'My contribution to the team' : 'My contribution'} v={p.contribution} todo="what you personally did" />}

      <Block label="Problem statement" v={p.question} todo="problem statement" />
      <Block label="Context" v={p.context} todo="context" />
      <Block label="Objective" v={p.objective} todo="objective" />
      <Block label={p.baseline ? 'Bottlenecks' : 'Research & data'} v={p.research} />
      {p.baseline && (
        <Block label="Current system">
          <table className="base"><tbody>{p.baseline.map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>
        </Block>
      )}
      <Block label="Methodology" v={p.methodology} />
      <Block label={strategy ? 'Strategic approach' : 'Technical approach'} v={p.approach} />

      {p.framework && (
        <Block label={p.framework.name}>
          <ol className="mars">{p.framework.items.map(([k, v]) => <li key={k}><b>{k}</b><span>{v}</span></li>)}</ol>
        </Block>
      )}

      <Block label="Analysis" v={p.analysis} todo="key analysis" />
      <Block label={p.findingsLabel ?? 'Findings'} v={p.findings} todo="headline findings" />
      {p.architecture && <section className="dt-wide" data-reveal><h2 className="dt-label">Proposed system architecture</h2><ArchitectureFlow /></section>}

      {p.solution && (
        <Block label={isTeam ? 'The team’s recommendations' : strategy ? 'Recommendations' : 'Solution'}>
          {p.solution.flagship && (
            <div className="flagship">
              <p className="eyebrow">Flagship proposal</p>
              <h3>{p.solution.flagship}</h3>
              <p>{p.solution.flagshipText}</p>
            </div>
          )}
          {p.solution.dimensions?.length > 0 && <ul className="ticks">{p.solution.dimensions.map((d) => <li key={d}>{d}</li>)}</ul>}
        </Block>
      )}
      {!p.solution && <Block label="Recommendations" v={p.recommendations} />}

      <Block label="Security & compliance" v={p.security} />
      <Financials p={p} />
      <Block label="Execution roadmap" v={p.roadmap} todo={p.roadmap ? 'roadmap phases from the deck' : null} />
      <Block label="Outcomes" v={p.outcomes} todo="outcomes" />
      <Block label="Tools & methods"><Chips items={p.tools} /></Block>

      {m.deck && (
        <section className="dt-wide" data-reveal>
          <h2 className="dt-label">The original deck</h2>
          <SlideDeck slides={m.deck} title={p.short ?? p.title} />
        </section>
      )}
      <GalleryBlock items={m.gallery} />

      {isTeam && <p className="dt-disclaimer" data-reveal>This was a team submission ({p.team}). The analysis, recommendations and model above are the team’s collective work and proposals, not actions taken by the company; my individual contribution is set out above.</p>}
      {p.link && <p data-reveal><ExtLink href={p.link} className="btn btn-secondary">View project</ExtLink></p>}

      {next && next.slug !== p.slug && <NextCard href={`#/work/${next.slug}`} kicker={isCase ? 'Next case competition' : 'Next project'} title={next.title} />}
    </DetailPage>
  )
}
