import { TestSession } from "@/utils/sample/Sample";
import { sleep } from "@/utils/sample/sleep";
import { User } from "@/utils/sample/User";

/**
 * プロフィールの情報を変更します
 */
export const PostProfileEdit = async (
  session: TestSession,
  newUser: User
) => {
  await backend(session, newUser)
}

// バックエンドの処理です
const backend = async (
  session: TestSession,
  newUser: User
) => {
  // ログインしているか
  if (!session.id) {
    throw new Error("ログインしていません")
  }

  // テスト用にsleep処理を入れる
  await sleep()
}