import { CHANNEL_ID } from './data.js'
import { firstVideoId, fromPlaylistItems, fromVideos } from './latest.js'

// APIキーは .env の VITE_YOUTUBE_API_KEY に入れる（.env.example を参照）。Cloudflare Pages では「ビルド時の環境変数」に同じ名前で設定する。
// ビルド時に埋め込まれるため、Google Cloud 側で「HTTPリファラー制限（https://virtual-banana.com/*）」と「YouTube Data API v3 のみ」の制限を必ずかけること。
const KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const API = 'https://www.googleapis.com/youtube/v3'

// 原因をブラウザのConsoleで確認できるよう、同じ警告は1回だけ出す
const warned = new Set()
const warnOnce = (k, ...a) => { if (!warned.has(k)) { warned.add(k); console.warn(...a) } }
const noKey = () => {
  warnOnce('nokey', '[YouTube] APIキーがありません。ビルド時の環境変数 VITE_YOUTUBE_API_KEY を設定して、もう一度デプロイしてください（予備データを表示します）')
  return null
}

// Googleの返事から原因を取り出す。例: 「HTTP 403: forbidden / API_KEY_HTTP_REFERRER_BLOCKED / Requests from referer ... are blocked.」
async function failure(res) {
  let detail = ''
  try {
    const e = (await res.json()).error || {}
    detail = [e.errors && e.errors[0] && e.errors[0].reason, e.details && e.details[0] && e.details[0].reason, e.message].filter(Boolean).join(' / ')
  } catch { /* 返事が読めなくてもステータスは出す */ }
  return new Error(`HTTP ${res.status}${detail ? ': ' + detail : ''}`)
}

/** 最新の動画を count 件（アップロード一覧の新しい順）。キー未設定なら null、失敗したら例外 */
export async function fetchLatest(count, signal) {
  if (!KEY) return noKey()
  const uploads = 'UU' + CHANNEL_ID.slice(2)   // チャンネルID(UC...)から「アップロード」再生リストID(UU...)
  const res = await fetch(`${API}/playlistItems?part=snippet,contentDetails&maxResults=${count}&playlistId=${uploads}&key=${encodeURIComponent(KEY)}`, { signal })
  if (!res.ok) throw await failure(res)
  const json = await res.json()
  if (json.error) throw new Error(json.error.message || 'API error')
  const list = fromPlaylistItems(json, count)
  if (!list.length) throw new Error('動画が見つかりません')
  return list
}

/** 各再生リストの最初の動画ID → { [再生リストID]: 動画ID }。取れなかったものは含めない。キー未設定なら null */
export async function fetchFirstVideos(playlistIds, signal) {
  if (!KEY) return noKey()
  const out = {}
  await Promise.all(playlistIds.map(async id => {
    try {
      const res = await fetch(`${API}/playlistItems?part=snippet,contentDetails&maxResults=3&playlistId=${encodeURIComponent(id)}&key=${encodeURIComponent(KEY)}`, { signal })
      if (!res.ok) { warnOnce('pl' + res.status, '[YouTube] 再生リストのサムネイルを取得できませんでした:', (await failure(res)).message); return }
      const v = firstVideoId(await res.json())
      if (v) out[id] = v
    } catch { /* 1つ失敗しても他は表示する */ }
  }))
  return out
}

/** 動画IDのリスト（最大50本）→ { [動画ID]: { title, date } }。キー未設定なら null、失敗したら例外 */
export async function fetchVideoInfo(ids, signal) {
  if (!KEY) return noKey()
  const res = await fetch(`${API}/videos?part=snippet&maxResults=50&id=${ids.map(encodeURIComponent).join(',')}&key=${encodeURIComponent(KEY)}`, { signal })
  if (!res.ok) throw await failure(res)
  const json = await res.json()
  if (json.error) throw new Error(json.error.message || 'API error')
  return fromVideos(json)
}
