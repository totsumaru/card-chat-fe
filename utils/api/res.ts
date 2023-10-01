// チャットのレスポンスです

export type Chat = {
  id: string
  passcode: string
  hostId: string
  guest: {
    displayName: string
    memo: string
    email: string
  }
  isRead: boolean
  lastMessage: Date
}

// メッセージのレスポンスです
export type Message = {
  id: string
  chatId: string
  fromId: string
  content: string
  created?: Date
}

// ホストのレスポンスです
export type Host = {
  id: string
  name: string
  avatarUrl: string
  headline: string
  introduction: string
  company: {
    name: string
    position: string
    tel: string
    email: string
    website: string
  }
}

// バックエンドのレスポンスをチャットのレスポンスに変換します
export const castToChatRes = (chat: any): Chat => {
  return {
    id: chat.id,
    passcode: chat.passcode,
    hostId: chat.host_id,
    guest: {
      displayName: chat.guest.display_name,
      memo: chat.guest.memo,
      email: chat.guest.email,
    },
    isRead: chat.is_read,
    lastMessage: chat.last_message,
  }
}

// バックエンドのレスポンスをメッセージのレスポンスに変換します
export const castToMessageRes = (message: any): Message => {
  return {
    id: message.id,
    chatId: message.chat_id,
    fromId: message.from_id,
    content: message.content,
    created: new Date(message.created),
  }
}

// バックエンドのレスポンスをメッセージのレスポンスに変換します
//
// 複数ver
export const castToMessagesRes = (messages: any[]): Message[] => {
  return messages.map(message => {
    const newMessage: Message = {
      id: message.id,
      chatId: message.chat_id,
      fromId: message.from_id,
      content: message.content,
      created: new Date(message.created),
    };
    return newMessage;
  });
}

// バックエンドのレスポンスをホストのレスポンスに変換します
export const castToHost = (host: any): Host => {
  return {
    id: host.id,
    name: host.name,
    avatarUrl: host.avatar_url,
    headline: host.headline,
    introduction: host.introduction,
    company: {
      name: host.company.name,
      position: host.company.position,
      tel: host.company.tel,
      email: host.company.email,
      website: host.company.website,
    }
  }
}