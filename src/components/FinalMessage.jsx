import { motion } from 'framer-motion'
import Stars from './Stars'
import { Beat } from './StorySection'

export default function FinalMessage({ title, beats, finale }) {
  return (
    <section className="story final">
      <Stars shooting /><div className="glow gold-glow" />
      <div className="beat">
        {title.map((t, i) => <motion.h2 key={i} className="title" initial={{ opacity: 0, filter: 'blur(20px)', y: 30 }} whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 2, delay: i * 0.9 }}>{t}</motion.h2>)}
      </div>
      {beats.map((b, i) => <Beat key={i} b={b} />)}
      <motion.p className="finale" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 2.4 }}>{finale}</motion.p>
    </section>
  )
}
