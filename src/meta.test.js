import test from 'node:test'
import assert from 'node:assert/strict'
import { pageMeta } from './meta.js'

test('ページごとのcanonical（末尾の/は無視）', () => {
  assert.equal(pageMeta('/').canonical, 'https://virtual-banana.com/')
  assert.equal(pageMeta('/videos').canonical, 'https://virtual-banana.com/videos')
  assert.equal(pageMeta('/works/').canonical, 'https://virtual-banana.com/works')
})
test('タイトル: トップはサイト名、下層は「ページ名｜バーチャルバナナ」', () => {
  assert.equal(pageMeta('/').title, 'バーチャルバナナ｜声真似VTuber 公式サイト')
  assert.equal(pageMeta('/services').title, 'できること｜バーチャルバナナ')
})
test('存在しないURLだけ noindex', () => {
  assert.equal(pageMeta('/nope').robots, 'noindex')
  assert.equal(pageMeta('/videos').robots, null)
})
