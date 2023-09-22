import { Chat, chatsDB } from "@/utils/sample/Chat";
import { TestSession } from "@/utils/sample/Sample";
import { User, usersDB } from "@/utils/sample/User";

type Res = {
  chat: Chat
  host: User
}

/**
 * チャットを取得します
 *
 * 自分がホストとなっていない場合はエラーを返します。
 */
export const GetChat = async (
  chatId: string,
  session: TestSession
): Promise<Res> => {
  const res = await backend(chatId, session)

  return res
}

// バックエンドの処理です
const backend = async (
  chatId: string,
  session: TestSession,
): Promise<Res> => {
  if (!session.id) {
    throw new Error("ログインしてください")
  }

  const chat = chatsDB.find(chat => chat.id === chatId)
  if (!chat) {
    throw new Error("チャットが取得できません")
  }

  if (chat?.hostId !== session.id) {
    throw new Error("このチャットのホストではありません")
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