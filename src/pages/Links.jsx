import { Link } from 'react-router-dom'
import { Icon, SNS, SmartLink, img } from '../components.jsx'
import { FEATURED, LINK_GROUPS, dailyDay } from '../data.js'

export default function Links() {
  let n = 0   // 上から順に出てくる演出の番号
  return (
    <div className="links">
      <div className="links__in">
        <img className="links__avatar" src={img('icon.png')} alt="" width="112" height="112" />
        <h1 className="links__name">バーチャルバナナ</h1>
        <p className="links__tag">声真似VTuber ／ 毎日投稿 {dailyDay().toLocaleString('ja-JP')}日目</p>
        <p className="links__bio">声真似・パロディを軸に、動画制作・バナナアート・オリジナル曲・Webゲームやサイト制作まで手がけています。</p>
        <ul className="sns">
          {SNS.map(s => <li key={s.l}><a href={s.u} target="_blank" rel="noopener noreferrer" aria-label={s.l}><s.i /></a></li>)}
        </ul>

        <a className="lfeat" style={{ '--i': n++ }} href={`https://www.youtube.com/shorts/${FEATURED.id}`} target="_blank" rel="noopener noreferrer">
          <span className="lfeat__text">
            <span className="chip">まずはこの1本</span>
            <strong>{FEATURED.title}</strong>
          </span>
          <img src={img('banana.png')} alt="" width="512" height="512" />
        </a>

        {LINK_GROUPS.map(g => (
          <section key={g.title} className="lgroup">
            <h2>{g.title}</h2>
            <ul>
              {g.links.map(l => {
                const I = Icon[l.i]
                return (
                  <li key={l.t}>
                    <SmartLink to={l.u} className={`lbtn${l.ink ? ' lbtn--ink' : ''}`} style={{ '--i': n++ }}>
                      <span className="lbtn__icon"><I /></span>
                      <span className="lbtn__text"><strong>{l.t}</strong>{l.s && <small>{l.s}</small>}</span>
                      {/^https?:/.test(l.u) ? <Icon.ext /> : <Icon.arrow />}
                    </SmartLink>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <Link className="links__home" to="/">公式サイトを見る<Icon.arrow /></Link>
        <small className="links__copy">© 2018- バーチャルバナナ</small>
      </div>
    </div>
  )
}
