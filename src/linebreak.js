import { Parser, jaModel } from 'budoux'

// 日本語を文節（BudouX）で区切り、切れ目にゼロ幅スペースを入れる。
// CSS の word-break: keep-all と組み合わせて「文節の切れ目・「・」の後ろ・漢字2字以上→カタカナの境目でだけ改行」させる。
// （BudouX は「ショート動画コンテスト」のような複合語を1塊にするので、「動画|コンテスト」でも折れるようにする。「夏フェス」は1字なので折らない）
// 元の文字列に入っている \u200B は「ここで折ってよい」の手動指定として残す（自動が苦手な固有名詞・複合語用）。
const parser = new Parser(jaModel)
const ZWSP = '\u200B'
const JA = /[\u3040-\u30FF\u3400-\u9FFF]/

export function phrase(text) {
  return text.split(ZWSP).map(s => (JA.test(s) ? parser.parse(s).join(ZWSP) : s)).join(ZWSP)
    .replace(/・(?=[^\u200B])/g, '・' + ZWSP)
    .replace(/([\u3400-\u9FFF]{2})(?=[\u30A1-\u30FA])/g, '$1' + ZWSP)
    .replace(/([A-Za-z0-9])\u200B(?=[A-Za-z0-9])/g, '$1')   // 「C|M動画」のように英数字の途中で折らない
}

// 文字ノードの中身だけ書き換える（要素を増やさないので React の再描画と衝突しない）。処理済みのノードは飛ばす
const done = new WeakMap()
function apply(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    if (done.get(node) === node.data) return
    const next = phrase(node.data)
    if (next !== node.data) node.data = next
    done.set(node, next)
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT)
    for (let t; (t = walker.nextNode());) apply(t)
  }
}

// root 以下の文字を、描画のたびに自動で処理する
export function autoLineBreak(root) {
  const opts = { childList: true, characterData: true, subtree: true }
  const obs = new MutationObserver(records => {
    obs.disconnect()   // 自分の書き換えで再発火しないように
    for (const r of records) r.type === 'childList' ? r.addedNodes.forEach(apply) : apply(r.target)
    obs.observe(root, opts)
  })
  apply(root)
  obs.observe(root, opts)

  // コピーした文字にゼロ幅スペースを混ぜない
  document.addEventListener('copy', e => {
    const s = getSelection().toString()
    if (!s.includes(ZWSP)) return
    e.clipboardData.setData('text/plain', s.replaceAll(ZWSP, ''))
    e.preventDefault()
  })
}
