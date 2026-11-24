import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { Header, Footer, Curtain } from './components.jsx'
import Home from './pages/Home.jsx'
import Videos from './pages/Videos.jsx'
import Character from './pages/Character.jsx'
import Works from './pages/Works.jsx'
import Services from './pages/Services.jsx'
import Links from './pages/Links.jsx'

export default function App() {
  const { pathname, hash } = useLocation()
  const bare = pathname === '/links'   // リンクまとめはSNSプロフィール用なのでヘッダー・フッターなし

  // ページ移動時: #があればその位置へ、なければ先頭へ
  useEffect(() => {
    const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)))
    if (el) el.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <Curtain />
      {!bare && <Header />}
      <main>
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
