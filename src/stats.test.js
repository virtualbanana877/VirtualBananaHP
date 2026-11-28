import test from 'node:test'
import assert from 'node:assert/strict'
import { MANUAL_STATS, YOUTUBE_FALLBACK, asOfLabel, fmtFull, fmtMan, keyStats, parseCount, reachStats, statsNote } from './data.js'

test('数字の書式: 全桁（カンマ）と「万」', () => {
  assert.equal(fmtFull(6340), '6,340')
  assert.equal(fmtFull(11800), '11,800')
  assert.equal(fmtMan(3701234), '370万')
  assert.equal(fmtMan(3704999), '370万')
  assert.equal(fmtMan(3705000), '371万')
  assert.equal(fmtMan(9999), '9,999')
  assert.equal(fmtMan(10000), '1万')
})

test('「いつ時点か」の表示: 日まで／月まで／それ以外はそのまま', () => {
  assert.equal(asOfLabel('2026-11-28'), '2026年11月28日')
  assert.equal(asOfLabel('2026-11'), '2026年11月')
  assert.equal(asOfLabel('2026-01-05'), '2026年1月5日')
  assert.equal(asOfLabel('先週'), '先週')
})

test('数字の一覧: YouTubeは渡した値、TikTok・Xは MANUAL_STATS から', () => {
  const yt = { subs: 6350, views: 3712345 }
  const r = Object.fromEntries(reachStats(yt).map(s => [s.l, s.n]))
  assert.equal(r['YouTube登録者'], '6,350')
  assert.equal(r['YouTube総再生'], '371万')
  assert.equal(r['TikTokフォロワー'], fmtFull(MANUAL_STATS.tiktok))
  assert.equal(r['Xフォロワー'], fmtFull(MANUAL_STATS.x))
  assert.equal(keyStats(yt).find(s => s.l === 'YouTube総再生').n, '371万')
})

test('予備の数字は、これまで画面に出していた値と同じ', () => {
  const r = Object.fromEntries(reachStats(YOUTUBE_FALLBACK).map(s => [s.l, s.n]))
  assert.deepEqual(r, { 'YouTube登録者': '6,340', 'YouTube総再生': '370万', 'TikTokフォロワー': '4,610', 'Xフォロワー': '11,800' })
})

test('注記: YouTubeを取得できたときは「ページを開いた時点」と書く', () => {
  assert.match(statsNote(true), /YouTubeの数字はページを開いた時点.*TikTok・Xは2026年11月時点/)
  assert.equal(statsNote(false), '2026年11月時点の数字です。')
})

test('環境変数の数字の読み取り: カンマ・空白OK、読めなければ null（予備の値に戻る）', () => {
  assert.equal(parseCount('4,610'), 4610)
  assert.equal(parseCount(' 11800 '), 11800)
  assert.equal(parseCount(12000), 12000)
  for (const bad of ['', '  ', 'abc', '-5', '0', undefined, null]) assert.equal(parseCount(bad), null)
})

test('環境変数なし（Node）では予備の値が使われる', () => {
  assert.deepEqual(MANUAL_STATS, { asOf: '2026-11', tiktok: 4610, x: 11800 })
})
