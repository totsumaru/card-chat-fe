// host
export const hostId1 = "8673bf66-ad61-445a-bf97-5b13142ecbbf"
export const hostId2 = "e90b644e-0caf-4c3a-9a25-64e122f8a57b"
// chat
export const chatId1 = "cd746a35-1360-403a-a747-98e5f1a9fa2f"
export const chatId2 = "fd587bc8-a7f2-4d60-91fb-b81e2daea7a0"
export const chatId3 = "1cd34cbb-735e-49aa-ad99-e8868e5751a0"
export const chatId4 = "8cac2d27-5b43-4900-83e3-71fd20ac27f7"
export const chatId5 = "e700eb4a-f86a-4d3a-bbe4-4599efccf7b7"
export const chatId6 = "b380967b-dbad-4be1-b1ec-701643b40064"
// url
export const avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

/**
 * 現在ログインしているホストIDです
 *
 * ここを変更すると、ログインしているユーザーが変わります。
 * 空の値("")とすると、ログインしていない状態となります。
 */
export const currentHostId = hostId1

/**
 * TODO: ここは削除する
 */
export const SampleData = {
  currentHostID: hostId1, // 今ログインしているIDです
  host: {
    id: hostId1,
    name: "戸塚 翔太",
    avatarUrl: avatarUrl,
    headline: "ナンバーワンよりオンリーワンを目指します",
    introduction: "はじめまして。株式会社びずまっぷすの営業担当、佐藤次郎です。ありきたりな名前の私ですが、座右の銘は「ナンバーワンよりオンリーワンをめざせ」です！営業はどの業界でも成績が重要視される傾向にありますが、私はお客様の本当の幸せを提供するために、オンリーワンの営業活動をモットーとしております。お客様の相談役として精一杯サポートいたしますので、ご相談やご要望など、遠慮なくお申しつけください！",
    company: {
      name: "株式会社ArGate",
      position: "営業部 営業第二課",
      tel: "090-7685-1396",
      email: "techstart35@gmail.com",
      website: "https://argate.jp",
    },
  },
  host2: {
    id: hostId2,
    name: "斎藤佑樹",
    avatarUrl: "",
    headline: "ライター2です",
    introduction: "はじめまして。ライター2です",
    company: {
      name: "遠州鉄道 株式会社",
      position: "計画課",
      tel: "053-455-2255",
      email: "totsuka.ast@entetsu.co.jp",
      website: "https://entetsu.jp",
    },
  },
  chat: [
    // 奇数はhost1,偶数はhost2のIDを指定しています
    // チャット1
    {
      id: chatId1,
      hostId: hostId1,
      reader: {
        displayName: "鈴木様",
        memo: "静岡県磐田市在住",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はありがとうございました！\nいつでも気軽にご連絡ください。",
          date: "2023-01-23 11:23",
          isRead: true,
        }, {
          from: chatId1,
          content: "こちらこそありがとうございました。大変勉強になりました。\nところで、来週またお話を聞きたいんですが、よろしいでしょうか？",
          date: "2023-01-23 11:25",
          isRead: false,
        }
      ]
    },
    // チャット2
    {
      id: chatId2,
      hostId: hostId2,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
          date: "2023-02-23 11:23",
          isRead: true,
        }, {
          from: chatId2,
          content: "aaa",
          date: "2023-02-23 11:25",
          isRead: true,
        }
      ]
    },
    // チャット3
    {
      id: chatId2,
      hostId: hostId1,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
          date: "2023-02-23 11:23",
          isRead: true,
        }, {
          from: chatId2,
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          date: "2023-02-23 11:25",
          isRead: true,
        }
      ]
    },
    // チャット4
    {
      id: chatId2,
      hostId: hostId2,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
          date: "2023-02-23 11:23",
          isRead: true,
        }, {
          from: chatId2,
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          date: "2023-02-23 11:25",
          isRead: true,
        }
      ]
    },
    // チャット5
    {
      id: chatId2,
      hostId: hostId1,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
          date: "2023-02-23 11:23",
          isRead: true,
        }, {
          from: chatId2,
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          date: "2023-02-23 11:25",
          isRead: true,
        }
      ]
    },
    // チャット6
    {
      id: chatId2,
      hostId: hostId2,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: hostId1,
          content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
          date: "2023-02-23 11:23",
          isRead: true,
        }, {
          from: chatId2,
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          date: "2023-02-23 11:25",
          isRead: true,
        }
      ]
    },
  ],
}