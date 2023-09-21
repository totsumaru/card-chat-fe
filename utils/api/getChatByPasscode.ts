import { Chat, chatsDB } from "@/utils/sample/Chat";

/**
 * パスコードでチャットを取得します
 */
export const getChatByPasscode = async (
  chatId: string,
  passcode: string
): Promise<Chat | undefined> => {
  const res = await backend(chatId, passcode)
  return res
}

// バックエンドの処理です
export const backend = async (
  chatId: string,
  passcode: string
): Promise<Chat | undefined> => {
  const chat = chatsDB.find(chat => chat.id === chatId)

  if (chat?.passcode !== passcode) {
    throw new Error("パスコードが異なります")
  }

  return chat
}
