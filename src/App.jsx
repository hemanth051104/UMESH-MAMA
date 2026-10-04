import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import cfg from './data/config'
import { createSfx } from './audio'
import HeroMeteor from './components/HeroMeteor'
import StorySection from './components/StorySection'
import MemoryGallery from './components/MemoryGallery'
import Letter from './components/Letter'
import FinalMessage from './components/FinalMessage'
import MusicPlayer from './components/MusicPlayer'
import Cursor from './components/Cursor'

export default function App() {
  const [entered, setEntered] = useState(false), [done, setDone] = useState(false), [playing, setPlaying] = useState(false)
  const audio = useRef(), sfx = useRef({ whoosh() {}, boom() {} })
  useEffect(() => { document.body.style.overflow = entered && done ? '' : 'hidden' }, [entered, done])
  const enter = () => {
    sfx.current = createSfx(); setEntered(true)
    if (audio.current) { audio.current.volume = 0; audio.current.play().catch(() => {}) } // unlock silently, fade in when the name appears
  }
  const startMusic = () => {
    const a = audio.current; if (!a) return
    a.play().catch(() => {}); setPlaying(true)
    let v = a.volume; const id = setInterval(() => { v = Math.min(0.2, v + 0.01); a.volume = v; if (v >= 0.55) clearInterval(id) }, 70)
  }
  const toggle = () => { const a = audio.current; if (!a) return; if (a.paused) { a.play(); setPlaying(true) } else { a.pause(); setPlaying(false) } }
  return (
    <>
      <audio ref={audio} src={cfg.music} loop preload="auto" />
      <div className="grain" /><Cursor />
      {!entered && (
        <div className="gate">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2.5 }}>A story written for one person.</motion.p>
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6, duration: 2 }} onClick={enter}>Enter the Experience 🎵</motion.button>
          <small>Best with sound on</small>
        </div>
      )}
      {entered && <>
        <MusicPlayer playing={playing} toggle={toggle} />
        <HeroMeteor hero={cfg.hero} sfx={sfx.current} onDone={() => setDone(true)} onName={startMusic} />
        {cfg.sections.map((s, i) => {
          if (s.type === 'story') return <StorySection key={i} beats={s.beats} mood={s.mood} />
          if (s.type === 'gallery') return <MemoryGallery key={i} title={s.title} photos={cfg.photos} />
          if (s.type === 'letter') return <Letter key={i} {...s} />
          if (s.type === 'callback') return <StorySection key={i} beats={s.beats} mood="dark sky" stars />
          if (s.type === 'final') return <FinalMessage key={i} {...s} />
          return null
        })}
      </>}
    </>
  )
}
