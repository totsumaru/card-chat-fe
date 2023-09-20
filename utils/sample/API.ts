import { Chat, chats } from "@/utils/sample/Chat";
import { currentWriterId } from "@/utils/sample/Sample";

/**
 * Dashboard
 * 全てのチャットを取得します
 */
export function GetDashboard(): Chat[] | undefined {
  return chats.filter(chat => chat.writerId === currentWriterId)
}

/**
 * Dashboard/[chatId]
 * 自分の管理するチャットのメタデータを取得します
 *
 * ログインしていない場合はエラーを返します
 */
export function GetChatMetadata(chatId: string): Chat | undefined {
  const chat = chats.find(chat => chat.id === chatId)
  if (chat?.writerId !== currentWriterId) {
    throw new Error("ログインしてください")
  }

  return chat
}