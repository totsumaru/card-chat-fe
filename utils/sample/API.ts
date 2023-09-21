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
 * IDでホストを取得します
 */
export function GetHost(hostId: string): Host | undefined {
  return hosts.find(host => host.id === hostId)
}

/**
 * 自分の管理するチャットの情報を取得します
 *
 * ログインしていない/パスコードが異なる場合はエラーを返します
 */
export function GetChatInfo(chatId: string, passcode?: string): Chat | undefined {
  const chat = chats.find(chat => chat.id === chatId)

  if (chat?.hostId === currentHostId || passcode === chat?.passcode) {
    return chat
  }

  throw new Error("ログインしてください")
}