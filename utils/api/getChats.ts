import { Chat_x, chatsDB } from "@/utils/sample/Chat_x";
import { TestSession } from "@/utils/sample/Sample";
import { User_x, usersDB } from "@/utils/sample/User_x";

type Res = {
  host: User_x | undefined
  chats: Chat_x[] | undefined
}

/**
 * ログインしているユーザーの全てのチャットを取得します
 *
 * Memo: 現状は全て取得しますが、いずれlimit/offsetで指定できるようにします。
 *
 * TODO: `userId`->`session`に変更
 */
export default async function GetChats(session: TestSession): Promise<Res> {
  const res = await beGetChats(session)

  return res
}

// バックエンドの挙動です
const beGetChats = async (session: TestSession): Promise<Res> => {
  // ログインしていない場合はエラーを返します
  if (!session.id) {
    throw new Error("ログインしていません")
  }

  const chats = chatsDB.filter(chat => chat.hostId === session.id)
  const user = usersDB.find(user => user.id === session.id)

  return {
    chats: chats,
    host: user,
  }
}