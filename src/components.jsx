import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LINKS } from './data.js'

export const img = f => `${import.meta.env.BASE_URL}images/${f}`
export const dot = d => d.replace(/-/g, '.')
const isExt = u => /^https?:/.test(u)

/* 外部URLなら新しいタブ、内部ならルーター遷移 */
export function SmartLink({ to, children, ...p }) {
  return isExt(to)
    ? <a href={to} target="_blank" rel="noopener noreferrer" {...p}>{children}</a>
    : <Link to={to} {...p}>{children}</Link>
}

/* ---------- アイコン ---------- */
const stroke = d => () => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path d={d} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
export const Icon = {
  game: stroke('M7 8h10a5 5 0 0 1 0 10c-1.6 0-2.4-1-3-2h-4c-.6 1-1.4 2-3 2A5 5 0 0 1 7 8zM8 11v4M6 13h4M15.5 12.5h.01M17.5 14.5h.01'),
  bag: stroke('M5 8h14l-1.2 12H6.2zM9 8V6.5a3 3 0 0 1 6 0V8'),
  heart: stroke('M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.4a4.1 4.1 0 0 1 7.5 2.4C19.5 15.4 12 20 12 20z'),
  pen: stroke('M4 20h4L19.5 8.5a2.8 2.8 0 0 0-4-4L4 16zM13.5 6.5l4 4'),
  case: stroke('M3.5 8h17v11.5h-17zM9 8V5h6v3M3.5 13h17'),
  home: stroke('M4 11 12 4l8 7v9h-5.5v-6h-5v6H4z'),
  arrow: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  ext: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M8 16 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  play: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor" /></svg>,
  youtube: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z" /></svg>,
  x: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
  tiktok: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path fill="currentColor" d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" /></svg>,
  nico: () => <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="m8 3 4 4 4-4M3.5 7h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM6 20l-1 2M18 20l1 2" /><circle cx="8.5" cy="13" r="1.4" fill="currentColor" /><circle cx="15.5" cy="13" r="1.4" fill="currentColor" /></svg>,
}

export const SNS = [
  { u: LINKS.youtube, l: 'YouTube', i: Icon.youtube },
  { u: LINKS.x, l: 'X', i: Icon.x },
  { u: LINKS.tiktok, l: 'TikTok', i: Icon.tiktok },
  { u: LINKS.nico, l: 'ニコニコ', i: Icon.nico },
]

const NAV = [
  ['/videos', '動画'],
  ['/character', 'キャラクター'],
  ['/#play', '遊ぶ・応援'],
  ['/works', '実績'],
  ['/services', 'できること'],
]

/* ---------- ヘッダー ---------- */
export function Header() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname, loc.hash])
  useEffect(() => {
    if (!open) return
    const onKey = e => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [open])

  const links = NAV.map(([to, l]) => to.includes('#')
    ? <Link key={to} to={to}>{l}</Link>
    : <NavLink key={to} to={to}>{l}</NavLink>)

  return (
    <header className="header">
      <div className="wrap header__in">
        <Link to="/" className="logo"><img src={img('icon.png')} alt="" width="40" height="40" />バーチャルバナナ</Link>
        <nav className="nav" aria-label="メイン">{links}</nav>
        <Link to="/services#contact" className="btn btn--sm header__cta">お仕事の相談</Link>
        <button className="burger" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
          <span /><span /><span className="vh">メニュー</span>
        </button>
      </div>
      <nav id="menu" className="menu" hidden={!open} aria-label="メニュー">
        {links}
        <Link to="/services#contact">お仕事の相談</Link>
        <ul className="sns">{SNS.map(s => <li key={s.l}><a href={s.u} target="_blank" rel="noopener noreferrer" aria-label={s.l}><s.i /></a></li>)}</ul>
      </nav>
    </header>
  )
}

/* ---------- フッター ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <ul className="sns">{SNS.map(s => <li key={s.l}><a href={s.u} target="_blank" rel="noopener noreferrer" aria-label={s.l}><s.i /></a></li>)}</ul>
        <div className="sitemap">
          <nav aria-label="サイトマップ">
            <Link to="/">トップ</Link>
            {NAV.map(([to, l]) => <Link key={to} to={to}>{l}</Link>)}
            <Link to="/services#contact">お仕事の相談</Link>
          </nav>
          <nav aria-label="外部リンク">
            <a href={LINKS.arcade} target="_blank" rel="noopener noreferrer">ゲーム屋台</a>
            <a href={LINKS.booth} target="_blank" rel="noopener noreferrer">BOOTH</a>
            <a href={LINKS.fanicon} target="_blank" rel="noopener noreferrer">fanicon</a>
            <a href={LINKS.note} target="_blank" rel="noopener noreferrer">note</a>
            <a href={LINKS.portfolio} target="_blank" rel="noopener noreferrer">ポートフォリオ</a>
          </nav>
        </div>
        <small className="copy">© 2018- バーチャルバナナ</small>
      </div>
      <div className="footer__giant" aria-hidden="true">バーチャルバナナ</div>
    </footer>
  )
}

/* ---------- ページ遷移の黄色い幕（初回は開幕演出も兼ねる） ---------- */
export function Curtain() {
  const { pathname } = useLocation()
  return (
    <div className="curtain" key={pathname} aria-hidden="true">
      <img src={img('icon.png')} alt="" width="96" height="96" />
    </div>
  )
}

/* ---------- 流れる帯 ---------- */
export function Marquee({ items, className = '' }) {
  // 片側だけで4K幅(3840px)の帯を埋められるよう最低24個まで繰り返す。速さは個数に比例させて揃える
  const half = Array.from({ length: Math.ceil(24 / items.length) }, () => items).flat()
    .map((t, i) => <span key={i}>{t}<i>★</i></span>)
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track" style={{ '--dur': `${half.length * 2.5}s` }}>{half}{half}</div>
    </div>
  )
}

/* ---------- 画面に入ったら数字をカウントアップ ---------- */
export function CountUp({ value }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(value)
  useEffect(() => {
    const m = /^([\d,]+)(.*)$/.exec(value)
    if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const target = Number(m[1].replace(/,/g, ''))
    const fmt = v => (m[1].includes(',') ? v.toLocaleString('ja-JP') : String(v)) + m[2]
    let raf
    setShown(fmt(0))
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const tick = now => {
        const p = Math.min(1, (now - t0) / 1400)
        setShown(fmt(Math.round(target * (1 - (1 - p) ** 4))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])
  return <><span ref={ref} aria-hidden="true">{shown}</span><span className="vh">{value}</span></>
}

/* ---------- 見出し ---------- */
export function SecHead({ en, title, lead, as: H = 'h2' }) {
  return (
    <div className="sechead">
      <span className="sechead__bg" aria-hidden="true">{en}</span>
      <p className="kicker">{en}</p>
      <H>{title}</H>
      {lead && <p className="sechead__lead">{lead}</p>}
    </div>
  )
}

/* 下層ページ冒頭の黄色いタイトル帯 */
export function PageHero({ en, title, lead }) {
  return (
    <section className="phero">
      <span className="phero__bg" aria-hidden="true">{en}</span>
      <div className="wrap">
        <p className="kicker">{en}</p>
        <h1>{title}</h1>
        <p>{lead}</p>
      </div>
    </section>
  )
}

/* ---------- 動画カード ---------- */
export function VideoCard({ v }) {
  return (
    <a className="card vcard" href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener noreferrer">
      <div className="vcard__thumb">
        <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" width="480" height="360" loading="lazy" />
        <span className="vcard__play"><Icon.play /></span>
      </div>
      <div className="vcard__body">
        <span className="chip">{v.tag}</span>
        <h3>{v.title}</h3>
        <time dateTime={v.date}>{dot(v.date)}</time>
      </div>
    </a>
  )
}

export function TikTokCard({ h }) {
  return (
    <a className="card ttcard" href={h.url} target="_blank" rel="noopener noreferrer">
      <span className="ttcard__icon"><Icon.tiktok /></span>
      <strong>{h.views ? `${h.views}回再生` : 'TikTokで伸びた動画'}</strong>
      <span><time dateTime={h.date}>{dot(h.date)}</time>{h.note && ` ｜ ${h.note}`}</span>
      <span className="ttcard__go">TikTokで見る <Icon.ext /></span>
    </a>
  )
}

/* ポインタに合わせてカードを傾ける */
export const tilt = {
  onPointerMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`)
    e.currentTarget.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -10}deg`)
  },
  onPointerLeave(e) {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  },
}
