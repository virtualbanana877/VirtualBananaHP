import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHero, SecHead, img } from '../components.jsx'
import { CHARACTERS } from '../data.js'

const CREDIT_ALT = 'キャラクターデザインのクレジット：英央様、マコミック様、吸血鬼様'
const LINEUP_ALT = 'プロデューサが担当するバーチャルキャラクター一覧：バーチャルバナナ、芭蕉宮香、バナナ農家のおじさん、活動初期バナナ ほか'

export default function Character() {
  const [params, setParams] = useSearchParams()
  const c = CHARACTERS.find(x => x.key === params.get('c')) || CHARACTERS[0]
  const dlg = useRef(null)
  const [zoom, setZoom] = useState(null)
  const open = z => { setZoom(z); dlg.current.showModal() }

  return (
    <>
      <PageHero en="CHARACTER" title="キャラクター" lead="バーチャルバナナと、その相方。" />

      <section className="sec sec--white">
        <div className="wrap">
          <div className="ctabs" role="tablist" aria-label="キャラクター">
            {CHARACTERS.map(x => (
              <button key={x.key} type="button" role="tab" id={`tab-${x.key}`} aria-controls="profile"
                aria-selected={x.key === c.key} onClick={() => setParams({ c: x.key }, { replace: true })}>
                <img src={img(x.img)} alt="" width="48" height="48" />{x.name}
              </button>
            ))}
          </div>

          <div className="split split--5-7 profile" id="profile" role="tabpanel" aria-labelledby={`tab-${c.key}`} key={c.key}>
            <div className={`profile__img profile__img--${c.key}`}>
              <img src={img(c.full)} alt={c.name} />
            </div>
            <div>
              <p className="profile__kana">{c.kana}</p>
              <h2 className="profile__name">{c.name}</h2>
              <p className="big-lead">{c.lead}</p>
              <dl className="ptable">
                {c.profile.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {c.gallery.length > 0 && (
        <section className="sec sec--cream">
          <div className="wrap">
            <SecHead en="VISUALS" title="ビジュアル資料" lead="タップで拡大できます。" />
            <ul className="grid grid--gallery">
              {c.gallery.map(g => (
                <li key={g.f}>
                  <button type="button" className="card gitem" onClick={() => open({ src: img(g.f), alt: `${c.name}の${g.t}` })}>
                    <span className="gitem__img"><img src={img(g.f)} alt="" width={g.w} height={g.h} loading="lazy" /></span>
                    <span className="gitem__cap">{g.t}<span aria-hidden="true">＋</span></span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className={`sec ${c.gallery.length ? 'sec--white' : 'sec--cream'}`}>
        <div className="wrap">
          <SecHead en="CREDIT" title="デザインクレジット" />
          <button type="button" className="card wide-img" onClick={() => open({ src: img('project-credits.jpg'), alt: CREDIT_ALT })}>
            <img src={img('project-credits.jpg')} alt={CREDIT_ALT} width="1600" height="900" loading="lazy" />
          </button>
        </div>
      </section>

      <section className={`sec ${c.gallery.length ? 'sec--cream' : 'sec--white'}`}>
        <div className="wrap split split--6-6">
          <div>
            <SecHead en="ABOUT US" title="運営について" />
            <p className="big-lead">声と映像の制作を担当するプロデューサーを中心に、家族で動かしているプロジェクトです。</p>
            <p>プロデューサーはバーチャルバナナ・芭蕉宮香のほか、いくつものバーチャルキャラクターを担当しています。</p>
          </div>
          <button type="button" className="card wide-img" onClick={() => open({ src: img('project-characters.jpg'), alt: LINEUP_ALT })}>
            <img src={img('project-characters.jpg')} alt={LINEUP_ALT} width="1600" height="900" loading="lazy" />
          </button>
        </div>
      </section>

      <section className="sec sec--yellow">
        <div className="wrap guide">
          <SecHead en="FAN WORKS" title="二次創作のガイドライン" />
          <p>削除依頼をされた際に対応してくれる方であれば、二次創作は基本的に問題ありません。二次創作であることは明記してください。</p>
          <p>R指定作品は、投稿場所の規約と見る人への配慮をお願いします。イラスト、MAD動画（音声を使用したものも含む）も問題ありません。報告も不要です。二次創作をした時点で、以上に同意したものとみなします。</p>
          <ul className="tags">
            <li><small>ハッシュタグ</small>#バーチャルバナナ</li>
            <li><small>イラスト</small>#バーチャルバナナ農園</li>
            <li><small>R-18イラスト</small>#夜のバーチャルバナナ農園</li>
          </ul>
        </div>
      </section>

      <dialog className="lightbox" ref={dlg} onClick={e => e.target === dlg.current && dlg.current.close()}>
        {zoom && <img src={zoom.src} alt={zoom.alt} />}
        <form method="dialog"><button className="lightbox__close" aria-label="閉じる">×</button></form>
      </dialog>
    </>
  )
}
