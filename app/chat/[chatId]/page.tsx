import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { cookies } from "next/headers";
import Client from "@/app/chat/[chatId]/Client";
import { currentUserId } from "@/utils/sample/Sample";

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

  return (
    <Client
      userId={currentUserId}
      session={session}
      chatId={chatId}
    />
  )
}