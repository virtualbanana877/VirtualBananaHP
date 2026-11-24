import { Icon, PageHero, SecHead, SmartLink, img } from '../components.jsx'
import { LINKS, SERVICES } from '../data.js'

// shortcut: 流れは仮置き（仕様書10章で要確認）。確定したら文言を差し替える
const FLOW = [
  { t: '相談', b: 'XのDMで、ご依頼内容・納期・ご予算の目安をお送りください。' },
  { t: '見積', b: '内容を確認し、お見積りとスケジュールをご連絡します。' },
  { t: '制作', b: '内容が決まったら、制作に入ります。' },
  { t: '納品', b: '完成したものをお渡しします。' },
]

export default function Services() {
  const ok = SERVICES.filter(s => s.ok)
  const other = SERVICES.filter(s => !s.ok)

  return (
    <>
      <PageHero en="SERVICES" title="できること" lead="声真似を軸に、企画から制作まで。「ご依頼OK」の内容は、お仕事のご相談をお受けしています。" />

      <section className="sec sec--white">
        <div className="wrap">
          <SecHead en="WHAT I CAN DO" title="ご依頼OKの内容" />
          <ul className="grid grid--3">
            {ok.map((s, i) => (
              <li key={s.t} className="card okcard reveal">
                <span className="okcard__no">{String(i + 1).padStart(2, '0')}</span>
                <span className="chip">ご依頼OK</span>
                <h3>{s.t}</h3>
                <p>{s.b}</p>
                <SmartLink className="okcard__link" to={s.link.u}>{s.link.l}{/^https?:/.test(s.link.u) ? <Icon.ext /> : <Icon.arrow />}</SmartLink>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--cream">
        <div className="wrap">
          <SecHead en="ALSO" title="その他の活動" lead="以下は活動として行っているもので、ご依頼はお受けしていません。" />
          <ul className="grid grid--other">
            {other.map(s => (
              <li key={s.t} className="mini">
                <strong>{s.t}</strong>
                <span>{s.b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sec sec--white">
        <div className="wrap split split--6-6">
          <img className="card team-img" src={img('project-family.png')} width="1600" height="900" loading="lazy"
            alt="バーチャルバナナプロジェクトの体制図：プロデューサー（声・映像制作担当、活動は基本ワンオペ）、妻（バーチャルバナナのデザイン原案）、息子（子バナナ）" />
          <div>
            <SecHead en="TEAM" title="制作体制" />
            <p className="big-lead">制作は基本ワンオペです。</p>
            <p>声と映像の制作はプロデューサーがひとりで担当しています。バーチャルバナナのデザイン原案は妻によるもの。家族で動かしているプロジェクトです。</p>
          </div>
        </div>
      </section>

      <section className="sec sec--cream">
        <div className="wrap">
          <SecHead en="FLOW" title="ご依頼の流れ" />
          <ol className="flow">
            {FLOW.map((f, i) => (
              <li key={f.t} className="reveal">
                <span className="flow__no">STEP {i + 1}</span>
                <strong>{f.t}</strong>
                <p>{f.b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sec sec--yellow contact" id="contact">
        <div className="wrap contact__in">
          <p className="kicker">CONTACT</p>
          <h2>お仕事のご相談</h2>
          <p className="big-lead">お仕事のご相談は、X（旧Twitter）のDMからお気軽にどうぞ。<br />次の3つを添えていただくとスムーズです。</p>
          <ul className="checklist">
            <li>ご依頼内容</li>
            <li>納期</li>
            <li>ご予算の目安</li>
          </ul>
          <div className="btns btns--center">
            <a className="btn btn--ink btn--lg" href={LINKS.x} target="_blank" rel="noopener noreferrer"><Icon.x />Xで相談する</a>
            <a className="btn btn--white btn--lg" href={LINKS.portfolio} target="_blank" rel="noopener noreferrer">ポートフォリオを見る<Icon.ext /></a>
          </div>
          {/* shortcut: ボタンはプロフィールを開くだけ。XのユーザーID(数字)が分かれば x.com/messages/compose?recipient_id= で直接DM画面を開ける */}
          <p className="contact__note">ボタンを押すと X のプロフィール（@VirtualBa7）が開きます。<br />プロフィールの「メッセージ」ボタンから DM を送ってください。</p>
        </div>
      </section>
    </>
  )
}
