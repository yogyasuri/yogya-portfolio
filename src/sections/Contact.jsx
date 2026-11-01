import { Fragment, useState } from 'react'
import { profile, contact } from '../content/profile'
import { Todo } from '../components/ui'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800) } catch { /* clipboard blocked */ }
  }
  const links = [['LinkedIn', profile.linkedin], ['GitHub', profile.github], ['Chess.com', profile.chess]].filter(([, h]) => h)
  return (
    <section className="section contact" id="contact" aria-labelledby="ct-title">
      <div className="ct-glow" aria-hidden="true" />
      <div className="wrap ct-inner" data-reveal>
        <p className="sh-label"><span className="sh-no">07</span>Let’s connect</p>
        <h2 className="ct-title" id="ct-title">{contact.title.split(' ').map((w, i) => <Fragment key={i}><span className="ct-word" style={{ '--i': i }}>{w}</span>{' '}</Fragment>)}</h2>
        <p className="ct-text">{contact.text}</p>

        {profile.email ? (
          <div className="ct-mail">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <button onClick={copy} aria-live="polite">{copied ? 'Copied ✓' : 'Copy'}</button>
          </div>
        ) : <Todo block>professional email (src/content/profile.js → email)</Todo>}

        <div className="ct-links">
          {profile.email && <a className="btn btn-primary" href={`mailto:${profile.email}`}>Send an email</a>}
          {profile.resume && <a className="btn btn-secondary" href={import.meta.env.BASE_URL + profile.resume} download>Download résumé ↓</a>}
          {links.map(([l, h]) => <a key={l} className="btn btn-ghost" href={h} target="_blank" rel="noreferrer">{l} ↗</a>)}
        </div>
        {!profile.resume && <Todo block>résumé PDF (profile.resume)</Todo>}
        {links.length === 0 && <Todo block>LinkedIn / GitHub URLs (profile.linkedin, profile.github)</Todo>}
      </div>
    </section>
  )
}
