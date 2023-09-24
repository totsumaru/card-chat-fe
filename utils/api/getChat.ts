import { Chat, chatsDB } from "@/utils/sample/Chat";
import { passcodeFromCookie, TestSession } from "@/utils/sample/Sample";
import { User, usersDB } from "@/utils/sample/User";

/**
 * チャットを取得した時のステータスです
 * バックエンドから送信されます。
 *
 * @success チャットが開始されていて、自分がホスト/ゲストで参加済みの状態である
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
  "success" |
  "first-not-login" |
  "first-is-login" |
  "visitor"

// レスポンスです
type Res = {
  chat: Chat | undefined
  host: User | undefined
  status: ChatStatus
}

/**
 * チャットを取得します
 */
export const GetChat = async (
  chatId: string,
  session?: TestSession
): Promise<Res> => {
  return await backend(chatId, session)
}

// バックエンドの処理です
const backend = async (
  chatId: string,
  session?: TestSession,
): Promise<Res> => {
  const isLogin: boolean = !!session?.id

  const chat = chatsDB.find(chat => chat.id === chatId)
  const host = usersDB.find(user => user.id === chat?.hostId)

  let status: ChatStatus

  const isHost = chat?.hostId === session?.id
  const isGuest = chat?.passcode === passcodeFromCookie // cookieのパスコードで認証済み

  if (!chat?.hostId) {
    // hostIDが存在しない = first
    isLogin
      ? status = "first-is-login"
      : status = "first-not-login"
  } else {
    // 自分がホスト/ゲストの場合 = success
    if (isHost || isGuest) {
      return {
        chat: chat,
        host: host,
        status: "success",
      }
    }
    status = "visitor"
  }

  return {
    chat: undefined,
    host: undefined,
    status: status,
  }
}