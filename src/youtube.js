import { CHANNEL_ID } from './data.js'
import { firstVideoId, fromPlaylistItems } from './latest.js'

// APIキーは .env の VITE_YOUTUBE_API_KEY に入れる（.env.example を参照）。ビルド時に埋め込まれるため、
// Google Cloud 側で「HTTPリファラー制限（https://virtual-banana.com/*）」と「YouTube Data API v3 のみ」の制限を必ずかけること。
const KEY = import.meta.env.VITE_YOUTUBE_API_KEY

/** 最新の動画を count 件（アップロード一覧の新しい順）。キー未設定なら null、失敗したら例外 */
export async function fetchLatest(count, signal) {
  if (!KEY) return null
  const uploads = 'UU' + CHANNEL_ID.slice(2)   // チャンネルID(UC...)から「アップロード」再生リストID(UU...)
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=${count}&playlistId=${uploads}&key=${encodeURIComponent(KEY)}`
  const res = await fetch(url, { signal })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  if (json.error) throw new Error(json.error.message || 'API error')
  const list = fromPlaylistItems(json, count)
  if (!list.length) throw new Error('動画が見つかりません')
  return list
}

/** 各再生リストの最初の動画ID → { [再生リストID]: 動画ID }。取れなかったものは含めない。キー未設定なら null */
export async function fetchFirstVideos(playlistIds, signal) {
  if (!KEY) return null
  const out = {}
  await Promise.all(playlistIds.map(async id => {
    try {
      const res = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=3&playlistId=${encodeURIComponent(id)}&key=${encodeURIComponent(KEY)}`, { signal })
      if (!res.ok) return
      const v = firstVideoId(await res.json())
      if (v) out[id] = v
    } catch { /* 1つ失敗しても他は表示する */ }
  }))
  return out
}
