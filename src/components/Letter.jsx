import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Letter({ teaser, lines, sign }) {
  const [open, setOpen] = useState(false)
  return (
    <section className={'letter-sec' + (open ? ' soft' : '')}>
      <div className="motes">{Array.from({ length: 14 }, (_, i) => <i key={i} style={{ left: (i * 7.3) % 100 + '%', animationDelay: i * 0.8 + 's', animationDuration: 9 + (i % 5) * 2 + 's' }} />)}</div>
      {!open && <motion.p className="big" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }}>{teaser}</motion.p>}
      <div className={'env' + (open ? ' open' : '')} onClick={() => setOpen(true)} role="button" tabIndex={0} aria-label="Open the letter" onKeyDown={(e) => e.key === 'Enter' && setOpen(true)}>
        <div className="env-back" /><div className="paper-slot"><div className="paper-mini" /></div>
        <div className="env-front" /><div className="flap" /><div className="seal">❤</div>
      </div>
      {!open && <p className="hint">Tap the envelope</p>}
      {open && (
        <motion.article className="paper" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.6, delay: 0.9 }}>
          {lines.map((l, i) => <motion.p key={i} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.9 }} transition={{ duration: 1.1 }}
            className={i === 0 ? 'to' : ''}>{l}</motion.p>)}
          <motion.p className="sign" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}>{sign}</motion.p>
        </motion.article>
      )}
    </section>
  )
}
