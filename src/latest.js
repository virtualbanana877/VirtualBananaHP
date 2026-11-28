// 最新動画まわりの純粋な関数（ブラウザにもNodeにも依存しない。テストしやすいよう分けてある）

/** ISO日時 → 日本時間の YYYY-MM-DD */
export function jstDate(iso) {
  const t = Date.parse(iso)
  return Number.isNaN(t) ? '' : new Date(t + 9 * 3600000).toISOString().slice(0, 10)
}

const HIDDEN = new Set(['Private video', 'Deleted video', '非公開の動画', '削除された動画'])

/** YouTube Data API の playlistItems.list の返事 → [{ id, title, date }]（新しい順・最大 limit 件） */
export function fromPlaylistItems(json, limit = 20) {
  const items = json && Array.isArray(json.items) ? json.items : []
  return items
    .map(it => ({
      id: (it.contentDetails && it.contentDetails.videoId) || (it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId),
      title: (it.snippet && it.snippet.title) || '',
      date: jstDate((it.contentDetails && it.contentDetails.videoPublishedAt) || (it.snippet && it.snippet.publishedAt)),
    }))
    .filter(v => v.id && v.title && v.date && !HIDDEN.has(v.title))   // 非公開・削除された動画は出さない
    .sort((a, b) => b.date.localeCompare(a.date))                      // 同じ日の中はAPIの順（新しい順）のまま
    .slice(0, limit)
}

/** playlistItems.list（先頭の数件）の返事 → 最初の公開動画のID（なければ null） */
export function firstVideoId(json) {
  const items = json && Array.isArray(json.items) ? json.items : []
  for (const it of items) {
    const id = (it.contentDetails && it.contentDetails.videoId) || (it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId)
    const title = (it.snippet && it.snippet.title) || ''
    if (id && title && !HIDDEN.has(title)) return id
  }
  return null
}

/** videos.list の返事 → { [動画ID]: { title, date } }（日付は日本時間） */
export function fromVideos(json) {
  const out = {}
  for (const it of json && Array.isArray(json.items) ? json.items : []) {
    const title = it.snippet && it.snippet.title
    if (it.id && title) out[it.id] = { title, date: jstDate(it.snippet.publishedAt) }
  }
  return out
}

/** channels.list(statistics) の返事 → { subs, views }。登録者数が非公開なら subs は null。読めなければ null */
export function fromChannelStats(json) {
  const st = json && Array.isArray(json.items) && json.items[0] && json.items[0].statistics
  if (!st) return null
  const views = Number(st.viewCount)
  if (!Number.isFinite(views) || views <= 0) return null
  const subs = st.hiddenSubscriberCount ? NaN : Number(st.subscriberCount)
  return { subs: Number.isFinite(subs) && subs > 0 ? subs : null, views }
}
