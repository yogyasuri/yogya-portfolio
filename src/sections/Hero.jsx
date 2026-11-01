import { profile } from '../content/profile'
import { achievements } from '../content/record'
import { projects } from '../content/projects'
import { goTo, Tilt } from '../lib/motion'
import { IIMLogo } from '../components/ui'
import HeroVideo from '../components/HeroVideo'

const WORDS = ['AI', 'Product', 'Strategy', 'Business']
// deterministic "random" particle field
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  x: (i * 37) % 100, y: (i * 53) % 100, s: 2 + ((i * 7) % 4), d: 8 + ((i * 11) % 10), delay: -((i * 13) % 12),
}))

function WordCube() {
  return (
    <span className="cube-wrap" aria-hidden="true">
      <span className="cube">{WORDS.map((w, i) => <span key={w} className="cube-face" style={{ '--f': i }}>{w}</span>)}</span>
    </span>
  )
}

export default function Hero() {
  const jump = (id) => (e) => { e.preventDefault(); goTo(id) }
  const winner = achievements.find((a) => a.status === 'winner')
  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
      <div className="particles" aria-hidden="true">
        {PARTICLES.map((p, i) => <i key={i} style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.delay}s` }} />)}
      </div>

      <div className="wrap hr-grid">
        <div className="hr-copy">
          <p className="hr-badge"><IIMLogo className="hr-badge-logo" />MBA · {profile.institutionShort} <span className="hr-badge-batch">{profile.batch}</span></p>

          <h1 className="hr-name" id="hero-name" aria-label={profile.name}>
            <span className="hr-word" aria-hidden="true">{'YOGYA'.split('').map((c, i) => <span key={i} className="hr-ch" style={{ '--i': i }}>{c}</span>)}</span>
            <span className="hr-word" aria-hidden="true">{'SURI'.split('').map((c, i) => <span key={i} className="hr-ch" style={{ '--i': i + 5 }}>{c}</span>)}<span className="hr-ch hr-dot" style={{ '--i': 9 }}>.</span></span>
          </h1>

          <p className="hr-tag">Business meets <b>AI.</b><br />Product meets <b>Strategy.</b></p>
          <p className="hr-cube-line"><span>Thinking in</span> <WordCube /><span className="sr-only">AI, Product, Strategy and Business</span></p>
          <p className="hr-intro">{profile.intro}</p>

          <div className="hr-ctas">
            <Tilt as="a" max={6} href="#achievements" className="cta-card" onClick={jump('#achievements')}>
              <span className="cta-k">Explore achievements</span>
              <span className="cta-v">{winner.statusLabel} · {winner.name} <em>+{achievements.length - 1} more</em></span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Tilt>
            <Tilt as="a" max={6} href="#work" className="cta-card" onClick={jump('#work')}>
              <span className="cta-k">Explore work</span>
              <span className="cta-v">{projects.length} case studies · AI, analytics, strategy</span>
              <span className="cta-arrow" aria-hidden="true">→</span>
            </Tilt>
          </div>
          <a className="btn btn-primary hr-connect" href="#contact" onClick={jump('#contact')}>Let’s connect <span aria-hidden="true">↗</span></a>
        </div>

        <div className="hr-stage">
          <Tilt className="hr-avatar" max={4}>
            <span className="hr-halo" aria-hidden="true" />
            <HeroVideo />
            <span className="hr-floor" aria-hidden="true" />
          </Tilt>
        </div>

        <dl className="hr-creds">
          <div><dt>Now</dt><dd className="with-iim"><IIMLogo />Pursuing an MBA at {profile.institution}</dd></div>
          <div><dt>Specialisation</dt><dd>{profile.specialisation}</dd></div>
          <div><dt>Foundation</dt><dd>{profile.ugDegree} · {profile.ugShort}</dd></div>
        </dl>
      </div>
    </section>
  )
}
