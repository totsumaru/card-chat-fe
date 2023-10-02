import { castToChatRes, castToHost, castToMessagesRes, Chat, Host, Message } from "@/utils/api/res";
import axios from "axios";
import { createHeader, Endpoint } from "@/utils/api/api";

/**
 * チャットを取得した時のステータスです
 * バックエンドから送信されます。
 *
 * @host チャットが開始されていて、自分がホストで参加済みの状態である
 * -> Modalを開かずチャット可能
 *
 * @guest チャットが開始されていて、自分がゲストで参加済みの状態である
 * -> Modalを開かずチャット可能
 *
 * @first-not-login チャットが開始されておらず、自分もログインしていない
 * -> ログインを促すModalがOpen
 *
 * @first-is-login チャットが開始されていないが、ログイン済み
 * -> チャット開始ModalがOpen
 *
 * @visitor チャットが開始されているが、パスコードは未入力
 * -> パスコード入力ModalがOpen
 */
export type ChatStatus =
  "host" |
  "guest" |
  "first-not-login" |
  "first-is-login" |
  "visitor"

// レスポンスです
type Res = {
  chat: Chat
  messages: Message[]
  host: Host
  status: ChatStatus
}

/**
 * チャットを取得します
 *
 * host/guestともにこの関数を使用します。
 */
export const GetChat = async (
  chatId: string,
  token?: string,
): Promise<Res> => {
  const { data } = await axios.get(
    Endpoint(`/api/chat/${chatId}`), {
      headers: createHeader({ token: token }),
      withCredentials: true,
    }
  );

  const chatRes: Chat = castToChatRes(data.chat)
  const messageRes: Message[] = castToMessagesRes(data.messages)
  const hostRes: Host = castToHost(data.host)

  return {
    chat: chatRes,
    messages: messageRes,
    host: hostRes,
    status: data.status,
  }
}