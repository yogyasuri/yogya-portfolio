import { useEffect, useState } from 'react'
import { goTo } from '../lib/motion'
import { profile } from '../content/profile'
import { Logo } from './ui'

export const primary = [['Achievements', 'achievements'], ['Work & Experience', 'work'], ['Cars24', 'experience'], ['Journey', 'journey'], ['Beyond the Résumé', 'beyond']]
export const allSections = [
  ['Achievements', 'achievements'], ['Work & Experience', 'work'], ['What I Bring', 'toolbox'], ['Journey', 'journey'],
  ['Beyond the Résumé', 'beyond'], ['Articles', 'writing'], ['Contact', 'contact'],
]

/** Scroll on the homepage; from any other page, go home first. */
export function useSectionNav(route) {
  return (e, id) => {
    e.preventDefault()
    if (route.page === 'home') { goTo(`#${id}`); history.replaceState(null, '', `#${id}`) }
    else location.hash = id
  }
}


/** The homepage section currently in view (null elsewhere). */
export function useActiveSection(enabled) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    if (!enabled) { setActive(null); return }
    const els = allSections.map(([, id]) => document.getElementById(id)).filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) setActive(en.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [enabled])
  return active
}

export default function Nav({ route }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection(route.page === 'home')
  const nav = useSectionNav(route)
  const go = (e, id) => { setOpen(false); nav(e, id) }

  useEffect(() => {
    const on = () => setScrolled(scrollY > 24)
    on()
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])


  useEffect(() => {
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    addEventListener('keydown', esc)
    return () => removeEventListener('keydown', esc)
  }, [])

  return (
    <header className={`nav ${scrolled || open ? 'is-solid' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-bar">
        <a href="#/" className="nav-brand" onClick={() => setOpen(false)} aria-label={`${profile.name}, home`}>
          <Logo className="nav-logo" />
          <span className="nav-text">
            <span className="nav-name">{profile.name}</span>
            <span className="nav-inst">{profile.institutionShort}</span>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {primary.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} aria-current={active === id ? 'true' : undefined}>{l}</a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary nav-cta" onClick={(e) => go(e, 'contact')}>Let’s Talk</a>
        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? 'Close menu' : 'Open menu'}><i /><i /></button>
      </div>
      <nav className="nav-sheet" id="nav-sheet" aria-label="All sections" hidden={!open}>
        {allSections.map(([l, id], i) => (
          <a key={id} href={`#${id}`} onClick={(e) => go(e, id)}><span>{String(i + 1).padStart(2, '0')}</span>{l}</a>
        ))}
      </nav>
    </header>
  )
}
