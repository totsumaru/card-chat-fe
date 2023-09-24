import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Client from "@/app/chat/[chatId]/Client";
import { currentUserId, currentUserSession } from "@/utils/sample/Sample";
import { GetChat } from "@/utils/api/getChat";
import { PostChangeToRead } from "@/utils/api/postChangeToRead";
import NotFound from "@/components/error/404";

export const dynamic = 'force-dynamic'

/**
 * チャット画面のページです
 *
 * 最初に開いた時のみ、パスコードの入力が必要です。(cookieに保存)
 */
export default async function Index({
  params: { chatId }
}: {
  params: { chatId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  const userId = currentUserId

  let res
  try {
    res = await GetChat(chatId, currentUserSession)
    // 自分がhostの場合、既読処理を行います
    const isHost = res.host?.id && userId === res.host?.id
    if (isHost) {
      PostChangeToRead(currentUserSession, chatId)
    }
  } catch (e) {
    console.error(e)
    return <NotFound/>
  }

  return (
    <Client
      userId={userId}
      chatId={chatId}
      session={session}
      chat={res?.chat}
      host={res?.host}
      status={res?.status}
    />
  )
}