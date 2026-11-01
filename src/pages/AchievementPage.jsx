import { achievements } from '../content/record'
import { achievementMedia } from '../content/media'
import { DetailPage, Block, GalleryBlock, NextCard, NotFound } from './Detail'
import { StatusBadge, ExtLink, Media, Todo } from '../components/ui'
import { achievementHref } from '../sections/Achievements'

export default function AchievementPage({ slug }) {
  const i = achievements.findIndex((a) => a.slug === slug)
  if (i < 0) return <NotFound />
  const a = achievements[i]
  const m = achievementMedia[a.slug]
  const next = achievements[(i + 1) % achievements.length]
  return (
    <DetailPage
      back={{ href: '#achievements', label: 'Achievements' }}
      eyebrow={<><span>National case competition</span><StatusBadge status={a.status}>{a.statusLabel}</StatusBadge></>}
      title={a.name}
      lede={a.text}
      meta={[['Organiser', a.org], ['Result', a.statusLabel], ['Date', a.date]]}
      hero={{ img: m.photo, mark: a.statusLabel }}
    >
      <Block label="Details" v={a.details} todo="the problem, your approach and what made the difference" />
      <section className="dt-block" data-reveal>
        <h2 className="dt-label">Certificate</h2>
        <div className="dt-content dt-cert">
          <Media img={m.certificate} />
          <div className="dt-cert-side">
            <div className="dt-logo"><Media img={m.logo} /></div>
            {a.certificateUrl ? <ExtLink href={a.certificateUrl}>Verify certificate</ExtLink> : <Todo>verification link</Todo>}
          </div>
        </div>
      </section>
      <GalleryBlock label="Presentation & photographs" items={m.gallery} />
      {a.caseStudy && <NextCard href={`#/work/${a.caseStudy}`} kicker="Full case study" title="Rebuilding Aspiration in the SUV Portfolio" />}
      <NextCard href={achievementHref(next)} kicker="Next achievement" title={`${next.statusLabel} · ${next.name}`} />
    </DetailPage>
  )
}
