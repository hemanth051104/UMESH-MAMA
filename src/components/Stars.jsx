import { useEffect, useRef } from 'react'
// Lightweight twinkling starfield used by callback + final scenes.
export default function Stars({ shooting = false }) {
  const ref = useRef()
  useEffect(() => {
    const c = ref.current, x = c.getContext('2d'); let raf, w, h, s = [], m = null
    const size = () => { const r = c.getBoundingClientRect(); w = c.width = r.width; h = c.height = r.height
      s = Array.from({ length: w < 700 ? 90 : 190 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.2 + 0.2, p: Math.random() * 6 })) }
    size(); addEventListener('resize', size)
    const loop = (t) => { x.clearRect(0, 0, w, h)
      s.forEach((a) => { x.globalAlpha = 0.35 + 0.35 * Math.sin(t / 900 + a.p); x.fillStyle = '#fff'; x.beginPath(); x.arc(a.x, a.y, a.r, 0, 6.3); x.fill() })
      if (shooting && !m && Math.random() < 0.004) m = { x: Math.random() * w, y: 0, l: 0 }
      if (m) { m.x -= 9; m.y += 5; m.l++; const g = x.createLinearGradient(m.x, m.y, m.x + 90, m.y - 50); g.addColorStop(0, '#fff'); g.addColorStop(1, 'transparent')
        x.globalAlpha = 1; x.strokeStyle = g; x.lineWidth = 2; x.beginPath(); x.moveTo(m.x, m.y); x.lineTo(m.x + 90, m.y - 50); x.stroke(); if (m.l > 90) m = null }
      raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', size) }
  }, [shooting])
  return <canvas ref={ref} className="stars" />
}
