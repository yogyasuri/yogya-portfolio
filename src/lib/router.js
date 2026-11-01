import { useEffect, useState } from 'react'

/*
  Tiny hash router (works on any static host, including sub-folders).
    #/                      home
    #about, #work …         home, scrolled to that section
    #/about                 full About page
    #/work/<slug>           project case study
    #/experience/<slug>     experience detail
    #/writing/<slug>        article
*/
export function parse(hash) {
  if (!hash.startsWith('#/')) return { page: 'home', anchor: hash.slice(1) || null }
  const [page, slug] = hash.slice(2).split('/').filter(Boolean)
  if (!page) return { page: 'home', anchor: null }
  return { page, slug: slug ? decodeURIComponent(slug) : null }
}

export function useRoute() {
  const [hash, setHash] = useState(() => location.hash)
  useEffect(() => {
    const on = () => setHash(location.hash)
    addEventListener('hashchange', on)
    return () => removeEventListener('hashchange', on)
  }, [])
  return parse(hash)
}
