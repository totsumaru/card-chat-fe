import { Chat, chats } from "@/utils/sample/Chat";
import { currentHostId } from "@/utils/sample/Sample";
import { Host, hosts } from "@/utils/sample/Host";

/**
 * 全てのチャットを取得します
 */
export function GetChats(): Chat[] | undefined {
  return chats.filter(chat => chat.hostId === currentHostId)
}

/**
 * ログインしているホストを取得します
 */
export function GetLoginHost(): Host | undefined {
  return hosts.find(host => host.id === currentHostId)
}

/**
 * ライターIDでログインしているライターを取得します
 */
export function GetHost(hostId: string): Host | undefined {
  return hosts.find(host => host.id === hostId)
}

/**
 * Dashboard/[chatId]
 * 自分の管理するチャットのメタデータを取得します
 *
 * ログインしていない場合はエラーを返します
 */
export function GetChatMetadata(chatId: string): Chat | undefined {
  const chat = chats.find(chat => chat.id === chatId)
  if (chat?.hostId !== currentHostId) {
    throw new Error("ログインしてください")
  }

  return chat
}