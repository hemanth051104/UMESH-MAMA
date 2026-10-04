import { useEffect, useRef } from 'react'
// Soft golden light that follows the mouse (desktop only).
export default function Cursor() {
  const r = useRef()
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    const m = (e) => r.current && (r.current.style.transform = `translate(${e.clientX - 150}px,${e.clientY - 150}px)`)
    addEventListener('pointermove', m); return () => removeEventListener('pointermove', m)
  }, [])
  return <div ref={r} className="cursor" />
}
