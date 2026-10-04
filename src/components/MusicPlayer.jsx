export default function MusicPlayer({ playing, toggle }) {
  return (
    <button className={'music' + (playing ? ' on' : '')} onClick={toggle} aria-label={playing ? 'Pause music' : 'Play music'}>
      <span /><span /><span /><span />
    </button>
  )
}
