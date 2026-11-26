import { useEffect, useRef } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Header, Footer, Curtain } from './components.jsx'
import Home from './pages/Home.jsx'
import Videos from './pages/Videos.jsx'
import Character from './pages/Character.jsx'
import Works from './pages/Works.jsx'
import Services from './pages/Services.jsx'
import Links from './pages/Links.jsx'
import { applyMeta } from './meta.js'


export default function App() {
  const { pathname, hash } = useLocation()
  const path = pathname.replace(/\/+$/, '') || '/'   // 末尾の / は無視（/links/ も /links と同じ扱い）
  const bare = path === '/links'   // リンクまとめはSNSプロフィール用なのでヘッダー・フッターなし
  const last = useRef(null)   // 前回処理したURL（最初の表示・同じURLの再実行ではフォーカスを動かさない）

  // ページ移動時: #があればその位置へ、なければ先頭へ。タイトルもページごとに
  useEffect(() => {
    applyMeta(document, path)   // title・description・canonical・OGPのURLをページごとに
    const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
    // 2回目以降の移動では、キーボードと読み上げの位置も移動先の見出しへ
    const prev = last.current
    last.current = path + hash
    if (prev === null || prev === last.current) return
    const target = (el && (el.querySelector('h1, h2') || el)) || document.querySelector('main h1')
    if (!target) return
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [path, hash])

  return (
    <>
      <a className="skip" href="#main">本文へスキップ</a>
      <Curtain />
      {!bare && <Header />}
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/character" element={<Character />} />
          <Route path="/works" element={<Works />} />
          <Route path="/services" element={<Services />} />
          <Route path="/links" element={<Links />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!bare && <Footer />}
    </>
  )
}

function NotFound() {
  return (
    <section className="phero phero--404">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1>ページが見つかりません</h1>
        <p>バナナの皮ですべってしまったようです。</p>
        <Link className="btn btn--ink" to="/">トップへ戻る</Link>
      </div>
    </section>
  )
}
