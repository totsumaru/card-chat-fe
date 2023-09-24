import { Chat, chatsDB } from "@/utils/sample/Chat";
import { User, usersDB } from "@/utils/sample/User";
import { TestSession } from "@/utils/sample/Sample";
import { sleep } from "@/utils/sample/sleep";

type Res = {
  chat: Chat
  host: User
}

/**
 * チャットを開始します
 */
export const PostStartChat = async (
  chatId: string,
  session: TestSession,
  displayName: string,
  passcode: string,
): Promise<Res> => {
  return await backend(chatId, session, displayName, passcode)
}

// バックエンドの処理です
const backend = async (
  chatId: string,
  session: TestSession,
  displayName: string,
  passcode: string,
): Promise<Res> => {
  await sleep()

  // チャットを取得
  const chat = chatsDB.find(chat => chat.id === chatId)
  if (!chat) {
    throw new Error("チャットを取得できません")
  }

  // ホストIDが設定されていないことを確認
  if (chat.hostId) {
    throw new Error("ホストIDがすでに設定されています")
  }

  if (chat.passcode !== passcode) {
    throw new Error("パスコードが一致しません")
  }

  // ホストIDに自分のuserIdを設定します
  // ※実装は省略

  // ホストを取得
  const host = usersDB.find(host => host.id === session.id)
  if (!host) {
    throw new Error("ホストを取得できません")
  }

  // 表示名を設定します

  return {
    chat: chat,
    host: host,
  }
}