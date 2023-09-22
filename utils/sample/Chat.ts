import { chatId1, chatId2, chatId3, chatId4, chatId5, chatId6, hostId1, hostId2 } from "@/utils/sample/Sample";

export type ChatInfo = {
  id: string
  passcode: string
  hostId: string
  guest: {
    displayName: string
    memo: string
  }
}

export type Message = {
  from: string
  content: string
  date: string
  isRead: boolean
}

export type Chat = ChatInfo & {
  messages: Message[]
}

/**
 * チャットのDBモックです
 *
 * 奇数は`host1`,偶数は`host2`のIDを指定しています
 */
export const chatsDB: Chat[] = [
  // チャット1
  {
    id: chatId1,
    passcode: "123456",
    hostId: hostId1,
    guest: {
      displayName: "チャット1 様",
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
    passcode: "123456",
    hostId: hostId2,
    guest: {
      displayName: "チャット2 様",
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
    id: chatId3,
    passcode: "345678",
    hostId: hostId1,
    guest: {
      displayName: "チャット3 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: hostId1,
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
    passcode: "456789",
    hostId: hostId2,
    guest: {
      displayName: "チャット4 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: hostId1,
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
    passcode: "567890",
    hostId: hostId1,
    guest: {
      displayName: "チャット5 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: hostId1,
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
    passcode: "678901",
    hostId: hostId2,
    guest: {
      displayName: "チャット6 様",
      memo: "本日お伺い済み",
    },
    messages: [
      {
        from: hostId1,
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
