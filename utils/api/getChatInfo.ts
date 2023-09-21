import { Chat, chatsDB } from "@/utils/sample/Chat";
import { TestSession } from "@/utils/sample/Sample";

/**
 * 自分がホストとなっているチャットの情報を取得します
 *
 * ログインしていない場合はエラーを返します。
 */
export const GetChatInfo = async (
  chatId: string,
  session: TestSession
): Promise<Chat | undefined> => {
  const res = await backend(chatId, session)

  return res
}

// バックエンドの処理です
const backend = async (
  chatID: string,
  session: TestSession,
): Promise<Chat | undefined> => {
  if (!session.id) {
    throw new Error("ログインしてください")
  }

  const chat = chatsDB.find(chat => chat.id === session.id)

  if (chat?.hostId !== session.id) {
    throw new Error("このチャットのホストではありません")
  }

  return chat
}