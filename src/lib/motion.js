import { useEffect, useRef, createElement } from 'react'
import Lenis from 'lenis'

/* Motion system: CSS does the animating; JS only tracks pointer and scroll. */

export const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches
export const finePointer = typeof matchMedia !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches

export let lenis = null
export function startScroll() {
  if (lenis || reduced) return
  lenis = new Lenis({ lerp: 0.12 })
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf) }
  requestAnimationFrame(raf)
}

const NAV_OFFSET = -88
export function goTo(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET, duration: 1.2 })
  else window.scrollTo({ top: el.getBoundingClientRect().top + scrollY + NAV_OFFSET, behavior: reduced ? 'auto' : 'smooth' })
}
export function toTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo(0, 0)
}

/**
 * Scroll reveal: every `[data-reveal]` inside `root` gets `.is-in` when it enters
 * the viewport. Watches for new elements (e.g. after filtering). CSS holds the effect.
 */
export function useReveal(root) {
  useEffect(() => {
    const el = root.current
    if (!el) return
    if (reduced || !('IntersectionObserver' in window)) {
      const all = () => el.querySelectorAll('[data-reveal], [data-stage]').forEach((n) => n.classList.add('is-in'))
      all()
      const mo = new MutationObserver(all)
      mo.observe(el, { childList: true, subtree: true })
      return () => mo.disconnect()
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 })
    const scan = () => el.querySelectorAll('[data-reveal]:not(.is-in), [data-stage]:not(.is-in)').forEach((n) => io.observe(n))
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(el, { childList: true, subtree: true })
    return () => { io.disconnect(); mo.disconnect() }
  }, [root])
}

/**
 * 3D tilt surface. Writes --rx/--ry (rotation) and --mx/--my (glare position)
 * as the pointer moves; CSS applies them. Inert on touch and with reduced motion.
 */
export function Tilt({ as = 'div', max = 9, className = '', children, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !finePointer) return
    let frame = 0
    const move = (e) => {
      // over a link or button: hold the card still so the target doesn't slide away
      if (e.target.closest('a:not(.wk-hit), button, .wk-more, .wk-links, .ach-actions, .hv-controls')) return
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--ry', `${(x - 0.5) * 2 * max}deg`)
        el.style.setProperty('--rx', `${(0.5 - y) * 2 * max}deg`)
        el.style.setProperty('--mx', `${x * 100}%`)
        el.style.setProperty('--my', `${y * 100}%`)
        el.style.setProperty('--px', (x - 0.5) * 2)
        el.style.setProperty('--py', (y - 0.5) * 2)
      })
    }
    const enter = () => el.classList.add('is-tilting')
    const leave = () => {
      cancelAnimationFrame(frame)
      el.classList.remove('is-tilting')
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg')
      el.style.setProperty('--px', 0); el.style.setProperty('--py', 0)
    }
    el.addEventListener('pointerenter', enter)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => { cancelAnimationFrame(frame); el.removeEventListener('pointerenter', enter); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave) }
  }, [max])
  // light layer: cursor highlight + a sheen band that follows the tilt
  return createElement(as, { ref, className: `tilt ${className}`, ...rest }, children, createElement('span', { className: 'tilt-light', 'aria-hidden': true, key: 'light' }))
}

/** 0→1 progress of an element passing through the viewport (for the journey path). */
export function useScrollProgress(ref, onProgress, { start = 0.7, end = 0.5 } = {}) {
  const cb = useRef(onProgress)
  cb.current = onProgress
  useEffect(() => {
    let frame = 0
    const calc = () => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const from = innerHeight * start
      const to = innerHeight * end
      // 0 when the top reaches `start`, 1 when the bottom reaches `end`
      const p = (from - r.top) / (r.height + from - to || 1)
      cb.current(Math.min(1, Math.max(0, p)))
    }
    const on = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(calc) }
    calc()
    addEventListener('scroll', on, { passive: true })
    addEventListener('resize', on)
    return () => { cancelAnimationFrame(frame); removeEventListener('scroll', on); removeEventListener('resize', on) }
  }, [ref, start, end])
}
