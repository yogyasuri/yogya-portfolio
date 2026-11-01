import { useEffect, useState } from 'react'
import { goTo } from '../lib/motion'
import { allSections, useActiveSection } from './Nav'

const pad = (n) => String(n).padStart(2, '0')
const R = 15
const C = 2 * Math.PI * R

/**
 * Pop-up section navigation that slides in once the visitor scrolls past the hero.
 * Desktop: a 3D rail on the right edge with labels that flip out.
 * Phones: a floating dock at the bottom that opens a pop-up section menu.
 * Plus a thin gold reading-progress line at the top of the page.
 */
export default function SideNav() {
  const active = useActiveSection(true)
  const [show, setShow] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    let frame = 0
    const calc = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? Math.min(1, scrollY / max) : 0)
      setShow(scrollY > innerHeight * 0.55)
    }
    const on = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(calc) }
    calc()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [])

  useEffect(() => {
    if (!open) return
    const esc = (e) => e.key === 'Escape' && setOpen(false)
    const out = (e) => { if (!e.target.closest('.dock')) setOpen(false) }
    addEventListener('keydown', esc)
    addEventListener('pointerdown', out)
    return () => { removeEventListener('keydown', esc); removeEventListener('pointerdown', out) }
  }, [open])

  useEffect(() => { if (!show) setOpen(false) }, [show])

  // the current section's label pops out briefly whenever the section changes
  useEffect(() => {
    if (!active || !show) return
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 1800)
    return () => clearTimeout(t)
  }, [active, show])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    goTo(`#${id}`)
    history.replaceState(null, '', `#${id}`)
  }
  const idx = allSections.findIndex(([, id]) => id === active)
  const current = idx >= 0 ? allSections[idx] : null

  return (
    <>
      <div className="progress-top" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <nav className={`rail ${show ? 'is-on' : ''} ${flash ? 'is-flash' : ''}`} aria-label="Jump to section" aria-hidden={!show}>
        <span className="rail-track" aria-hidden="true"><i style={{ transform: `scaleY(${progress})` }} /></span>
        <ol>
          {allSections.map(([label, id], i) => (
            <li key={id} style={{ '--i': i }}>
              <a href={`#${id}`} onClick={(e) => go(e, id)} className="rail-link" aria-current={active === id ? 'true' : undefined} tabIndex={show ? 0 : -1}>
                <span className="rail-dot" aria-hidden="true" />
                <span className="rail-label"><b>{pad(i + 1)}</b>{label}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className={`dock ${show ? 'is-on' : ''} ${open ? 'is-open' : ''}`} aria-hidden={!show}>
        <div className="dock-panel" id="dock-panel" hidden={!open}>
          <p className="dock-title">Jump to</p>
          {allSections.map(([label, id], i) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(e, id)} aria-current={active === id ? 'true' : undefined} style={{ '--i': i }}>
              <span>{pad(i + 1)}</span>{label}
            </a>
          ))}
        </div>
        <button className="dock-btn" aria-expanded={open} aria-controls="dock-panel" onClick={() => setOpen((o) => !o)} tabIndex={show ? 0 : -1}>
          <svg className="dock-ring" viewBox="0 0 36 36" aria-hidden="true">
            <circle cx="18" cy="18" r={R} className="bg" />
            <circle cx="18" cy="18" r={R} className="fg" style={{ strokeDasharray: C, strokeDashoffset: C * (1 - progress) }} />
          </svg>
          <span className="dock-text">{current ? <><b>{pad(idx + 1)}</b>{current[0]}</> : 'Sections'}</span>
          <span className="dock-chev" aria-hidden="true">▴</span>
        </button>
      </div>
    </>
  )
}
