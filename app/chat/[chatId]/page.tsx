import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Client from "@/app/chat/[chatId]/Client";
import { currentUserId, currentUserSession } from "@/utils/sample/Sample";
import { GetChat } from "@/utils/api/getChat";

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
    res = await GetChat(chatId, currentUserSession)
  } catch (e) {
    // setPasscodeModalOpen(true)
  }

  return (
    <Client
      userId={currentUserId}
      chatId={chatId}
      chat={res?.chat}
      host={res?.host}
    />
  )
}