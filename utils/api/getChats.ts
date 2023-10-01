import { castToChatRes, castToHost, castToMessageRes, Chat, Host, Message } from "@/utils/api/res";
import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

// レスポンスです
type Res = {
  host: Host
  chats: ChatRes[]
}

// チャットのレスポンスです
type ChatRes = {
  chat: Chat
  lastMessage: Message
}

/**
 * ログインしているユーザーの全てのチャットを取得します
 *
 * Memo: 現状は全て取得しますが、いずれlimit/offsetで指定できるようにします。
 */
export default async function GetChats(
  token: string,
): Promise<Res> {
  const { data } = await axios.post(
    Endpoint(`/api/chats`), {}, {
      headers: createHeader({ token: token }),
    }
  );

  const hostRes: Host = castToHost(data.host)
  const chatsRes = data.chats.map((beChatRes: any) => {
    return {
      chat: castToChatRes(beChatRes.chat),
      lastMessage: castToMessageRes(beChatRes.last_message),
    }
  })

  return {
    host: hostRes,
    chats: chatsRes,
  }
}