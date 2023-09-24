// host
export const userId1 = "8673bf66-ad61-445a-bf97-5b13142ecbbf"
export const userId2 = "e90b644e-0caf-4c3a-9a25-64e122f8a57b"
export const userId3 = "adeb644e-0caf-4c3a-9a25-64e122f8a57b"
// chat
export const chatId1 = "cd746a35-1360-403a-a747-98e5f1a9fa2f"
export const chatId2 = "fd587bc8-a7f2-4d60-91fb-b81e2daea7a0"
export const chatId3 = "1cd34cbb-735e-49aa-ad99-e8868e5751a0"
// email
export const email1 = "techstart35@gmail.com"
export const email2 = "argate.inc@gmail.com"
// url
export const avatarUrl1 = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
export const avatarUrl2 = "https://pbs.twimg.com/media/EDsOvIRU8AA7pnv?format=jpg&name=large"

/**
 * 現在ログインしているユーザーIDです
 *
 * ここを変更すると、ログインしているユーザーが変わります。
 * 空の値("")とすると、ログインしていない状態となります。
 */
export const currentUserId = userId1

/**
 * 現在ログインしているユーザーのセッションです
 */
export type TestSession = {
  id: string
}
export const currentUserSession: TestSession = {
  id: currentUserId
}

/**
 * cookieから取得したパスコードです
 */
export const passcodeFromCookie = "12345"