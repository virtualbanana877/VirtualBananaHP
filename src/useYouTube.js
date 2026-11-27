import { useEffect, useState } from 'react'
import { LATEST_COUNT, PLAYLISTS, VIDEO_SERIES, playlistId } from './data.js'
import snapshot from './latest.snapshot.json'
import { fetchFirstVideos, fetchLatest, fetchVideoInfo } from './youtube.js'

// どちらもページを開いてから1回だけ取得して共有する（トップ→動画一覧に移動しても取り直さない）
function shared(initial, run) {
  let state = initial
  let started = false
  const listeners = new Set()
  const set = next => { state = next; listeners.forEach(f => f(state)) }
  return function useShared() {
    const [s, setS] = useState(state)
    useEffect(() => {
      listeners.add(setS)
      setS(state)
      if (!started) { started = true; run(set) }
      return () => { listeners.delete(setS) }
    }, [])
    return s
  }
}

const timeout = () => (typeof AbortSignal !== 'undefined' && AbortSignal.timeout ? AbortSignal.timeout(8000) : undefined)

/** 最新動画: { items, status }  status = loading | live | failed。items は最初はビルド時のRSS（予備）、APIで取れたら置き換わる */
export const useLatest = shared({ items: snapshot.slice(0, LATEST_COUNT), status: 'loading' }, set => {
  fetchLatest(LATEST_COUNT, timeout())
    .then(items => set(items ? { items, status: 'live' } : { items: snapshot.slice(0, LATEST_COUNT), status: 'failed' }))
    .catch(e => { console.warn('YouTubeの最新動画を取得できませんでした:', e); set({ items: snapshot.slice(0, LATEST_COUNT), status: 'failed' }) })
})

/** 再生リストごとの最初の動画ID: { [再生リストID]: 動画ID } */
export const usePlaylistFirst = shared({}, set => {
  fetchFirstVideos(PLAYLISTS.map(p => playlistId(p.u)), timeout())
    .then(map => { if (map) set(map) })
    .catch(e => console.warn('再生リストのサムネイルを取得できませんでした:', e))
})

/** おすすめ動画（シリーズ別）の題名・日付: { [動画ID]: { title, date } } */
export const useVideoInfo = shared({}, set => {
  fetchVideoInfo(VIDEO_SERIES.flatMap(s => s.ids), timeout())
    .then(map => { if (map) set(map) })
    .catch(e => console.warn('動画の情報を取得できませんでした:', e))
})
