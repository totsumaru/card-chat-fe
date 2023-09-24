import { chatsDB } from "@/utils/sample/Chat";
import { sleep } from "@/utils/sample/sleep";

/**
 * 通知用のEmailアドレスを登録/更新します
 */
export const PostNoticeEmail = async (chatId: string, email: string) => {
  await backend(chatId, email)
}

// バックエンドの処理です
const backend = async (chatId: string, email: string) => {
  const chat = chatsDB.find(chat => chat.id === chatId)
  if (!chat) {
    throw new Error("チャットが取得できません")
  }

  // 処理を実行
  await sleep()
}