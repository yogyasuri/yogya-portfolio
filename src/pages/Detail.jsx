import { useRef } from 'react'
import { useReveal } from '../lib/motion'
import { Todo, Media, Gallery } from '../components/ui'

/** Shared shell for case studies, experience, achievements, About and articles. */
export function DetailPage({ back, eyebrow, title, lede, meta, hero, children }) {
  const root = useRef(null)
  useReveal(root)
  return (
    <article className="detail" ref={root}>
      <header className="dt-head wrap">
        <a className="dt-back" href={back.href}><span aria-hidden="true">←</span> {back.label}</a>
        {eyebrow && <div className="dt-eyebrow">{eyebrow}</div>}
        <h1 className="dt-title">{title}</h1>
        {lede && <p className="dt-lede">{lede}</p>}
        {meta?.length > 0 && (
          <dl className="dt-meta">
            {meta.filter(([, v]) => v).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
          </dl>
        )}
      </header>
      {hero && <div className="wrap dt-hero" data-reveal><div className="dt-hero-3d"><Media img={hero.img} mark={hero.mark} eager /></div></div>}
      <div className="wrap dt-body">{children}</div>
    </article>
  )
}

/**
 * A titled block. Pass `v` (string → paragraph, array → list) or custom `children`.
 * Empty blocks render nothing, unless `todo` is given: then a dev-only reminder shows.
 */
export function Block({ label, v, children, todo }) {
  const has = children != null ? true : Array.isArray(v) ? v.length > 0 : Boolean(v)
  if (!has) {
    if (!todo || !import.meta.env.DEV) return null
    return <section className="dt-block"><h2 className="dt-label">{label}</h2><div className="dt-content"><Todo block>{todo}</Todo></div></section>
  }
  const content = children ?? (Array.isArray(v) ? <ul className="ticks">{v.map((x) => <li key={x}>{x}</li>)}</ul> : <p>{v}</p>)
  return (
    <section className="dt-block" data-reveal>
      <h2 className="dt-label">{label}</h2>
      <div className="dt-content">{content}</div>
    </section>
  )
}

export function GalleryBlock({ label = 'Images & documents', items }) {
  if (!items?.length) return null
  return (
    <section className="dt-gallery" data-reveal>
      <h2 className="dt-label">{label}</h2>
      <Gallery items={items} />
    </section>
  )
}

export function NextCard({ href, kicker, title }) {
  return (
    <a className="dt-next" href={href} data-reveal>
      <span className="eyebrow">{kicker}</span>
      <span className="dt-next-title">{title} <span aria-hidden="true">→</span></span>
    </a>
  )
}

export function NotFound() {
  return (
    <DetailPage back={{ href: '#/', label: 'Home' }} title="This page doesn’t exist." lede="The link may be out of date. Head back to the homepage to explore the work.">
      {null}
    </DetailPage>
  )
}
