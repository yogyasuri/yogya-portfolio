import { useEffect, useLayoutEffect } from 'react'
import { startScroll, toTop } from './lib/motion'
import { useRoute } from './lib/router'
import { profile } from './content/profile'
import { projects } from './content/projects'
import { experience } from './content/experience'
import { articles, achievements } from './content/record'
import Nav from './components/Nav'
import Footer, { BackToTop } from './components/Footer'
import SideNav from './components/SideNav'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import ExperiencePage from './pages/ExperiencePage'
import AboutPage from './pages/AboutPage'
import ArticlePage from './pages/ArticlePage'
import AchievementPage from './pages/AchievementPage'
import { NotFound } from './pages/Detail'

const SITE = `${profile.name} · ${profile.institutionShort}`

function titleFor(r) {
  if (r.page === 'home') return `${profile.name} · Business meets AI. Product meets Strategy.`
  if (r.page === 'about') return `About · ${SITE}`
  if (r.page === 'work') return `${projects.find((p) => p.slug === r.slug)?.title ?? 'Work'} · ${SITE}`
  if (r.page === 'experience') return `${experience.find((x) => x.slug === r.slug)?.company ?? 'Experience'} · ${SITE}`
  if (r.page === 'achievements') return `${achievements.find((a) => a.slug === r.slug)?.name ?? 'Achievements'} · ${SITE}`
  if (r.page === 'writing') return `${articles.find((a) => a.slug === r.slug)?.title ?? 'Writing'} · ${SITE}`
  return SITE
}

function Page({ route }) {
  switch (route.page) {
    case 'home': return <Home anchor={route.anchor} />
    case 'about': return <AboutPage />
    case 'work': return <CaseStudy slug={route.slug} />
    case 'experience': return <ExperiencePage slug={route.slug} />
    case 'achievements': return <AchievementPage slug={route.slug} />
    case 'writing': return <ArticlePage slug={route.slug} />
    default: return <NotFound />
  }
}

export default function App() {
  const route = useRoute()
  const key = route.page === 'home' ? 'home' : `${route.page}/${route.slug ?? ''}`

  useEffect(() => { startScroll() }, [])

  // new page → start at the top, update the tab title, move focus for screen readers
  useLayoutEffect(() => {
    if (!(route.page === 'home' && route.anchor)) toTop()
    document.title = titleFor(route)
    if (route.page !== 'home') document.getElementById('main')?.focus({ preventScroll: true })
  }, [key]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Skip to content</a>
      <Nav route={route} />
      <main id="main" tabIndex={-1}>
        <Page key={key} route={route} />
      </main>
      {route.page === 'home' && <SideNav />}
      <Footer route={route} />
      <BackToTop />
    </>
  )
}
