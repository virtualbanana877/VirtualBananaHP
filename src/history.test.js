import test from 'node:test'
import assert from 'node:assert/strict'
import { ACHIEVEMENTS, HISTORY, dailyDay } from './data.js'

test('歩み: 日付は古い順・「今」は最後・種別は turn/mile のどちらか', () => {
  const dated = HISTORY.filter(h => h.d !== '今').map(h => h.d)
  assert.deepEqual(dated, [...dated].sort())
  assert.equal(HISTORY.at(-1).d, '今')
  assert.ok(HISTORY.every(h => h.kind === 'turn' || h.kind === 'mile'))
  assert.equal(new Set(HISTORY.map(h => h.d)).size, HISTORY.length)   // 日付の重複なし（表示のkeyに使う）
})

test('歩み: 「毎日投稿の節目」が開始日（2023-02-25）から数えて正しい日に合っている', () => {
  assert.equal(dailyDay(new Date('2023-02-25T12:00:00+09:00')), 1)
  assert.equal(dailyDay(new Date('2025-11-20T12:00:00+09:00')), 1000)   // 「1,000日、毎日動画投稿を達成」
})

test('歩み: リンクつきの行はURLがある', () => {
  for (const h of HISTORY.filter(h => h.u)) assert.match(h.u, /^https:\/\//)
})

test('実績: スタンミじゃぱん（2024-11-27）が出演として入っている', () => {
  const a = ACHIEVEMENTS.find(x => x.d === '2024-11-27')
  assert.ok(a && a.c === '出演' && a.u === 'https://www.youtube.com/watch?v=Xwu0NnTFUf8' && a.t.includes('ダイヤの原石オーディション'))
})
