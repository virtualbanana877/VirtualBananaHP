import test from 'node:test'
import assert from 'node:assert/strict'
import { parseRss, rssUrl } from '../scripts/rss.mjs'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom">
  <title>バーチャルバナナ</title>
  <entry>
    <id>yt:video:AAAAAAAAAAA</id>
    <yt:videoId>AAAAAAAAAAA</yt:videoId>
    <title>声真似 &amp; パロディ &quot;テスト&quot; &#39;1&#39;</title>
    <published>2026-11-24T16:00:00+00:00</published>
  </entry>
  <entry>
    <yt:videoId>BBBBBBBBBBB</yt:videoId>
    <title>二本目</title>
    <published>2026-11-23T03:00:00+00:00</published>
  </entry>
</feed>`

test('RSSを [{id,title,date}] に直す（実体参照を戻し、日付は日本時間）', () => {
  assert.deepEqual(parseRss(xml), [
    { id: 'AAAAAAAAAAA', title: '声真似 & パロディ "テスト" \'1\'', date: '2026-11-25' },
    { id: 'BBBBBBBBBBB', title: '二本目', date: '2026-11-23' },
  ])
})
test('チャンネル名の<title>は動画に混ざらない・件数制限・空でも落ちない', () => {
  assert.equal(parseRss(xml).length, 2)
  assert.equal(parseRss(xml, 1).length, 1)
  assert.deepEqual(parseRss('<feed></feed>'), [])
})
test('RSSのURL', () => {
  assert.equal(rssUrl('UCxxxx'), 'https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxx')
})
