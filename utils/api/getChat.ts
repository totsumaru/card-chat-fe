import { Chat, chatsDB } from "@/utils/sample/Chat";
import { passcodeFromCookie, TestSession } from "@/utils/sample/Sample";
import { User, usersDB } from "@/utils/sample/User";

// レスポンスです
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
  session?: TestSession
): Promise<Res> => {
  const res = await backend(chatId, session)

  return res
}

// バックエンドの処理です
const backend = async (
  chatId: string,
  session?: TestSession,
): Promise<Res> => {
  // セッションがなく、cookieのパスコードもない場合はエラーを返します
  if (!session && !passcodeFromCookie) {
    throw new Error("ログインしてください")
  }

  // チャットを取得します
  const chat = chatsDB.find(chat => chat.id === chatId)
  if (!chat) {
    throw new Error("チャットが取得できません")
  }

  // ホストでもなく、パスコードも一致しない場合はエラーを返します
  if (chat.hostId !== session?.id && chat.passcode !== passcodeFromCookie) {
    throw new Error("このチャットを閲覧できません")
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