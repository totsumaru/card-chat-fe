import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Client from "@/app/chat/[chatId]/Client";
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

  let res
  try {
    res = await GetChat(chatId, session?.access_token)
    // 自分がhostの場合、既読処理を行います
    const isHost = res.host.id === user?.id
    if (isHost && session?.access_token) {
      PostChangeToRead(session.access_token, chatId)
    }
  } catch (e) {
    console.error(e)
    return <NotFound/>
  }

  return (
    <Client
      userId={user?.id || ""}
      chatId={chatId}
      token={session?.access_token || ""}
      chat={res.chat}
      messages={res.messages}
      host={res.host}
      status={res.status}
    />
  )
}