// ビルド前に YouTube の RSS から最新動画を取り、src/latest.snapshot.json に保存する（npm run build の前に自動で動く）
// 取れなかった（通信失敗など）ときはビルドを止めず、前回のファイルをそのまま使う。
// このファイルは「APIキーなし／API失敗のときの予備」。最新20件はブラウザが YouTube Data API から直接取る（src/youtube.js）。
import { existsSync, writeFileSync } from 'node:fs'
import { CHANNEL_ID } from '../src/data.js'
import { parseRss, rssUrl } from './rss.mjs'

const file = new URL('../src/latest.snapshot.json', import.meta.url)
try {
  const res = await fetch(rssUrl(CHANNEL_ID), { signal: AbortSignal.timeout(10000) })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const list = parseRss(await res.text(), 20)
  if (!list.length) throw new Error('動画が見つかりません')
  writeFileSync(file, JSON.stringify(list, null, 2) + '\n')
  console.log(`[latest] ${list.length}件を保存しました`)
} catch (e) {
  console.warn(`[latest] 更新をスキップしました（前回のデータを使います）: ${e.message}`)
  if (!existsSync(file)) writeFileSync(file, '[]\n')
}
