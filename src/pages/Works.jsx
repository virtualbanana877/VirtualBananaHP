import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CountUp, Icon, PageHero, SecHead, dot } from '../components.jsx'
import { ACHIEVEMENTS, ACH_TYPES, HISTORY, countBy, dailyDay, reachStats, statsNote } from '../data.js'
import { useChannelStats } from '../useYouTube.js'

const SORTED = [...ACHIEVEMENTS].sort((a, b) => b.d.localeCompare(a.d))
const LABEL = { 受賞: '受賞・入賞', 出演: '出演', CM: 'CM放映', メディア: 'メディア掲載' }

export default function Works() {
  const [params] = useSearchParams()   // /works?type=CM#achievements のように、種別を指定して開ける
  const [allHistory, setAllHistory] = useState(false)   // 歩み: 転機だけ／節目も
  const [type, setType] = useState(() => ACH_TYPES.includes(params.get('type')) ? params.get('type') : 'すべて')
  const list = type === 'すべて' ? SORTED : SORTED.filter(a => a.c === type)
  const day = dailyDay()
  const yt = useChannelStats()   // YouTubeの登録者数・総再生数は最新の数字（取れなければ予備）

  return (
    <>
      <PageHero en="WORKS" title="実績" lead="受賞・出演・CM放映・メディア掲載。各項目から、当時の記事・配信・投稿を見られます。" />

      <section className="sec sec--white">
        <div className="wrap">
          <SecHead en="NUMBERS" title="数字で見る" />
          <ul className="nums nums--4">
            {reachStats(yt).map(s => <li key={s.l}><strong><CountUp value={s.n} /></strong><span>{s.l}</span></li>)}
          </ul>
          <p className="note">※{statsNote(yt.live)}</p>
          <ul className="nums nums--3 nums--ink">
            {['受賞', 'CM', 'メディア'].map(c => (
              <li key={c}><strong><CountUp value={`${countBy(c)}${c === 'メディア' ? '件' : '回'}`} /></strong><span>{LABEL[c]}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--cream" id="achievements">
        <div className="wrap">
          <SecHead en="ACHIEVEMENTS" title="受賞・出演・メディア" />
          <div className="chips-filter" role="group" aria-label="種別で絞り込む">
            {['すべて', ...ACH_TYPES].map(t => (
              <button key={t} type="button" aria-pressed={type === t} onClick={() => setType(t)}>
                {LABEL[t] || t}<small>{t === 'すべて' ? SORTED.length : countBy(t)}</small>
              </button>
            ))}
          </div>
          <p className="vh" role="status">{LABEL[type] || type} {list.length}件</p>{/* 一覧を丸ごと読み上げず件数だけ伝える */}
          <ul className="alist">
            {list.map(a => (
              <li key={a.d + a.t} className={a.s ? 'is-star' : ''}>
                <a href={a.u} target="_blank" rel="noopener noreferrer">
                  <time dateTime={a.d}>{a.l || dot(a.d)}</time>
                  <span className="chip">{LABEL[a.c]}</span>
                  <span className="alist__t">{a.t}{a.s && <span className="star">主な実績</span>}</span>
                  <span className="alist__go"><Icon.ext /></span>
                </a>
              </li>
            ))}
          </ul>
          <div className="btns btns--center">{/* 実績を見た依頼者がそのまま相談へ進めるように */}
            <Link className="btn btn--ink" to="/services#contact">お仕事の相談<Icon.arrow /></Link>
            <Link className="btn btn--white" to="/services">できることを見る<Icon.arrow /></Link>
          </div>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap">
          <SecHead en="HISTORY" title="歩み" />
          <div className="seg" role="group" aria-label="歩みの表示">
            <button type="button" aria-pressed={!allHistory} onClick={() => setAllHistory(false)}>転機だけ</button>
            <button type="button" aria-pressed={allHistory} onClick={() => setAllHistory(true)}>節目も見る<small>{HISTORY.filter(h => h.kind === 'mile').length}</small></button>
          </div>
          <ol className="timeline">
            {(allHistory ? HISTORY : HISTORY.filter(h => h.kind !== 'mile')).map(h => (
              <li key={h.d} className={`reveal${h.kind === 'mile' ? ' is-mile' : ''}`}>
                <span className="timeline__d">{h.d}</span>
                <div>
                  <strong>{h.t}</strong>
                  {h.b && <p>{h.b}</p>}
                  {h.u && <p><a className="textlink" href={h.u} target="_blank" rel="noopener noreferrer">{h.ul || 'リンク'}<Icon.ext /></a></p>}
                  {h.daily && <p className="daycount">今日で <b>{day.toLocaleString('ja-JP')}</b> 日目</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  )
}
