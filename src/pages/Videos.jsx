import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Icon, PageHero, PlaylistCard, SecHead, TikTokCard, VideoCard } from '../components.jsx'
import { LINKS, PLAYLISTS, TIKTOK_HITS } from '../data.js'
import { useLatest } from '../useYouTube.js'

const LATEST = '最新'
const PAGE = 6   // 「最新」は最初の6件だけ表示（3列×2段）。残り（全部で15件）は「もっと見る」で開く

export default function Videos() {
  const [tab, setTab] = useState(LATEST)
  const { items: latest, status } = useLatest()   // 最新: ビルド時のRSS（予備）→ APIで取れたら置き換わる。トップと共有
  const [more, setMore] = useState(false)
  const list = useRef(null)
  const moreBtn = useRef(null)
  const beforeTop = useRef(null)

  // タブは「最新」と「TikTok」の2つ。ジャンル別は再生リストから見られる
  const groups = useMemo(() => ({ [LATEST]: latest, TikTok: TIKTOK_HITS }), [latest])
  const tabs = Object.keys(groups)   // 「最新」は読み込み中でも常に先頭
  const items = groups[tab]
  const visible = tab === LATEST && !more ? items.slice(0, PAGE) : items

  const pick = (t, e) => {
    setTab(t)
    setMore(false)
    // 一覧の先頭が固定フィルタのすぐ下に見えていなければ、そこまで移動（読み進めた後に押した場合も先頭へ戻る）
    const top = list.current.getBoundingClientRect().top
    const under = e.currentTarget.closest('.filter').getBoundingClientRect().bottom
    if (top < under || top > innerHeight * 0.6) {
      const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
      scrollTo({ top: scrollY + top - under, behavior: reduce ? 'auto' : 'smooth' })
    }
    // キーボードで押した時は、結果の見出しへフォーカスを移す（マウスの時はボタンに残す）
    if (e.detail === 0) {
      const h = list.current.querySelector('h2')
      h.tabIndex = -1
      h.focus({ preventScroll: true })
    }
  }

  // 「閉じる」を押したとき、ボタンが画面の同じ位置に残るようにスクロールを補正する
  const toggleMore = () => { beforeTop.current = moreBtn.current.getBoundingClientRect().top; setMore(m => !m) }
  useLayoutEffect(() => {
    if (beforeTop.current !== null && !more && moreBtn.current) {
      const d = moreBtn.current.getBoundingClientRect().top - beforeTop.current
      if (d) scrollBy(0, d)
    }
    beforeTop.current = null
  }, [more])

  return (
    <>
      <PageHero en="VIDEOS" title="動画" lead="声真似、パロディ、オリジナル曲。気になったものから見てください。" />

      <div className="filter">
        <div className="wrap filter__in" role="group" aria-label="動画の種類">
          {tabs.map(t => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={e => pick(t, e)}>
              {t}{groups[t].length > 0 && <small>{groups[t].length}</small>}
            </button>
          ))}
        </div>
      </div>

      <section className="sec sec--white">
        <div className="wrap">
          <SecHead en="PLAYLIST" title="再生リスト" />
          <ul className="grid grid--plist">
            {PLAYLISTS.map((p, i) => <li key={p.t}><PlaylistCard p={p} i={i} /></li>)}
          </ul>
        </div>
      </section>

      <section className="sec sec--cream" ref={list} id="list" style={{ overflowAnchor: 'none' }}>
        <div className="wrap">
          <SecHead en="ALL VIDEOS" title={`動画一覧：${tab}`} />
          <p className="vh" role="status">{tab}の動画 {items.length}件</p>{/* 一覧を丸ごと読み上げず件数だけ伝える */}
          {tab === LATEST && items.length === 0 ? (
            <div className="latest-empty" aria-busy={status === 'loading'}>
              {status === 'loading'
                ? <p>最新の動画を読み込んでいます…</p>
                : <>
                    <p>最新の動画を読み込めませんでした。YouTubeで見られます。</p>
                    <div className="btns"><a className="btn btn--ink" href={LINKS.youtube} target="_blank" rel="noopener noreferrer"><Icon.youtube />YouTubeで見る</a></div>
                  </>}
            </div>
          ) : (
            <ul className="grid grid--videos">
              {tab === 'TikTok'
                ? visible.map(h => <li key={h.url}><TikTokCard h={h} /></li>)
                : visible.map(v => <li key={v.id}><VideoCard v={v} /></li>)}
            </ul>
          )}
          {tab === LATEST && items.length > PAGE && (
            <div className="btns btns--center">
              <button ref={moreBtn} type="button" className="btn btn--white" aria-expanded={more} onClick={toggleMore}>
                {more ? '閉じる' : `もっと見る（残り${items.length - PAGE}件）`}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="band">
        <div className="wrap band__in">
          <p className="band__title">毎日、どこかで投稿中。</p>
          <div className="btns">
            <a className="btn btn--ink" href={LINKS.youtube} target="_blank" rel="noopener noreferrer"><Icon.youtube />YouTube</a>
            <a className="btn btn--white" href={LINKS.tiktok} target="_blank" rel="noopener noreferrer"><Icon.tiktok />TikTok</a>
          </div>
        </div>
      </section>
    </>
  )
}
