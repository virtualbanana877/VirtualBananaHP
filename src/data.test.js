import test from 'node:test'
import assert from 'node:assert/strict'
import { dailyDay, countBy } from './data.js'

test('毎日投稿の日数: 開始日が1日目', () => {
  assert.equal(dailyDay(new Date(2023, 1, 25)), 1)
  assert.equal(dailyDay(new Date(2023, 1, 26)), 2)
  assert.equal(dailyDay(new Date(2024, 1, 25)), 366)
  assert.equal(dailyDay(new Date(2026, 10, 25, 23, 59)), 1370)
})

test('実績件数が仕様書の数字と一致', () => {
  assert.equal(countBy('受賞'), 3)
  assert.equal(countBy('CM'), 7)
  assert.equal(countBy('メディア'), 4)
})
