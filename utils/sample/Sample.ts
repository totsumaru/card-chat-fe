const writerId = "8673bf66-ad61-445a-bf97-5b13142ecbbf"
const chatId1 = "cd746a35-1360-403a-a747-98e5f1a9fa2f"
const chatId2 = "cd746a35-1360-403a-a747-98e5f1a9fa2f"
const avatarUrl = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

/**
 * サンプルデータです
 *
 * ここの値を変更することで、状態の変化を確認します。
 */
export const SampleData = {
  isLogin: true,
  writer: {
    id: writerId,
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
  chat: [
    // チャット1
    {
      id: chatId1,
      writerId: writerId,
      reader: {
        displayName: "鈴木様",
        memo: "静岡県磐田市在住",
      },
      messages: [
        {
          from: writerId,
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
      writerId: writerId,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: writerId,
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
      writerId: writerId,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: writerId,
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
      writerId: writerId,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: writerId,
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
      writerId: writerId,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: writerId,
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
      writerId: writerId,
      reader: {
        displayName: "さいとう様",
        memo: "本日お伺い済み",
      },
      messages: [
        {
          from: writerId,
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