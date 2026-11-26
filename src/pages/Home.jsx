import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CountUp, Icon, Marquee, PlaylistCard, SecHead, VideoCard, img, dot, tilt } from '../components.jsx'
import { useLatest } from '../useYouTube.js'
import {
  KEY_STATS, FEATURED, PLAYLISTS, CHARACTERS, SERVICES, LINKS, dailyDay, countBy,
} from '../data.js'

export default function Home() {
  const day = dailyDay()
  return (
    <>
      <Hero day={day} />
      <Marquee className="marquee--hero" items={['声真似300+', 'パロディ', 'オリジナル曲', 'バナナアート', 'Webゲーム', 'ボイス', `毎日投稿 ${day.toLocaleString('ja-JP')}日目`]} />
      <Featured />
      <FindVideos />
      <Characters />
      <Play />
      <div className="cross" aria-hidden="true">
        <Marquee className="tape tape--a" items={['FOR FANS', 'ここまで ファンのみなさんへ']} />
        <Marquee className="tape tape--b" items={['FOR BUSINESS', 'ここから お仕事の方へ']} />
      </div>
      <Business />
    </>
  )
}

/* ---------- 0. ヒーロー ---------- */
function Hero({ day }) {
  const sec = useRef(null)
  const chara = useRef(null)
  const [talk, setTalk] = useState({ n: 0, line: null })
  const lines = [
    '声真似のレパートリーは300以上！',
    `毎日投稿、今日で${day.toLocaleString('ja-JP')}日目！`,
    'バナナだから8〜7歳です',
    'Webゲームも作ってるよ。遊んでみて！',
    '誕生日は8月7日（バナナの日）！',
    'お仕事のご相談はXのDMへどうぞ！',
  ]

  // 吹き出しは4秒でフェードアウト（CSS）し、終わったら消す。動きを減らす設定でも消えるようタイマーで外す
  useEffect(() => {
    if (!talk.line) return
    const id = setTimeout(() => setTalk(t => ({ ...t, line: null })), 4400)
    return () => clearTimeout(id)
  }, [talk])

  const onMove = e => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return   // 動きを減らす設定ではマウスに追従させない
    const r = sec.current.getBoundingClientRect()
    sec.current.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
    sec.current.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
  }
  const onTalk = () => {
    setTalk(t => ({ n: t.n + 1, line: lines[t.n % lines.length] }))
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      chara.current.animate(
        [{ transform: 'none' }, { transform: 'translateY(-8%) rotate(-5deg) scale(1.04)' }, { transform: 'none' }],
        { duration: 520, easing: 'cubic-bezier(.3,1.6,.5,1)' },
      )
    }
  }

  return (
    <section className="hero" ref={sec} onPointerMove={onMove}>
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="hero__kicker"><span>声真似VTuber</span>since 2018年3月</p>
          <h1 className="hero__title">
            <span className="vh">バーチャルバナナ</span>
            <span aria-hidden="true" className="hero__line">{[...'バーチャル'].map((c, i) => <span key={i} className="ch" style={{ '--i': i }}>{c}</span>)}</span>
            <span aria-hidden="true" className="hero__line hero__line--ink">{[...'バナナ'].map((c, i) => <span key={i} className="ch" style={{ '--i': i + 5 }}>{c}</span>)}</span>
          </h1>
          <div className="hero__sheet">{/* スマホ・タブレットでは下端の白いシートになる */}
            <p className="hero__catch">声真似・パロディを軸に、動画制作・バナナアート・オリジナル曲・Webゲームやサイト制作まで幅広く手がけるVTuberです。</p>
            <ul className="hero__stats">
              {KEY_STATS.map(s => <li key={s.l}><strong><CountUp value={s.n} /></strong><span>{s.l}</span></li>)}
            </ul>
            <div className="btns">
              <Link className="btn btn--ink" to="/videos"><Icon.play />動画を見る</Link>
              <Link className="btn" to="/services#contact">お仕事の相談<Icon.arrow /></Link>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__burst" />
          <div className="hero__disc">
            <svg className="ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="ringPath" d="M100,100 m-84,0 a84,84 0 1,1 168,0 a84,84 0 1,1 -168,0" /></defs>
              <text><textPath href="#ringPath" textLength="527" lengthAdjust="spacing">VOICE IMPRESSION ★ PARODY ★ ORIGINAL SONG ★ BANANA ART ★ WEB GAME ★ </textPath></text>
            </svg>
          </div>
          <button type="button" className="hero__chara" onClick={onTalk} aria-label="バーチャルバナナに話しかける">
            <img ref={chara} src={img('hero.png')} alt="" width="900" height="900" />
          </button>
          <p className="bubble" key={talk.n} role="status" hidden={!talk.line}>{talk.line}</p>
          <p className="hero__hint" hidden={!!talk.line} aria-hidden="true"><span className="hint-pc">クリック</span><span className="hint-touch">タップ</span>で<br />話しかける</p>
          <div className="sticker">
            <small>毎日投稿</small>
            <b>{day.toLocaleString('ja-JP')}</b>
            <small>日目</small>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 1. まずはこの1本 ---------- */
function Featured() {
  return (
    <section className="sec sec--white">
      <div className="wrap split split--5-7 split--feature">
        <div className="phone-wrap reveal">
          <div className="phone">
            <iframe
              src={`https://www.youtube.com/embed/${FEATURED.id}`}
              title={FEATURED.title}
              loading="lazy"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <svg className="scribble" viewBox="0 0 160 90" aria-hidden="true"><path d="M150 12C110 4 60 18 40 52c-6 10-8 20-6 28m0 0-10-14m10 14 13-10" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="reveal">
          <SecHead en="START HERE" title="まずはこの1本" />
          <p className="big-lead">はじめての方は、まずこの1本から。<br />声真似とキャラクターの雰囲気が、1分でわかります。</p>
          <p className="meta"><span className="chip">最新の自己紹介</span><time dateTime={FEATURED.date}>{dot(FEATURED.date)}</time></p>
          <p className="meta-title">{FEATURED.title}</p>
          <div className="btns">
            <a className="btn" href={`https://www.youtube.com/shorts/${FEATURED.id}`} target="_blank" rel="noopener noreferrer"><Icon.youtube />YouTubeで見る</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- 2. 動画を探す ---------- */
function FindVideos() {
  const { items, status } = useLatest()
  const latest = items.slice(0, 3)
  return (
    <section className="sec sec--cream">
      <div className="wrap">
        <SecHead en="VIDEOS" title="動画を探す" lead="声真似、パロディ、オリジナル曲。気になったものから見てください。" />
        <h3 className="subhead">再生リスト</h3>
        <ul className="grid grid--plist">
          {PLAYLISTS.map((p, i) => (
            <li key={p.t} className="reveal"><PlaylistCard p={p} i={i} /></li>
          ))}
        </ul>
        <h3 className="subhead">最新動画</h3>
        {latest.length > 0 ? (
          <ul className="grid grid--videos hscroll">
            {latest.map(v => <li key={v.id}><VideoCard v={v} /></li>)}
          </ul>
        ) : (
          <p className="latest-empty" aria-busy={status === 'loading'}>
            {status === 'loading' ? '最新の動画を読み込んでいます…' : '最新の動画を読み込めませんでした。動画一覧またはYouTubeからご覧ください。'}
          </p>
        )}
        <div className="btns btns--center">
          <Link className="btn btn--ink" to="/videos">動画一覧へ<Icon.arrow /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- 3. キャラクター ---------- */
function Characters() {
  return (
    <section className="sec sec--white">
      <div className="wrap">
        <SecHead en="CHARACTER" title="キャラクター" />
        <ul className="grid grid--2">
          {CHARACTERS.map(c => (
            <li key={c.key} className="reveal">
              <Link className="card ccard" to={`/character?c=${c.key}`} {...tilt}>
                <span className={`ccard__img ccard__img--${c.key}`}><img src={img(c.img)} alt="" width="512" height="512" loading="lazy" /></span>
                <span className="ccard__body">
                  <small>{c.kana}</small>
                  <strong>{c.name}</strong>
                  <span>{c.lead}</span>
                  <span className="ccard__go">プロフィールを見る<Icon.arrow /></span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="btns btns--center">
          <Link className="btn" to="/character">キャラクター詳細へ<Icon.arrow /></Link>
        </div>
      </div>
    </section>
  )
}

/* ---------- 4. 遊ぶ・応援する ---------- */
function Play() {
  const items = [
    { u: LINKS.arcade, en: 'GAME', t: 'ゲーム屋台', b: 'スマホですぐ遊べるブラウザゲーム8本と、便利ツール。' },
    { u: LINKS.booth, en: 'SHOP', t: 'BOOTH', b: 'グッズはこちら。' },
    { u: LINKS.fanicon, en: 'FANS', t: 'fanicon', b: 'ファンコミュニティ。' },
    { u: LINKS.note, en: 'READ', t: 'note', b: 'noteでも発信しています。' },
  ]
  return (
    <section className="sec sec--yellow sec--play" id="play">
      <div className="wrap">
        <SecHead en="PLAY & SUPPORT" title="遊ぶ・応援する" />
        <ul className="grid grid--play">
          {items.map(it => (
            <li key={it.t} className="reveal">
              <a className="card pcard" href={it.u} target="_blank" rel="noopener noreferrer">
                <span className="pcard__en">{it.en}</span>
                <strong>{it.t}</strong>
                <span>{it.b}</span>
                <span className="pcard__go" aria-hidden="true"><Icon.ext /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------- 5. お仕事の方へ ---------- */
function Business() {
  const nums = [
    { n: `${countBy('受賞')}回`, l: '受賞・入賞' },
    { n: `${countBy('CM')}回`, l: 'CM放映' },
    { n: `${countBy('メディア')}件`, l: 'メディア掲載' },
  ]
  return (
    <section className="sec sec--ink sec--biz">
      <div className="wrap">
        <SecHead en="FOR BUSINESS" title="お仕事の方へ" lead="声真似を軸に、企画から制作まで。活動は基本ワンオペで、下の「ご依頼OK」の内容はお仕事のご相談をお受けしています。" />
        <ul className="bstats">
          {nums.map(s => <li key={s.l} className="reveal"><strong><CountUp value={s.n} /></strong><span>{s.l}</span></li>)}
        </ul>
        <ul className="grid grid--svc">
          {SERVICES.filter(s => s.ok).map((s, i) => (
            <li key={s.t} className="svc reveal">
              <span className="svc__no">{String(i + 1).padStart(2, '0')}</span>
              <strong>{s.t}</strong>
              <span className="chip">ご依頼OK</span>
            </li>
          ))}
        </ul>
        <div className="btns btns--center">
          <Link className="btn" to="/works">実績を見る<Icon.arrow /></Link>
          <Link className="btn btn--ghost" to="/services">お仕事の詳細へ<Icon.arrow /></Link>
        </div>
      </div>
    </section>
  )
}
