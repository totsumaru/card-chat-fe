import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Container from "@/components/container/Container";
import ChatMetadataForms from "@/app/chat/[chatId]/edit/ChatMetadataForms";
import Header from "@/components/header/Header";
import { currentUserId, currentUserSession } from "@/utils/sample/Sample";
import ReturnToChatLink from "@/components/link/ReturnToChatLink";
import { GetChat } from "@/utils/api/getChat";

export const dynamic = 'force-dynamic'

/**
 * チャットの登録情報を表示/編集する画面です
 */
export default async function Index({
  params: { chatId }
}: {
  params: { chatId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  const res = await GetChat(chatId, currentUserSession)

  return (
    <>
      {/* ヘッダー */}
      <Header left={""} right={""} isHost={res?.host?.id === currentUserId}/>

      <Container>
        {/* 戻るボタン */}
        <ReturnToChatLink textWhite={false}/>

        <h1 className="text-lg font-bold mt-3">チャット情報の編集</h1>
        <p className="text-gray-600 text-sm mt-2 ml-0.5">
          ※この内容は、相手に表示されません。
        </p>

        {/* フォーム */}
        <ChatMetadataForms
          chatId={res?.chat?.id || ""}
          session={session}
          displayName={res?.chat?.guest.displayName || ""}
          memo={res?.chat?.guest.memo || ""}
        />
      </Container>
    </>
  )
}
