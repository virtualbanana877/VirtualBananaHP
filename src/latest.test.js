import test from 'node:test'
import assert from 'node:assert/strict'
import { firstVideoId, fromPlaylistItems, jstDate } from './latest.js'

test('日本時間の日付に直す（UTCの夜は翌日）', () => {
  assert.equal(jstDate('2026-11-24T16:00:00Z'), '2026-11-25')
  assert.equal(jstDate('2026-11-24T14:59:59+00:00'), '2026-11-24')
  assert.equal(jstDate('not a date'), '')
})

const item = (id, title, date) => ({ snippet: { title, publishedAt: date, resourceId: { videoId: id } }, contentDetails: { videoId: id, videoPublishedAt: date } })

test('playlistItems → 新しい順・非公開と削除は除く・件数制限', () => {
  const json = { items: [
    item('a', '古い', '2026-11-01T03:00:00Z'),
    item('b', 'Private video', '2026-11-20T03:00:00Z'),
    item('c', '新しい', '2026-11-24T03:00:00Z'),
    item('d', 'Deleted video', '2026-11-23T03:00:00Z'),
    item('e', '真ん中', '2026-11-10T03:00:00Z'),
  ] }
  assert.deepEqual(fromPlaylistItems(json).map(v => v.id), ['c', 'e', 'a'])
  assert.deepEqual(fromPlaylistItems(json, 2).map(v => v.id), ['c', 'e'])
  assert.equal(fromPlaylistItems(json)[0].date, '2026-11-24')
})

test('同じ日の動画はAPIの順（新しい順）のまま', () => {
  const json = { items: [item('x', '夜', '2026-11-24T10:00:00Z'), item('y', '朝', '2026-11-24T01:00:00Z')] }
  assert.deepEqual(fromPlaylistItems(json).map(v => v.id), ['x', 'y'])
})

test('不正な返事でも落ちない', () => {
  assert.deepEqual(fromPlaylistItems(null), [])
  assert.deepEqual(fromPlaylistItems({}), [])
  assert.deepEqual(fromPlaylistItems({ items: [{}] }), [])
})

test('再生リストの最初の公開動画のID（非公開・削除は飛ばす）', () => {
  const json = { items: [item('p', 'Private video', '2026-11-20T03:00:00Z'), item('q', 'Deleted video', '2026-11-20T03:00:00Z'), item('r', '最初の動画', '2020-01-01T03:00:00Z'), item('s', '二番目', '2021-01-01T03:00:00Z')] }
  assert.equal(firstVideoId(json), 'r')
  assert.equal(firstVideoId({ items: [] }), null)
  assert.equal(firstVideoId(null), null)
})
