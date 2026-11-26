// YouTube の RSS（チャンネルの新着フィード。最大15件）を [{ id, title, date }] に直す
import { jstDate } from '../src/latest.js'

export const rssUrl = channelId => `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }
const decode = s => s.replace(/&(?:#x([0-9a-f]+)|#(\d+)|(amp|lt|gt|quot|apos));/gi, (m, hex, dec, name) =>
  name ? NAMED[name.toLowerCase()] : String.fromCodePoint(hex ? parseInt(hex, 16) : Number(dec)))

export function parseRss(xml, limit = 20) {
  const out = []
  for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = (/<yt:videoId>([^<]+)<\/yt:videoId>/.exec(m[1]) || [])[1]
    const title = (/<title>([\s\S]*?)<\/title>/.exec(m[1]) || [])[1]
    const date = jstDate((/<published>([^<]+)<\/published>/.exec(m[1]) || [])[1])
    if (id && title && date) out.push({ id, title: decode(title).trim(), date })
  }
  return out.slice(0, limit)
}
