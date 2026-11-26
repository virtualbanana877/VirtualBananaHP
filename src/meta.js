// ページごとの title / description / canonical を決めて <head> に反映する
export const SITE = 'https://virtual-banana.com'
const HOME_TITLE = 'バーチャルバナナ｜声真似VTuber 公式サイト'
const HOME_DESC = '声真似・パロディを軸に、動画制作・バナナアート・オリジナル曲・Webゲームやサイト制作まで手がけるVTuber、バーチャルバナナの公式サイト。'

const PAGES = {
  '/': { t: HOME_TITLE, d: HOME_DESC },
  '/videos': { t: '動画', d: 'バーチャルバナナの動画。最新のショート動画、パロディ、オリジナル曲、声真似講座、バナナアートの再生リスト。' },
  '/character': { t: 'キャラクター', d: 'バーチャルバナナと芭蕉宮香のプロフィール、進化、三面図、3Dモデル、デザインクレジット。' },
  '/works': { t: '実績', d: 'バーチャルバナナの受賞・出演・CM放映・メディア掲載の実績と、YouTube・TikTok・Xの数字、これまでの歩み。' },
  '/services': { t: 'できること', d: '声真似・ボイス提供、動画の企画・脚本・編集、バナナアート、Webゲーム・Webサイト制作のご依頼について。お仕事のご相談はXのDMへ。' },
  '/links': { t: 'リンク', d: 'バーチャルバナナのリンクまとめ。YouTube、TikTok、X、ゲーム、BOOTH、fanicon、note。' },
}

export const normalize = p => p.replace(/\/+$/, '') || '/'   // 末尾の / は無視

export function pageMeta(pathname) {
  const path = normalize(pathname)
  const m = PAGES[path]
  return {
    title: path === '/' ? HOME_TITLE : `${m ? m.t : 'ページが見つかりません'}｜バーチャルバナナ`,
    description: m ? m.d : HOME_DESC,
    canonical: SITE + (path === '/' ? '/' : path),
    robots: m ? null : 'noindex',   // 存在しないURLは検索に載せない
  }
}

function set(doc, selector, attrs, key, value) {
  let el = doc.head.querySelector(selector)
  if (!el) {
    el = doc.createElement(selector.startsWith('link') ? 'link' : 'meta')
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
    doc.head.appendChild(el)
  }
  el.setAttribute(key, value)
  return el
}

export function applyMeta(doc, pathname) {
  const m = pageMeta(pathname)
  doc.title = m.title
  set(doc, 'meta[name="description"]', { name: 'description' }, 'content', m.description)
  set(doc, 'link[rel="canonical"]', { rel: 'canonical' }, 'href', m.canonical)
  set(doc, 'meta[property="og:url"]', { property: 'og:url' }, 'content', m.canonical)
  set(doc, 'meta[property="og:title"]', { property: 'og:title' }, 'content', m.title)
  set(doc, 'meta[property="og:description"]', { property: 'og:description' }, 'content', m.description)
  const mine = doc.head.querySelector('meta[name="robots"][data-managed]')
  if (m.robots) set(doc, 'meta[name="robots"][data-managed]', { name: 'robots', 'data-managed': '1' }, 'content', m.robots)
  else if (mine) mine.remove()   // 自分で足したものだけ外す（サーバー側が付けたものには触らない）
}
