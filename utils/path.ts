// クエリパラメータ
export const paramChatId = "chat-id"

// パスを作成します

/**
 * SignUp時のEmailに記載するURLです
 */
export function signUpEmailRedirectTo(name: string): string {
  return `${process.env.NEXT_PUBLIC_FE_URL}/auth/callback?name=${name}`
}

/**
 * エラーページのURLです
 */
export function pathError(errorMessage: string): string {
  return `/error?message=${errorMessage}`
}

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
export function pathProfile(hostId: string, chatId?: string): string {
  let path = `/profile/${hostId}`
  if (chatId) {
    return path + `?${paramChatId}=${chatId}`
  }

  return path
}

// ----- ここからログイン必須 -----

/**
 * プロフィールの編集
 */
export function pathProfileEdit(hostId: string): string {
  return `/profile/${hostId}/edit`
}

/**
 * ダッシュボード
 */
export function pathDashboard(): string {
  return `/dashboard`
}

/**
 * 表示名の編集
 *
 * チャットに戻るためのクエリパラメータが必要な場合は、
 * `returnToChat`を`true`にしてください。
 */
export function pathDisplayNameEdit(
  chatId: string,
  returnToChat?: boolean
): string {
  let path = `/chat/${chatId}/edit`
  if (returnToChat) {
    return path + `?${paramChatId}=${chatId}`
  }

  return path
}
