import { castToChatRes, castToHost, castToMessagesRes, Chat, Host, Message } from "@/utils/api/res";
import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

type Res = {
  chat: Chat
  messages: Message[]
  host: Host
}

/**
 * パスコードでチャットを取得します
 */
export const GetChatByPasscode = async (
  chatId: string,
  passcode: string
): Promise<Res> => {
  const { data } = await axios.get(
    Endpoint(`/api/chat/${chatId}/passcode`), {
      headers: createHeader({ passcode: passcode }),
      withCredentials: true, // ここをtrueにしないとcookieがsetされない
    }
  );

  const chatRes: Chat = castToChatRes(data.chat)
  const messageRes: Message[] = castToMessagesRes(data.messages)
  const hostRes: Host = castToHost(data.host)

  return {
    chat: chatRes,
    messages: messageRes,
    host: hostRes
  }
}