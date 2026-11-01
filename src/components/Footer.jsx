import { useEffect, useState } from 'react'
import { goTo, toTop } from '../lib/motion'
import { profile } from '../content/profile'
import { allSections, useSectionNav } from './Nav'
import { Logo } from './ui'

export default function Footer({ route }) {
  const nav = useSectionNav(route)
  const links = [['LinkedIn', profile.linkedin], ['GitHub', profile.github], ['Chess.com', profile.chess]].filter(([, h]) => h)
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-id">
          <p className="foot-name"><Logo className="foot-logo" />{profile.name}</p>
          <p>{profile.programme} · {profile.institution} · {profile.batch}</p>
          <p className="foot-tag">{profile.tagline.join(' ')}</p>
        </div>
        <nav className="foot-nav" aria-label="Footer">
          {allSections.map(([l, id]) => <a key={id} href={`#${id}`} onClick={(e) => nav(e, id)}>{l}</a>)}
          <a href="#/about">Full story</a>
        </nav>
        {links.length > 0 && (
          <div className="foot-social">
            {links.map(([l, h]) => <a key={l} href={h} target="_blank" rel="noreferrer">{l} ↗</a>)}
          </div>
        )}
      </div>
      <div className="wrap foot-base">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <button onClick={() => (route.page === 'home' ? goTo('#top') : toTop())}>Back to top ↑</button>
      </div>
    </footer>
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(scrollY > innerHeight * 1.5)
    addEventListener('scroll', on, { passive: true })
    return () => removeEventListener('scroll', on)
  }, [])
  return (
    <button className={`to-top ${show ? 'is-on' : ''}`} onClick={() => goTo(document.body)} aria-label="Back to top" tabIndex={show ? 0 : -1} aria-hidden={!show}>↑</button>
  )
}
