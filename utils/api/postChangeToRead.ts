import { TestSession } from "@/utils/sample/Sample";
import { chatsDB } from "@/utils/sample/Chat";

/**
 * チャットを既読にします
 *
 * この処理はasync/awaitで待機する必要はありません。
 * 非同期で実行します。
 */
export const PostChangeToRead = (session: TestSession, chatId: string) => {
  if (!session.id) {
    throw new Error("ログインしていません")
  }

  const chat = chatsDB.find(chat => chat.hostId === session.id)
  if (!chat) {
    throw new Error("チャットが取得できません")
  }

  backend()
}

// バックエンドの処理です
const backend = () => {
  // ここは何も処理をする必要はありません。
  // 実際には、既読処理を行います。
}