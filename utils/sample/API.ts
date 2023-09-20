import { Chat, chats } from "@/utils/sample/Chat";
import { currentWriterId } from "@/utils/sample/Sample";
import { Writer, writers } from "@/utils/sample/Writer";

/**
 * 全てのチャットを取得します
 */
export function GetChats(): Chat[] | undefined {
  return chats.filter(chat => chat.writerId === currentWriterId)
}

/**
 * ログインしているライターを取得します
 */
export function GetLoginWriter(): Writer | undefined {
  return writers.find(writer => writer.id === currentWriterId)
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