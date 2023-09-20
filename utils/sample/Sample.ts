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
  writer: {
    id: writerId,
    name: "戸塚 翔太",
    displayName: "とっつー",
    avatarUrl: avatarUrl,
    company: {
      name: "株式会社ArGate",
      team: "営業部 営業第二課",
    },
    tel: "090-7685-1396",
    mailAddress: "techstart35@gmail.com",
    website: "https://argate.jp",
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
        }, {
          from: chatId1,
          content: "こちらこそありがとうございました。大変勉強になりました。\nところで、来週またお話を聞きたいんですが、よろしいでしょうか？",
          date: "2023-01-23 11:25",
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
        }, {
          from: chatId2,
          content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
          date: "2023-02-23 11:25",
        }
      ]
    },
  ],
}