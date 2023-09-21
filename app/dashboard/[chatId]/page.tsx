import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Container from "@/components/container/Container";
import Info from "@/components/alert/Info";
import ChatMetadataForms from "@/app/dashboard/[chatId]/ChatMetadataForms";
import Header from "@/components/header/Header";
import { currentUserId, currentUserSession } from "@/utils/sample/Sample";
import ReturnToChatLink from "@/components/link/ReturnToChatLink";
import { GetChatInfo } from "@/utils/api/getChatInfo";

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

  const chat = await GetChatInfo(chatId, currentUserSession)

  return (
    <>
      {/* ヘッダー */}
      <Header left={""} right={""} isHost={chat?.hostId === currentUserId}/>

      <Container>
        <ReturnToChatLink textWhite={false}/>

        <div className="bg-white p-3 sm:p-7 mt-5 shadow-md rounded-md w-full">
          {/* ここを中央に */}
          <div className="mx-auto">
            <div className="mt-2">
              <Info text={"この内容は、相手には表示されません。"}/>
            </div>

            <ChatMetadataForms
              id={chat?.id || ""}
              displayName={chat?.guest.displayName || ""}
              memo={chat?.guest.memo || ""}
            />
          </div>
        </div>

      </Container>
    </>
  )
}
