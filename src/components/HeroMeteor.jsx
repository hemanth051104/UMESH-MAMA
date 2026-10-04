import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

// The signature opening: space -> meteor -> atmosphere -> impact -> title.
export default function HeroMeteor({ hero, sfx, onDone, onName }) {
  const ref = useRef(), [flash, setFlash] = useState(false), [step, setStep] = useState(0), [skip, setSkip] = useState(false)
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'), mobile = innerWidth < 700
    const dpr = Math.min(devicePixelRatio || 1, mobile ? 1.5 : 2)
    let w, h, raf, start = performance.now(), hit = false, parts = []
    const size = () => { w = innerWidth; h = innerHeight; c.width = w * dpr; c.height = h * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0) }
    size(); addEventListener('resize', size)
    const stars = Array.from({ length: mobile ? 160 : 340 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.3 + 0.2, d: Math.random() * 0.8 + 0.2, p: Math.random() * 6 }))
    const dust = Array.from({ length: 40 }, () => ({ x: Math.random(), y: Math.random(), v: Math.random() * 0.00003 + 0.00001 }))
    const clamp = (v) => Math.max(0, Math.min(1, v))
    const timers = []
    const loop = (now) => {
      const t = (now - start) / 1000, fade = clamp(t / 2.5), p = clamp((t - 3.2) / 6.5), e = p * p * (1.4 - 0.4 * p)
      x.save(); x.clearRect(0, 0, w, h); x.fillStyle = '#02030a'; x.fillRect(0, 0, w, h)
      if (p > 0.55 && !hit) { const a = (p - 0.55) * 22; x.translate((Math.random() - 0.5) * a, (Math.random() - 0.5) * a) }
      // nebula / distant galaxy
      let g = x.createRadialGradient(w * 0.2, h * 0.3, 0, w * 0.2, h * 0.3, w * 0.6); g.addColorStop(0, 'rgba(80,60,160,.18)'); g.addColorStop(1, 'transparent')
      x.globalAlpha = fade; x.fillStyle = g; x.fillRect(0, 0, w, h)
      g = x.createRadialGradient(w * 0.8, h * 0.55, 0, w * 0.8, h * 0.55, w * 0.35); g.addColorStop(0, 'rgba(217,183,121,.10)'); g.addColorStop(1, 'transparent'); x.fillStyle = g; x.fillRect(0, 0, w, h)
      stars.forEach((s) => { x.globalAlpha = fade * (0.4 + 0.4 * Math.sin(t * 1.5 + s.p)); x.fillStyle = '#fff'
        x.beginPath(); x.arc(s.x * w - t * 3 * s.d, s.y * h + t * 1.5 * s.d, s.r, 0, 6.3); x.fill() })
      dust.forEach((d) => { x.globalAlpha = fade * 0.25; x.fillStyle = '#e9d5a8'; x.fillRect(((d.x + t * d.v * 40) % 1) * w, d.y * h, 1.5, 1.5) })
      // Earth rises as camera pushes in
      const R = w * (mobile ? 1.6 : 1.0) * (1 + e * 0.35), cx = w * 0.5, cy = h + R * 0.72 - e * h * 0.12
      g = x.createRadialGradient(cx, cy, R * 0.96, cx, cy, R * 1.06); g.addColorStop(0, 'rgba(90,160,255,.55)'); g.addColorStop(1, 'transparent')
      x.globalAlpha = clamp((t - 1) / 3); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R * 1.06, 0, 6.3); x.fill()
      g = x.createRadialGradient(cx, cy - R * 0.2, R * 0.2, cx, cy, R); g.addColorStop(0, '#0b2a55'); g.addColorStop(1, '#020611'); x.fillStyle = g; x.beginPath(); x.arc(cx, cy, R, 0, 6.3); x.fill()
      // meteor
      if (p > 0 && p < 1) {
        const sx = w * 0.82, sy = h * 0.06, tx = w * 0.5, ty = cy - R + 4
        const mx = sx + (tx - sx) * e, my = sy + (ty - sy) * e, r = 1.5 + 30 * Math.pow(p, 2.6), atm = clamp((p - 0.55) / 0.3)
        const dx = tx - sx, dy = ty - sy, len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, tail = 40 + 520 * p
        g = x.createLinearGradient(mx, my, mx - ux * tail, my - uy * tail)
        g.addColorStop(0, atm ? 'rgba(255,190,90,.95)' : 'rgba(255,255,255,.9)'); g.addColorStop(0.4, atm ? 'rgba(255,90,20,.5)' : 'rgba(150,190,255,.4)'); g.addColorStop(1, 'transparent')
        x.globalAlpha = 1; x.strokeStyle = g; x.lineCap = 'round'; x.lineWidth = r * 1.6; x.beginPath(); x.moveTo(mx, my); x.lineTo(mx - ux * tail, my - uy * tail); x.stroke()
        g = x.createRadialGradient(mx, my, 0, mx, my, r * 5); g.addColorStop(0, '#fff'); g.addColorStop(0.2, atm ? 'rgba(255,170,60,.8)' : 'rgba(200,220,255,.6)'); g.addColorStop(1, 'transparent')
        x.fillStyle = g; x.beginPath(); x.arc(mx, my, r * 5, 0, 6.3); x.fill()
        for (let i = 0; i < (atm ? 4 : 1); i++) parts.push({ x: mx, y: my, vx: (Math.random() - 0.5) * 2 - ux * 2, vy: (Math.random() - 0.5) * 2 - uy * 2, l: 1, hot: atm })
        if (sfx.__w !== 1 && t > 3.1) { sfx.__w = 1; sfx.whoosh(6.5) }
      }
      parts = parts.filter((q) => q.l > 0); parts.forEach((q) => { q.x += q.vx; q.y += q.vy; q.l -= 0.025
        x.globalAlpha = q.l; x.fillStyle = q.hot ? '#ff9a3c' : '#bcd4ff'; x.fillRect(q.x, q.y, 2.5, 2.5) })
      x.restore()
      if (p >= 1 && !hit) { hit = true; sfx.boom(); setFlash(true); timers.push(setTimeout(() => setFlash(false), 650))
        ;[1800, 3600, 6200, 7800, 10000].forEach((ms, i) => timers.push(setTimeout(() => { setStep(i + 1); if (i === 2) onName?.(); if (i === 4) onDone() }, ms))) }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size); timers.forEach(clearTimeout) }
  }, [])
  const skipIntro = () => { onName?.(); setSkip(true); setStep(5); onDone() }
  return (
    <section className="hero">
      <canvas ref={ref} className="hero-canvas" />
      <div className="flash" style={{ opacity: flash ? 1 : 0, transition: flash ? 'opacity .05s' : 'opacity 3.2s ease-out' }} />
      <div className="hero-text">
        <motion.p className="hero-date" initial={{ opacity: 0, letterSpacing: '1em' }} animate={step >= 1 || skip ? { opacity: 1, letterSpacing: '.45em' } : {}} transition={{ duration: 2.4 }}>{hero.date}</motion.p>
        <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={step >= 2 || skip ? { opacity: 1 } : {}} transition={{ duration: 2 }}>{hero.sub1}</motion.p>
        <motion.h1 className="hero-name" initial={{ opacity: 0, filter: 'blur(24px)', scale: 1.15 }} animate={step >= 3 || skip ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}} transition={{ duration: 2.6 }}>{hero.name}</motion.h1>
        <motion.p className="hero-sub gold" initial={{ opacity: 0 }} animate={step >= 4 || skip ? { opacity: 1 } : {}} transition={{ duration: 2 }}>{hero.sub2}</motion.p>
      </div>
      {step < 5 && <button className="skip" onClick={skipIntro}>Skip</button>}
      {step >= 5 && <motion.div className="scroll-cue" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><span />scroll</motion.div>}
    </section>
  )
}
