import { Chat, chatsDB } from "@/utils/sample/Chat";
import { passcodeFromCookie, TestSession } from "@/utils/sample/Sample";
import { User, usersDB } from "@/utils/sample/User";

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
  chat: Chat | undefined
  host: User | undefined
  status: ChatStatus
}

/**
 * チャットを取得します
 *
 * host/guestともにこの関数を使用します。
 *
 * sessionが空の場合はcookieのパスコードで認証します。
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

  if (!chat) {
    throw new Error("チャットを取得できません")
  }

  let status: ChatStatus

  const isHost = chat.hostId === session?.id
  const isGuest = chat.passcode === passcodeFromCookie // cookieのパスコードで認証済み

  if (!chat.hostId) {
    // hostIDが存在しない = first
    isLogin
      ? status = "first-is-login"
      : status = "first-not-login"
  } else {
    const host = usersDB.find(user => user.id === chat?.hostId)
    if (!host) {
      throw new Error("ホストを取得できません")
    }

    // 自分がホストorゲストの場合 = success
    if (isHost) {
      return {
        chat: chat,
        host: host,
        status: "host",
      }
    } else if (isGuest) {
      return {
        chat: chat,
        host: host,
        status: "guest",
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