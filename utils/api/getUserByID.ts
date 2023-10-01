import { User_x, usersDB } from "@/utils/sample/User_x";

/**
 * IDでユーザーを取得します
 */
export default async function GetUserByID(userId: string): Promise<User_x | undefined> {
  const res = await backend(userId)
  return res
}

// バックエンドの処理です
const backend = async (userId: string): Promise<User_x | undefined> => {
  return usersDB.find(user => user.id === userId)
}