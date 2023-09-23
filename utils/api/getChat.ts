import { Chat, chatsDB } from "@/utils/sample/Chat";
import { passcodeFromCookie, TestSession } from "@/utils/sample/Sample";
import { User, usersDB } from "@/utils/sample/User";

/**
 * チャットを取得した時のステータスです
 * バックエンドから送信されます。
 *
 * @success チャットが開始されていて、自分がホスト/ゲストで参加済みの状態である
 * -> Modalを開かずチャット可能
 * @first-not-login チャットが開始されておらず、自分もログインしていない
 * -> ログインを促すModalがOpen
 * @first-is-login チャットが開始されていないが、ログイン済み
 * -> チャット開始ModalがOpen
 * @visitor チャットが開始されているが、パスコードは未入力
 * -> パスコード入力ModalがOpen
 */
export type ChatStatus =
  "success" | "first-not-login" | "first-is-login" | "visitor"

// レスポンスです
type Res = {
  chat: Chat | undefined
  host: User | undefined
  status: ChatStatus
}

/**
 * チャットを取得します
 *
 * 自分がホストとなっていない場合はエラーを返します。
 */
export const GetChat = async (
  chatId: string,
  session?: TestSession
): Promise<Res> => {
  const res = await backend(chatId, session)

  return res
}

// バックエンドの処理です
const backend = async (
  chatId: string,
  session?: TestSession,
): Promise<Res> => {
  const isLogin: boolean = !!session

  const chat = chatsDB.find(chat => chat.id === chatId)
  const host = usersDB.find(user => user.id === chat?.hostId)

  // 自分がホスト/ゲスト(パスコードログイン済み)の場合 = success
  if (chat?.hostId === session?.id || chat?.passcode === passcodeFromCookie) {
    return {
      chat: chat,
      host: host,
      status: "success",
    }
  }

  let status: ChatStatus

  // hostが存在しない = first
  if (!host) {
    if (isLogin) {
      status = "first-is-login"
    } else {
      status = "first-not-login"
    }
  } else {
    status = "visitor"
  }

  return {
    chat: undefined,
    host: undefined,
    status: status,
  }
}