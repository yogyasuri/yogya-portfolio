import { personal, about, profile } from '../content/profile'
import { beyond } from '../content/record'
import { profileMedia, personalMedia } from '../content/media'
import { Tilt } from '../lib/motion'
import { SectionHead, Media, ExtLink } from '../components/ui'
import PhotoStack from '../components/PhotoStack'

/**
 * "Beyond the résumé": the personal dimension. No biography here: a personal
 * photograph, the principles Yogya works by, and what he does away from work.
 */
export default function Personal() {
  return (
    <section className="section tint" id="beyond" aria-labelledby="by-title">
      <div className="wrap" data-stage>
        <SectionHead no="05" label="Beyond the Résumé" title={personal.title} intro={personal.lede || undefined} id="by-title" />

        <div className="ps-top">
          <div className="ps-photo" data-reveal><Media img={profileMedia.beyond} /></div>
          <div className="ps-side">
            <div className="ps-story">
              {personal.story.map((t, i) => <p key={i} className={i === 0 ? 'ps-lead' : ''} data-reveal>{t}</p>)}
              <p className="ps-signoff" data-reveal>{personal.signoff}</p>
            </div>
          </div>
        </div>

        <div className="ps-extra">
            <aside className="beliefs" aria-labelledby="beliefs-title" data-reveal>
              <h3 id="beliefs-title" className="eyebrow">What I believe</h3>
              <ol>
                {about.beliefs.map((b, i) => (
                  <li key={b.title}><span className="beliefs-no">{String(i + 1).padStart(2, '0')}</span><div><b>{b.title}</b><p>{b.text}</p></div></li>
                ))}
              </ol>
            </aside>
        </div>

        <h3 className="wk-group">Away from work</h3>
        <div className="by-grid">
          {beyond.map((b, i) => (
            <div className={`by-cell by-${b.key}`} key={b.key} data-reveal style={{ '--i': i }}>
              <Tilt as="article" max={5} className="by">
                <div className="by-photos"><PhotoStack photos={personalMedia[b.key]} label={b.title} /></div>
                <div className="by-body">
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                  {b.honours?.map((h) => <p className="by-honour" key={h.event}><span className="by-medal" aria-hidden="true">3</span><b>{h.label}</b>{h.event}</p>)}
                  {b.stat && <p className="by-stat"><b>{b.stat.value}</b><span>{b.stat.label}</span></p>}
                  {b.linkKey && profile[b.linkKey] && <ExtLink href={profile[b.linkKey]}>{b.linkLabel}</ExtLink>}
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
