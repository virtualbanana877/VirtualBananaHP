/* ========== サイトの中身はここだけ編集すればOK ========== */

export const LINKS = {
  youtube: 'https://www.youtube.com/@VirtualBa7',
  tiktok: 'https://www.tiktok.com/@virtualba7',
  x: 'https://x.com/VirtualBa7',
  nico: 'https://www.nicovideo.jp/user/85528988',
  booth: 'https://virtualbanana.booth.pm/',
  fanicon: 'https://fanicon.net/fancommunities/3033',
  note: 'https://note.com/virtualba7',
  portfolio: 'https://www.foriio.com/virtualbanana/',
  arcade: 'https://virtualbanana877.github.io/VirtualBananaArcade/',
}

// 毎日投稿の開始日。ここから今日までの日数を「◯日目」として表示する
export const DAILY_START = '2023-02-25'

// 手入力の数字。更新したら STATS_AS_OF も変える
export const STATS_AS_OF = '2026年11月'
export const KEY_STATS = [
  { n: '300+', l: '声真似レパートリー' },
  { n: '1,300+', l: '毎日ショート投稿' },
  { n: '370万', l: 'YouTube総再生' },
]
export const REACH_STATS = [
  { n: '6,340', l: 'YouTube登録者' },
  { n: '370万', l: 'YouTube総再生' },
  { n: '4,610', l: 'TikTokフォロワー' },
  { n: '11,800', l: 'Xフォロワー' },
]

export const FEATURED = {
  id: '_4Xt-d4_Eec',
  title: '【2026年最新版】1分で分かる！バーチャルバナナ 自己紹介',
  date: '2026-09-13',
}

export const PLAYLISTS = [
  { t: '声真似講座', en: 'LESSON', u: 'https://www.youtube.com/playlist?list=PL3gFxXuE5n5-PvnewDowQEjVqiP4A9YY5' },
  { t: 'オリジナル曲', en: 'SONG', u: 'https://www.youtube.com/playlist?list=PL3gFxXuE5n59yglV73pzzHqhX0lLzI1vo' },
  { t: 'パロディ', en: 'PARODY', u: 'https://www.youtube.com/playlist?list=PL3gFxXuE5n5-pdZG9F5msX2iDPGbYEPEs' },
  { t: 'バナナアート', en: 'ART', u: 'https://www.youtube.com/playlist?list=PL3gFxXuE5n58jAKFwu13jQtDQ5MzE4AYv' },
]

// 動画タブの種類。tag がこれ以外の動画は「その他」に入る。rec:false で「おすすめ」から外れる
export const VIDEO_GENRES = ['パロディ', 'オリジナル曲', '講座']
export const VIDEOS = [
  { id: 'akBp5lKW7ho', tag: 'パロディ', date: '2021-03-19', title: 'ピンを抜くゲーム広告になってみた' },
  { id: 'xpB0ZNW6l3w', tag: 'オリジナル曲', date: '2020-11-10', title: 'バーチャルバナナのうた（Virtual banana song）' },
  { id: 'W8eW7kEE-LQ', tag: 'パロディ', date: '2020-10-30', title: '秘密がバレたときに持っておくと良いもの。（漫画広告パロディ）' },
  { id: 'N8p06Cq7fqs', tag: '講座', date: '2020-09-25', title: '自分を大蛇丸と信じて止まない一般男性の声真似講座で優勝する動画' },
  { id: 'PwBh4UhAnnU', tag: 'ピックアップ', date: '2020-09-11', title: '2分で分かる！3Dになったバーチャルバナナ 自己紹介（2020年版）' },
]

// TikTokで伸びた動画。views に "12万" のように入れると再生数を表示、note で一言追加
export const TIKTOK_HITS = [
  { url: 'https://www.tiktok.com/@virtualba7/video/7642997380358606101', date: '2026-05-23', views: null, note: '' },
  { url: 'https://www.tiktok.com/@virtualba7/video/7593501218035666197', date: '2026-01-10', views: null, note: '' },
  { url: 'https://www.tiktok.com/@virtualba7/video/7582886528498535701', date: '2025-12-12', views: null, note: '' },
]

// c(種別): 受賞 / 出演 / CM / メディア。s:1 は主な実績。l があれば日付の代わりに表示
export const ACHIEVEMENTS = [
  { d: '2026-08-29', s: 1, c: '受賞', t: 'メタコミアワード 2026「ショート動画コンテスト」受賞', u: 'https://metacomi.net/contests/award.html' },
  { d: '2025-03-08', s: 1, c: '受賞', t: 'BlitzMe 第40回 毎週賞レース 1位', u: 'https://x.com/BlitzMeOfficial/status/1898345722459906089' },
  { d: '2024-08-17', c: '出演', t: 'そらのうえショッピングモールミュージック夏フェス 出演', u: 'https://x.com/VirtualBa7/status/1822141255452606912' },
  { d: '2024-01-23', c: '出演', t: 'あつまれ！ばーちゃる！Vol.14 ゲームコーナー出演', u: 'https://live.nicovideo.jp/watch/lv343621239' },
  { d: '2023-12-12', c: '受賞', t: 'あつまればーちゃる祭 2023秋 動画投稿祭 スタッフイチオシ賞', u: 'https://live.nicovideo.jp/watch/lv343421323' },
  { d: '2023-10-29', s: 1, c: 'CM', t: '3D LIVE『東雲めぐのすーぱーはっぴーふりーだむ！』でCM放映', u: 'https://www.youtube.com/watch?v=PsNPq-pA9UQ' },
  { d: '2023-08-15', c: '出演', t: 'あつまれ！ばーちゃる！Vol.9 ゲームコーナー出演', u: 'https://live.nicovideo.jp/watch/lv341929390' },
  { d: '2023-06-24', c: 'CM', t: 'イベント中にCM放映', u: 'https://www.stream-ticket.com/events/detail/941.html' },
  { d: '2023-04-28', l: '2023.04.28–05.14', c: 'CM', t: 'イベント期間中にCM放映', u: 'https://x.com/gamebarGlueck/status/1635942457853739012' },
  { d: '2022-06-25', c: 'CM', t: 'インサイド「ちゃんずの家らじ！」でCM放映', u: 'https://www.youtube.com/watch?v=Y6LaziRBQcI' },
  { d: '2021-12-21', c: '出演', t: 'VTuberを発掘せよ3 出演', u: 'https://www.youtube.com/live/TvkQu-AUgeI' },
  { d: '2021-06-13', c: 'メディア', t: 'MoguraVR の週間VTuberまとめで紹介', u: 'https://www.moguravr.com/vtuber-weekly-21-6-2/' },
  { d: '2021-05-05', c: 'CM', t: 'ぽんぽこ24 Vol.5 でCM放映', u: 'https://www.youtube.com/live/UTiu6-_G9fE?t=6645' },
  { d: '2019-08-15', c: 'CM', t: 'ぽんぽこ24 Vol.3 でCM放映', u: 'https://www.youtube.com/live/HRO5Ntjf8RQ?t=21508' },
  { d: '2019-08-11', c: 'メディア', t: 'MoguraVR の週間VTuberまとめで紹介', u: 'https://www.moguravr.com/vtuber-weekly-19-8-2/' },
  { d: '2019-05-12', c: 'CM', t: 'CMが放映', u: 'https://x.com/VirtualBa7/status/1127484931288883200' },
  { d: '2018-12-02', c: 'メディア', t: 'VTuber Post で紹介', u: 'https://vtuber-post.com/news/1244' },
  { d: '2018-10-12', c: 'メディア', t: 'panora で紹介', u: 'https://panora.tokyo/76707/' },
]
export const ACH_TYPES = ['受賞', '出演', 'CM', 'メディア']

export const HISTORY = [
  { d: '2018.03', t: 'VTuberとして活動開始', b: '' },
  { d: '2023.02.25', t: '毎日ショート動画の投稿を開始', b: 'YouTubeとTikTokを合わせて、いまも続けています。24時間、毎時間動画を投稿する企画も実施しました。', daily: true },
  { d: '今', t: 'YouTube・TikTok・Xで投稿中', b: 'Webゲームやサイトの制作も手がけています。' },
]

// ok:true が「ご依頼OK」。link はカードから飛ぶ関連実績
export const SERVICES = [
  { t: 'バナナアート', b: 'バナナを題材にしたアート作品。', ok: true, link: { l: 'バナナアートの再生リスト', u: PLAYLISTS[3].u } },
  { t: '動画の企画・脚本・編集', b: '企画から編集まで。VTuberさん向けCM動画の制作実績があります（案件名は非公開）。', ok: true, link: { l: 'CM放映の実績', u: '/works' } },
  { t: 'Webゲーム制作', b: 'スマホで遊べるブラウザゲームを制作・公開しています。', ok: true, link: { l: 'ゲーム屋台で遊ぶ', u: LINKS.arcade } },
  { t: 'Webサイト・ツール制作', b: 'Webサイトや便利ツールを制作します。', ok: true, link: { l: 'ポートフォリオ', u: LINKS.portfolio } },
  { t: 'ボイス提供', b: 'SEやジングルなどのボイス収録、キャラクターボイスの制作。', ok: true, link: { l: 'ポートフォリオ', u: LINKS.portfolio } },
  { t: '声真似', b: '声真似を軸に動画を制作。講座動画も公開しています。' },
  { t: 'パロディ動画', b: 'パロディ動画を制作・投稿しています。' },
  { t: 'オリジナル曲', b: 'オリジナル曲を制作・公開しています。' },
]

export const CHARACTERS = [
  {
    key: 'banana',
    name: 'バーチャルバナナ',
    kana: 'ばーちゃるばなな',
    img: 'banana.png',
    full: 'hero.png',
    lead: '声真似とパロディ動画を投稿している、バナナの男の娘。',
    profile: [
      ['年齢', 'バナナだから8〜7歳'],
      ['身長', '138cm（可変）'],
      ['誕生日', '8月7日'],
      ['血液型', 'B型'],
      ['属性', '男の娘'],
      ['活動', '声真似・パロディ動画'],
    ],
    gallery: [
      { f: 'evolution.png', t: '進化（旧→新）', w: 1280, h: 720 },
      { f: 'sanmen.png', t: '三面図', w: 1600, h: 1207 },
      { f: 'model3d.png', t: '3Dモデル（正面）', w: 392, h: 1100 },
    ],
  },
  {
    key: 'kaoru',
    name: '芭蕉宮香',
    kana: 'ばしょうみや かおる',
    img: 'kaoru.png',
    full: 'kaoru.png',
    lead: 'バナナくんの相方として、たまに動画に出ます。',
    profile: [
      ['年齢', '20歳'],
      ['身長', '168cm'],
      ['立ち位置', 'バナナくんの相方'],
      ['活動', '自チャンネルでシチュエーションボイスも投稿'],
    ],
    gallery: [],
  },
]

// /links ページのボタン。i はアイコン名（components.jsx の Icon）、ink:true で黒いボタン
export const LINK_GROUPS = [
  {
    title: '動画を見る',
    links: [
      { t: 'YouTube', s: '声真似・パロディ・オリジナル曲', u: LINKS.youtube, i: 'youtube' },
      { t: 'TikTok', s: 'ショート動画を毎日投稿中', u: LINKS.tiktok, i: 'tiktok' },
      { t: 'ニコニコ動画', s: '', u: LINKS.nico, i: 'nico' },
    ],
  },
  {
    title: '遊ぶ・応援する',
    links: [
      { t: 'ゲーム屋台', s: 'スマホですぐ遊べるブラウザゲーム8本', u: LINKS.arcade, i: 'game' },
      { t: 'BOOTH', s: 'グッズ', u: LINKS.booth, i: 'bag' },
      { t: 'fanicon', s: 'ファンコミュニティ', u: LINKS.fanicon, i: 'heart' },
      { t: 'note', s: '', u: LINKS.note, i: 'pen' },
    ],
  },
  {
    title: 'お仕事のご相談',
    links: [
      { t: 'XのDMで相談する', s: '内容・納期・ご予算の目安を添えて', u: LINKS.x, i: 'x', ink: true },
      { t: 'ポートフォリオ', s: 'foriio', u: LINKS.portfolio, i: 'case' },
      { t: 'できること・実績', s: '公式サイト', u: '/services', i: 'home' },
    ],
  },
]

// 今日が毎日投稿の何日目か（開始日=1日目）
export function dailyDay(today = new Date(), start = DAILY_START) {
  const [y, m, d] = start.split('-').map(Number)
  const t = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.floor((t - Date.UTC(y, m - 1, d)) / 86400000) + 1
}

export const countBy = c => ACHIEVEMENTS.filter(a => a.c === c).length
