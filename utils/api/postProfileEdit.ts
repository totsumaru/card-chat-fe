import { TestSession } from "@/utils/sample/Sample";
import { sleep } from "@/utils/sample/sleep";
import { User_x } from "@/utils/sample/User_x";

/**
 * プロフィールの情報を変更します
 */
export const PostProfileEdit = async (
  session: TestSession,
  newUser: User_x
) => {
  await backend(session, newUser)
}

// バックエンドの処理です
const backend = async (
  session: TestSession,
  newUser: User_x
) => {
  // ログインしているか
  if (!session.id) {
    throw new Error("ログインしていません")
  }

  // テスト用にsleep処理を入れる
  await sleep()
}