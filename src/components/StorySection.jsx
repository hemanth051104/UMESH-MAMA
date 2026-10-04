import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import cfg from '../data/config'
import Stars from './Stars'

const blur = { hidden: { opacity: 0, y: 40, filter: 'blur(14px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)' } }
const vp = { once: true, amount: 0.6 }

// Words that hit one by one (FIGHT. SHOUT. / OUT! NOT OUT!). Used for funny + cricket beats.
function Slam({ words, fast }) {
  const [i, setI] = useState(-1), [go, setGo] = useState(false)
  useEffect(() => { if (!go) return; let n = 0; setI(0)
    const id = setInterval(() => { n++; setI(n >= words.length ? -1 : n); if (n >= words.length) clearInterval(id) }, fast ? 800 : 1000)
    return () => clearInterval(id) }, [go])
  return (
    <motion.div className="slam" onViewportEnter={() => setGo(true)} viewport={{ once: true, amount: 0.7 }}>
      <AnimatePresence mode="wait">
        {i >= 0 && <motion.span key={i} className={'slam-word s' + (i % 3)} initial={{ scale: 2.6, opacity: 0, rotate: (i % 2 ? 5 : -5) }} animate={{ scale: 1, opacity: 1, rotate: (i % 2 ? -3 : 3) }} exit={{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }} transition={{ type: 'spring', stiffness: 380, damping: 18 }}>{words[i]}</motion.span>}
      </AnimatePresence>
    </motion.div>
  )
}

export function Beat({ b }) {
  if (b.slam) return <Slam words={b.slam} fast={b.fast} />
  if (b.photo !== undefined) { const p = cfg.photos[b.photo]; return (
    <motion.figure className="soft-photo" variants={blur} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} transition={{ duration: 2.2 }}>
      {p?.src ? <img src={p.src} alt={p.caption} loading="lazy" /> : <div className="ph">{p?.caption}</div>}</motion.figure>) }
  const lines = Array.isArray(b) ? b : [b]
  return (
    <motion.div className="beat" initial="hidden" whileInView="show" viewport={vp} transition={{ staggerChildren: 0.9 }}>
      {lines.map((l, k) => { const big = l.startsWith('#')
        return <motion.p key={k} className={big ? 'big' : 'line'} variants={blur} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}>{big ? l.slice(1) : l}</motion.p> })}
    </motion.div>
  )
}

export default function StorySection({ beats, mood = 'plain', stars }) {
  return (
    <section className={'story ' + mood}>
      {stars && <Stars shooting />}
      <div className="glow" />
      {beats.map((b, i) => <Beat key={i} b={b} />)}
    </section>
  )
}
