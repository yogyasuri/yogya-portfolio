import { useEffect, useRef, useState } from 'react'
import { reduced } from '../lib/motion'
import { profile } from '../content/profile'

const BASE = import.meta.env.BASE_URL

/**
 * 3D character video for the hero.
 * - Autoplays muted and looped (browsers block unmuted autoplay); never autoplays with reduced motion.
 * - "Tap for sound" restarts it with audio; after one full play with sound it returns to a silent loop.
 * - Pauses when scrolled out of view; a visible pause/play control is always available.
 */
export default function HeroVideo() {
  const ref = useRef(null)
  const [sound, setSound] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(reduced)

  // play only while visible (saves battery, respects the visitor's pause)
  useEffect(() => {
    const v = ref.current
    if (!v || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused) v.play().catch(() => {})
      else if (!e.isIntersecting) v.pause()
    }, { threshold: 0.25 })
    io.observe(v)
    return () => io.disconnect()
  }, [userPaused])

  const toggleSound = () => {
    const v = ref.current
    if (sound) { v.muted = true; setSound(false); return }
    v.muted = false
    v.currentTime = 0
    setUserPaused(false)
    v.play().then(() => setSound(true)).catch(() => { v.muted = true })
  }

  const togglePlay = () => {
    const v = ref.current
    if (v.paused) { setUserPaused(false); v.play().catch(() => {}) }
    else { setUserPaused(true); v.pause() }
  }

  // one play with sound, then back to a silent loop
  const onEnded = () => {
    const v = ref.current
    if (sound) { v.muted = true; setSound(false) }
    v.currentTime = 0
    v.play().catch(() => {})
  }

  return (
    <div className={`hv ${playing ? 'is-playing' : ''}`}>
      <video
        ref={ref}
        src={BASE + profile.heroVideo}
        poster={BASE + profile.heroPoster}
        muted playsInline preload="metadata"
        onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={onEnded}
        onClick={toggleSound}
        title={sound ? 'Mute' : 'Tap to hear me'}
        aria-label="Animated 3D character of Yogya Suri walking forward and smiling"
      />
      <div className="hv-controls">
        <button type="button" className={`hv-btn hv-sound ${sound ? 'is-on' : ''}`} onClick={toggleSound} aria-pressed={sound}>
          {sound
            ? <><span className="hv-bars" aria-hidden="true"><i /><i /><i /><i /></span>Sound on</>
            : <><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 9l5 6M21 9l-5 6" /></svg>Tap to hear me</>}
        </button>
        <button type="button" className="hv-btn hv-play" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing
            ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5l12 7-12 7z" /></svg>}
        </button>
      </div>
    </div>
  )
}
