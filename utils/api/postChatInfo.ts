// バックエンドの処理です
import { TestSession } from "@/utils/sample/Sample";
import { chatsDB } from "@/utils/sample/Chat";
import { sleep } from "@/utils/sample/sleep";

/**
 * チャットの情報を変更します
 */
export const PostChatInfo = async (
  session: TestSession,
  chatId: string,
  displayName: string,
  memo: string,
) => {
  await backend(session, chatId, displayName, memo)
}

// バックエンドの処理です
const backend = async (
  session: TestSession,
  chatId: string,
  displayName: string,
  memo: string,
) => {
  // ログインしているか
  if (!session.id) {
    throw new Error("ログインしていません")
  }
  // そのチャットのホストか
  const chat = chatsDB.find(chat => chat.id === chatId)
  if (session.id !== chat?.hostId) {
    throw new Error("ホストではありません")
  }

  // テスト用にsleep処理を入れる
  await sleep()
}