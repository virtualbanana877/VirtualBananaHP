import { test } from 'node:test'
import assert from 'node:assert/strict'
import { phrase } from './linebreak.js'

const ZWSP = '\u200B'
const catchCopy = '声真似・パロディを軸に、動画制作・バナナアート・オリジナル曲・Webゲームやサイト制作まで幅広く手がけるVTuberです。'

test('文節と・の後ろで区切り、単語の途中では区切らない', () => {
  const chunks = phrase(catchCopy).split(ZWSP)
  assert.ok(chunks.length > 5)
  assert.ok(chunks.some(c => c.includes('Webゲーム')))       // 「Webゲ|ーム」にならない
  assert.ok(chunks.includes('バナナアート・'))                 // ・の後ろでも折れる
  assert.deepEqual(phrase('声真似レパートリー').split(ZWSP), ['声真似', 'レパートリー'])   // 漢字2字以上→カタカナで折れる
  assert.ok(phrase('ミュージック夏フェス').includes('夏フェス'))                          // 漢字1字の「夏フェス」は折らない
  assert.equal(phrase('CM動画の企画').split(ZWSP)[0].startsWith('CM'), true)             // 英数字の途中では折らない
})

test('手動で入れた区切りは残る', () => {
  assert.deepEqual(phrase('声真似' + ZWSP + 'レパートリー').split(ZWSP), ['声真似', 'レパートリー'])
  const t = 'そらのうえショッピングモール' + ZWSP + 'ミュージック夏フェス 出演'
  assert.ok(phrase(t).split(ZWSP).some(c => c.startsWith('ミュージック')))
})

test('文字そのものは変えない・日本語以外はそのまま', () => {
  assert.equal(phrase(catchCopy).replaceAll(ZWSP, ''), catchCopy)
  assert.equal(phrase('1,370'), '1,370')
  assert.equal(phrase('VOICE IMPRESSION'), 'VOICE IMPRESSION')
})
