import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Horizontal cinematic scroller + fullscreen viewer. Edit photos in data/config.js
export default function MemoryGallery({ title, photos }) {
  const [open, setOpen] = useState(null)
  const hue = (i) => 220 + i * 28
  const Img = ({ p, i, big }) => p.src
    ? <img src={p.src} alt={p.caption} loading="lazy" draggable="false" />
    : <div className={'ph' + (big ? ' big' : '')} style={{ background: `linear-gradient(140deg,hsl(${hue(i)} 40% 14%),#05060a)` }}>{p.caption}</div>
  return (
    <section className="gallery">
      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.4 }}>{title}</motion.h2>
      <div className="rail">
        {photos.map((p, i) => (
          <motion.figure key={i} className="frame" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1.2 }}
            onClick={() => setOpen(i)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setOpen(i)}>
            <div className="frame-img"><Img p={p} i={i} /></div>
            <figcaption><small>{p.tag}</small>{p.caption}</figcaption>
          </motion.figure>
        ))}
        <div className="rail-end" />
      </div>
      <p className="hint">Swipe or scroll sideways · tap a photo to open it</p>
      <AnimatePresence>
        {open !== null && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="lb-img" initial={{ scale: 0.9 }} animate={{ scale: 1 }}><Img p={photos[open]} i={open} big /></motion.div>
            <p>{photos[open].caption}</p>
            <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); setOpen((open + photos.length - 1) % photos.length) }} aria-label="Previous">‹</button>
            <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % photos.length) }} aria-label="Next">›</button>
            <button className="lb-x" aria-label="Close">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
