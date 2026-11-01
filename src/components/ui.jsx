import { useState } from 'react'
import { profile } from '../content/profile'
import { logos } from '../content/media'
import { techLogo } from '../lib/techLogos'

const DEV = import.meta.env.DEV
const BASE = import.meta.env.BASE_URL

/** Personal round logo. Decorative by default; pass `label` when it stands alone. */
export function Logo({ className = '', label }) {
  return <img src={BASE + profile.logo} className={`logo ${className}`} alt={label ?? ''} width="512" height="512" decoding="async" />
}

/** Marks a detail that still needs confirming. Visible in `npm run dev` only. */
export function Todo({ children, block = false }) {
  if (!DEV) return null
  const Tag = block ? 'p' : 'span'
  return <Tag className={`todo ${block ? 'todo-block' : ''}`}>✎ To add: {children}</Tag>
}

/**
 * Section header: the section name is the large heading (pops up on scroll),
 * the editorial line sits beneath it.
 */
export function SectionHead({ no, label, title, intro, id, center = false }) {
  const lines = Array.isArray(title) ? title : title ? [title] : []
  return (
    <header className={`sh ${center ? 'sh-center' : ''}`} data-reveal>
      <p className="sh-no" aria-hidden="true">{no}</p>
      <h2 className="sh-big" id={id}><span className="sh-big-in">{label}</span></h2>
      {lines.length > 0 && <p className="sh-sub">{lines.map((t, i) => <span key={i} className="sh-line">{t}</span>)}</p>}
      {intro && <p className="sh-intro">{intro}</p>}
    </header>
  )
}

/** Large sub-heading inside a section (e.g. Cars24, AI & Analytics Projects). */
export function SubHead({ kicker, title, id }) {
  return (
    <header className="subh" data-reveal>
      {kicker && <p className="subh-k">{kicker}</p>}
      <h3 className="subh-big" id={id}><span className="sh-big-in">{title}</span></h3>
    </header>
  )
}

/**
 * Image slot. Loads `img.src` from /public; until that file exists it shows a
 * designed placeholder saying what belongs there (the file path shows in dev only).
 * Never renders a broken-image icon.
 */
export function Media({ img, className = '', mark, eager = false, onOpen, hideIfMissing = false }) {
  const [state, setState] = useState(img?.src ? 'loading' : 'missing')
  if (!img) return null
  if (hideIfMissing && state === 'missing') return null
  const ratioLabel = img.ratio.replace(/\s*\/\s*/, ':').replace('1.414:1', '√2 landscape')
  const body = (
    <>
      {state !== 'missing' && (
        <img
          src={BASE + img.src} alt={img.alt} loading={eager ? 'eager' : 'lazy'} decoding="async"
          className={state === 'ok' ? 'is-loaded' : ''}
          onLoad={() => setState('ok')} onError={() => setState('missing')}
        />
      )}
      {state !== 'ok' && (
        <span className="ph" aria-hidden={state === 'loading'}>
          {mark && <span className="ph-mark">{mark}</span>}
          <span className="ph-corners" />
          <span className="ph-body">
            <svg className="ph-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.6" /><path d="M21 16l-5-5-8 8" /></svg>
            <span className="ph-label">{img.label}</span>
            <span className="ph-meta">{ratioLabel}{DEV && <> · <code>public/{img.src}</code></>}</span>
          </span>
          {state === 'missing' && <span className="sr-only">Image placeholder: {img.label}</span>}
        </span>
      )}
    </>
  )
  return (
    <figure className={`media ${state === 'ok' ? 'has-img' : 'is-ph'} ${img.fit === 'contain' ? 'is-contain' : img.fit === 'top' ? 'is-top' : ''} ${className}`} style={{ '--ratio': img.ratio }}>
      {onOpen ? <button type="button" className="media-btn" onClick={() => onOpen(img)} aria-label={`Open ${img.label}`}>{body}</button> : body}
      {state === 'ok' && (img.caption || img.credit) && (
        <figcaption>{img.caption}{img.credit && <span className="media-credit"> · {img.credit}</span>}</figcaption>
      )}
    </figure>
  )
}

/** A responsive gallery of image slots. */
export function Gallery({ items, className = '' }) {
  if (!items?.length) return null
  return (
    <div className={`gallery ${className}`}>
      {items.map((img, i) => <div className="gallery-item" key={img.src + i} data-reveal style={{ '--i': i }}><Media img={img} /></div>)}
    </div>
  )
}

export function StatusBadge({ status, children }) {
  if (!children) return null
  return <span className={`status status-${status}`}>{children}</span>
}

// Very dark brand colours vanish on black, so those marks use the text colour.
const isDark = (hex) => { const n = parseInt(hex.slice(1), 16); return 0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255) < 70 }

/** Official logo for a technology label, or nothing if none exists. */
export function TechLogo({ name, className = '' }) {
  const l = techLogo(name)
  if (!l) return null
  if (l.kind === 'img') return <span className={`tlogo tlogo-img ${l.wide ? 'is-wide' : ''} ${className}`} aria-hidden="true"><img src={BASE + l.src} alt="" loading="lazy" decoding="async" /></span>
  return (
    <svg className={`tlogo ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      <path d={l.path} fill={isDark(l.hex) ? 'currentColor' : l.hex} />
    </svg>
  )
}

export function Chips({ items }) {
  if (!items?.length) return null
  return <ul className="chips">{items.map((t) => <li key={t} className={techLogo(t) ? 'has-logo' : ''}><TechLogo name={t} />{t}</li>)}</ul>
}

/** Official IIM Jammu logo, small, on its white plate. */
export function IIMLogo({ className = '', label }) {
  return <img src={BASE + logos.iimJammu} className={`iim-logo ${className}`} alt={label ?? ''} width="201" height="251" decoding="async" />
}

/** Renders text, prefixing the IIM Jammu logo whenever the text mentions IIM Jammu. */
export function WithIIM({ children, className = '' }) {
  const t = String(children)
  if (!t.includes('IIM Jammu')) return <>{t}</>
  return <span className={`with-iim ${className}`}><IIMLogo />{t}</span>
}

export function ExtLink({ href, children, className = 'link' }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children} <span aria-hidden="true">↗</span></a>
}

const ROLE_LABEL = { tech: 'Technology', strategy: 'Strategy', finance: 'Finance' }

/** Compact "My role" chips for a team case (Technology · Strategy · Finance). */
export function RoleChips({ role }) {
  if (!role) return null
  const keys = ['tech', 'strategy', 'finance'].filter((k) => role[k]?.length)
  return (
    <p className="role-chips"><span className="role-chips-k">My role</span>
      {keys.map((k) => <span key={k} className={`role-chip role-${k} ${k === 'finance' && role.financeLead ? 'is-lead' : ''}`}>{ROLE_LABEL[k]}</span>)}
    </p>
  )
}

/** Individual contribution, split by workstream; finance flagged when it was Yogya's direct responsibility. */
export function RoleBreakdown({ role }) {
  if (!role) return null
  const keys = ['tech', 'strategy', 'finance'].filter((k) => role[k]?.length)
  return (
    <div className={`role-grid role-n${keys.length}`}>
      {keys.map((k) => (
        <section key={k} className={`role-card role-${k} ${k === 'finance' && role.financeLead ? 'is-lead' : ''}`}>
          <p className="role-k">{ROLE_LABEL[k]}{k === 'finance' && role.financeLead && <span className="role-flag">Direct responsibility</span>}</p>
          <ul className="ticks">{role[k].map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
      ))}
    </div>
  )
}

/** Renders **bold** markers in content strings as <strong>. */
export function Rich({ text }) {
  const parts = String(text).split(/\*\*(.+?)\*\*/g)
  return <>{parts.map((p, i) => (i % 2 ? <strong key={i}>{p}</strong> : p))}</>
}
/** Plain text with ** markers removed (for page titles, alt text). */
export const plain = (t) => String(t).replace(/\*\*/g, '')
