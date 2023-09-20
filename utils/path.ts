// クエリパラメータ
export const paramChatId = "chat-id"

// パスを作成します

/**
 * ログイン
 */
export function pathLogin(): string {
  return `/login`
}

/**
 * チャット
 */
export function pathChat(chatId: string): string {
  return `/chat/${chatId}`
}

/**
 * プロフィール
 */
export function pathProfile(writerId: string, chatId?: string): string {
  let path = `/writer/profile/${writerId}`
  if (chatId) {
    return path + `?${paramChatId}=${chatId}`
  }

  return path
}

// ----- ここからログイン必須 -----

/**
 * プロフィールの編集
 */
export function pathProfileEdit(writerId: string): string {
  return `/writer/profile/${writerId}/edit`
}

/**
 * ダッシュボード
 */
export function pathDashboard(writerId: string): string {
  return `/writer/dashboard/${writerId}`
}

/**
 * 表示名の編集
 */
export function pathDisplayNameEdit(
  writerId: string,
  chatId: string,
): string {
  return `/writer/dashboard/${writerId}/${chatId}`
}
