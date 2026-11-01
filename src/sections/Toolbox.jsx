import { useState } from 'react'
import { toolbox } from '../content/record'
import { Tilt } from '../lib/motion'
import { SectionHead, TechLogo } from '../components/ui'

/** Floating 3D skill clusters. All open by default; each can be collapsed. */
export default function Toolbox() {
  const [open, setOpen] = useState(() => toolbox.map(() => true))
  const toggle = (i) => setOpen((o) => o.map((v, k) => (k === i ? !v : v)))
  return (
    <section className="section" id="toolbox" aria-labelledby="tb-title">
      <div className="wrap" data-stage>
        <SectionHead no="03" label="What I Bring to the Table" title="The capabilities behind the work." intro="Grouped by discipline: the tools and methods I’ve used across projects, internships and competitions." id="tb-title" />
        <div className="tb-stage">
          {toolbox.map((g, i) => {
            const isOpen = open[i]
            return (
              <div className={`tb-cell ${isOpen ? 'is-open' : ''}`} key={g.name} data-reveal style={{ '--i': i }}>
                <Tilt className="tb" max={4}>
                  <button className="tb-head" aria-expanded={isOpen} aria-controls={`tb-${i}`} onClick={() => toggle(i)}>
                    <span className="tb-orb" aria-hidden="true"><span>{g.glyph}</span></span>
                    <span className="tb-name">{g.name}</span>
                    <span className="tb-count">{g.items.length} skills <span aria-hidden="true">{isOpen ? '−' : '+'}</span></span>
                  </button>
                  <ul className="tb-skills" id={`tb-${i}`} hidden={!isOpen}>
                    {g.items.map((s, k) => <li key={s} style={{ '--k': k }}><TechLogo name={s} />{s}</li>)}
                  </ul>
                </Tilt>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
