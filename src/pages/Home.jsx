import { useEffect, useRef } from 'react'
import { useReveal, goTo } from '../lib/motion'
import Hero from '../sections/Hero'
import Achievements from '../sections/Achievements'
import Work from '../sections/Work'
import Journey from '../sections/Journey'
import Toolbox from '../sections/Toolbox'
import Writing from '../sections/Writing'
import Personal from '../sections/Personal'
import Contact from '../sections/Contact'

export default function Home({ anchor }) {
  const root = useRef(null)
  useReveal(root)

  // arriving with #section (e.g. from a case-study page): scroll once laid out
  useEffect(() => {
    if (!anchor) return
    const t = setTimeout(() => goTo(`#${anchor}`), 80)
    return () => clearTimeout(t)
  }, [anchor])

  return (
    <div ref={root}>
      <Hero />
      <Achievements />
      <Work />
      <Toolbox />
      <Journey />
      <Personal />
      <Writing />
      <Contact />
    </div>
  )
}
