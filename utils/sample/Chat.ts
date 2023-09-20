import { chatId1, chatId2, chatId3, chatId4, chatId5, chatId6, writerId1, writerId2 } from "@/utils/sample/Sample";

export type Message = {
  from: string
  content: string
  date: string
  isRead: boolean
}

export type Chat = {
  id: string
  writerId: string
  reader: {
    displayName: string
    memo: string
  }
  messages: Message[]
}

/**
 * チャットのモックです
 *
 * 奇数は`writer1`,偶数は`writer2`のIDを指定しています
 */
export const chats: Chat[] = [
  // チャット1
  {
    id: chatId1,
    writerId: writerId1,
    reader: {
      displayName: "チャット1 様",
      memo: "静岡県磐田市在住",
    },
    messages: [
      {
        from: writerId1,
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
    writerId: writerId2,
    reader: {
      displayName: "チャット2 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: writerId1,
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
    id: chatId3,
    writerId: writerId1,
    reader: {
      displayName: "チャット3 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: writerId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
        isRead: true,
      }, {
        from: chatId3,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
        isRead: true,
      }
    ]
  },
  // チャット4
  {
    id: chatId4,
    writerId: writerId2,
    reader: {
      displayName: "チャット4 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: writerId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
        isRead: true,
      }, {
        from: chatId4,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
        isRead: true,
      }
    ]
  },
  // チャット5
  {
    id: chatId5,
    writerId: writerId1,
    reader: {
      displayName: "チャット5 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: writerId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
        isRead: true,
      }, {
        from: chatId5,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
        isRead: true,
      }
    ]
  },
  // チャット6
  {
    id: chatId6,
    writerId: writerId2,
    reader: {
      displayName: "チャット6 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: writerId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
        isRead: true,
      }, {
        from: chatId6,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
        isRead: true,
      }
    ]
  },
]