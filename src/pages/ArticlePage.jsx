import { articles } from '../content/record'
import { profile } from '../content/profile'
import { articleCover } from '../content/media'
import { DetailPage, NotFound } from './Detail'

export default function ArticlePage({ slug }) {
  const a = articles.find((x) => x.slug === slug)
  if (!a || a.status === 'draft' || !a.body?.length) return <NotFound />
  return (
    <DetailPage
      back={{ href: '#writing', label: 'Writing' }}
      eyebrow={<><span>{a.category}</span><span>{a.date} · {a.minutes} min read</span></>}
      title={a.title}
      lede={a.dek}
      meta={[['By', profile.name]]}
      hero={{ img: articleCover(a.slug) }}
    >
      <div className="prose">{a.body.map((p, i) => <p key={i} data-reveal>{p}</p>)}</div>
    </DetailPage>
  )
}
