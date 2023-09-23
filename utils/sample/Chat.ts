import {
  chatId1,
  chatId2,
  chatId3,
  chatId4,
  chatId5,
  chatId6,
  email1,
  email2,
  userId1,
  userId2
} from "@/utils/sample/Sample";

export type ChatInfo = {
  id: string
  passcode: string
  hostId: string
  guest: {
    displayName: string
    memo: string
    noticeEmail: string
  }
  isRead: boolean
}

export type Message = {
  from: string
  content: string
  date?: string
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
    hostId: userId1,
    guest: {
      displayName: "チャット1 様",
      memo: "静岡県磐田市在住",
      noticeEmail: email1,
    },
    isRead: false,
    messages: [
      {
        from: userId1,
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
    passcode: "123456",
    hostId: userId2,
    guest: {
      displayName: "あいうえおかきくけこさしすせそたちつてと",
      memo: "本日お伺い済み",
      noticeEmail: email2,
    },
    isRead: true,
    messages: [
      {
        from: userId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
      }, {
        from: chatId2,
        content: "aaa",
        date: "2023-02-23 11:25",
      }
    ]
  },
  // チャット3
  // * 初期状態です
  {
    id: chatId3,
    passcode: "345678",
    hostId: "",
    guest: {
      displayName: "",
      memo: "",
      noticeEmail: "",
    },
    isRead: false,
    messages: []
  },
  // チャット4
  {
    id: chatId4,
    passcode: "456789",
    hostId: userId2,
    guest: {
      displayName: "",
      memo: "本日お伺い済み",
      noticeEmail: email2,
    },
    isRead: true,
    messages: [
      {
        from: userId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
      }, {
        from: chatId4,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
      }
    ]
  },
  // チャット5
  {
    id: chatId5,
    passcode: "567890",
    hostId: userId1,
    guest: {
      displayName: "チャット5 様",
      memo: "本日お伺い済み",
      noticeEmail: email1,
    },
    isRead: true,
    messages: [
      {
        from: userId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
      }, {
        from: chatId5,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
      }
    ]
  },
  // チャット6
  {
    id: chatId6,
    passcode: "678901",
    hostId: userId2,
    guest: {
      displayName: "チャット6 様",
      memo: "本日お伺い済み",
      noticeEmail: email2,
    },
    isRead: true,
    messages: [
      {
        from: userId1,
        content: "今日はお忙しい中お時間をいただきありがとうございました。またよろしくお願いします。",
        date: "2023-02-23 11:23",
      }, {
        from: chatId6,
        content: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れ",
        date: "2023-02-23 11:25",
      }
    ]
  },
]
