import { useRef, useState } from 'react'
import { Icon, PageHero, SecHead, TikTokCard, VideoCard } from '../components.jsx'
import { LINKS, PLAYLISTS, TIKTOK_HITS, VIDEOS, VIDEO_GENRES } from '../data.js'

const GROUPS = {
  'おすすめ': VIDEOS.filter(v => v.rec !== false),
  ...Object.fromEntries(VIDEO_GENRES.map(g => [g, VIDEOS.filter(v => v.tag === g)])),
  'TikTok': TIKTOK_HITS,
  'その他': VIDEOS.filter(v => !VIDEO_GENRES.includes(v.tag)),
}
const TABS = Object.keys(GROUPS).filter(k => GROUPS[k].length)

export default function Videos() {
  const [tab, setTab] = useState(TABS[0])
  const list = useRef(null)
  const pick = t => {
    setTab(t)
    // 一覧が画面より下にあるときだけ、一覧までスクロール
    if (list.current.getBoundingClientRect().top > innerHeight * 0.6) list.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <PageHero en="VIDEOS" title="動画" lead="声真似、パロディ、オリジナル曲。気になったものから見てください。" />

      <div className="filter">
        <div className="wrap filter__in" role="group" aria-label="動画のジャンル">
          {TABS.map(t => (
            <button key={t} type="button" aria-pressed={tab === t} onClick={() => pick(t)}>
              {t}<small>{GROUPS[t].length}</small>
            </button>
          ))}
        </div>
      </div>

      <section className="sec sec--white">
        <div className="wrap">
          <SecHead en="PLAYLIST" title="再生リスト" />
          <ul className="grid grid--plist">
            {PLAYLISTS.map((p, i) => (
              <li key={p.t}>
                <a className="card plist" href={p.u} target="_blank" rel="noopener noreferrer">
                  <span className="plist__top"><span className="plist__no">{String(i + 1).padStart(2, '0')}</span><span>{p.en}</span></span>
                  <strong>{p.t}</strong>
                  <span className="plist__go">再生リストを開く<Icon.ext /></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--cream" ref={list} id="list">
        <div className="wrap">
          <SecHead en="ALL VIDEOS" title={`動画一覧：${tab}`} />
          <ul className="grid grid--videos" aria-live="polite">
            {tab === 'TikTok'
              ? GROUPS.TikTok.map(h => <li key={h.url}><TikTokCard h={h} /></li>)
              : GROUPS[tab].map(v => <li key={v.id}><VideoCard v={v} /></li>)}
          </ul>
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
