// Tiny synthesized meteor SFX (no files needed). Must be created inside a click.
export function createSfx() {
  const C = window.AudioContext || window.webkitAudioContext
  if (!C) return { whoosh() {}, boom() {} }
  const ctx = new C(); ctx.resume?.()
  const noise = (sec) => { const b = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate), d = b.getChannelData(0)
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
    const s = ctx.createBufferSource(); s.buffer = b; return s }
  return {
    whoosh(sec = 6) { const n = noise(sec), f = ctx.createBiquadFilter(), g = ctx.createGain(), t = ctx.currentTime
      f.type = 'bandpass'; f.Q.value = 0.8; f.frequency.setValueAtTime(150, t); f.frequency.exponentialRampToValueAtTime(2800, t + sec)
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.5, t + sec); n.connect(f).connect(g).connect(ctx.destination); n.start() },
    boom() { const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain()
      o.frequency.setValueAtTime(110, t); o.frequency.exponentialRampToValueAtTime(28, t + 2)
      g.gain.setValueAtTime(0.9, t); g.gain.exponentialRampToValueAtTime(0.001, t + 3); o.connect(g).connect(ctx.destination); o.start(); o.stop(t + 3)
      const n = noise(2), ng = ctx.createGain(); ng.gain.setValueAtTime(0.6, t); ng.gain.exponentialRampToValueAtTime(0.001, t + 1.8); n.connect(ng).connect(ctx.destination); n.start() },
  }
}
