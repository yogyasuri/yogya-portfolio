import { profile, about } from '../content/profile'
import { profileMedia } from '../content/media'
import { experience } from '../content/experience'
import { achievements } from '../content/record'
import { DetailPage, Block, GalleryBlock, NextCard } from './Detail'

export default function AboutPage() {
  const x = experience[0]
  return (
    <DetailPage
      back={{ href: '#beyond', label: 'Home' }}
      eyebrow={<><span>About</span><span>{profile.institutionShort} · {profile.batch}</span></>}
      title="From code to business strategy."
      lede={profile.intro}
      meta={[['Programme', `${profile.programme} · ${profile.institution}`], ['Specialisation', profile.specialisation], ['Undergraduate', `${profile.ugDegree} · ${profile.ugInstitution}`]]}
      hero={{ img: { ...profileMedia.beyond, ratio: '16 / 9' } }}
    >
      <Block label="The story"><>{about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</></Block>
      <Block label="Education" v={[
        `${profile.programme}, ${profile.institution} (${profile.batch}), specialising in ${profile.specialisation}.`,
        `${profile.ugDegree}, ${profile.ugInstitution}.`,
      ]} />
      <Block label="Professional experience" v={[`${x.role}, ${x.company} (${x.unit}). ${x.summary}`.replace(/\*\*/g, '')]} />
      <Block label="Competitions" v={achievements.map((a) => `${a.statusLabel}, ${a.name} (${a.org}).`)} />
      <Block label="What I believe">
        <ol className="beliefs-list">{about.beliefs.map((b) => <li key={b.title}><b>{b.title}</b> {b.text}</li>)}</ol>
      </Block>
      <Block label="Outside work" v={about.personal} />
      <NextCard href="#contact" kicker="Next" title="Let’s talk" />
    </DetailPage>
  )
}
