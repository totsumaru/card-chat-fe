import { User, usersDB } from "@/utils/sample/User";

/**
 * IDでユーザーを取得します
 */
export default async function GetUserByID(userId: string): Promise<User | undefined> {
  const res = await backend(userId)
  return res
}

// バックエンドの処理です
const backend = async (userId: string): Promise<User | undefined> => {
  return usersDB.find(user => user.id === userId)
}