import { Chat, chatsDB } from "@/utils/sample/Chat";
import { User, usersDB } from "@/utils/sample/User";

type Res = {
  chat: Chat
  host: User
}

/**
 * パスコードでチャットを取得します
 */
export const GetChatByPasscode = async (
  chatId: string,
  passcode: string
): Promise<Res> => {
  const res = await backend(chatId, passcode)
  return res
}

// バックエンドの処理です
export const backend = async (
  chatId: string,
  passcode: string
): Promise<Res> => {
  const chat = chatsDB.find(chat => chat.id === chatId)
  if (chat?.passcode !== passcode) {
    throw new Error("パスコードが異なります")
  }

  const host = usersDB.find(user => user.id === chat?.hostId)
  if (!host) {
    throw new Error("ホストが取得できません")
  }

  return {
    chat: chat,
    host: {
      id: host?.id || "",
      name: host?.name || "",
      avatarUrl: host?.avatarUrl || "",
      headline: host?.headline || "",
      introduction: host?.introduction || "",
      company: {
        name: host?.company.name || "",
        position: host?.company.position || "",
        tel: host?.company.tel || "",
        email: host?.company.email || "",
        website: host?.company.website || "",
      },
    }
  }
}
