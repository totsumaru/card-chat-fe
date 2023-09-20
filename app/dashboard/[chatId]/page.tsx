import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import Container from "@/components/container/Container";
import ReturnLink from "@/components/link/ReturnLink";
import Info from "@/components/alert/Info";
import ChatMetadataForms from "@/app/dashboard/[chatId]/ChatMetadataForms";
import Header from "@/components/header/Header";
import { GetChatMetadata } from "@/utils/sample/API";
import { pathDashboard } from "@/utils/path";

// チャットの登録情報を表示/編集する画面です
export default async function Index({
  params: { chatId }
}: {
  params: { chatId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  const chat = GetChatMetadata(chatId)

  return (
    <>
      {/* ヘッダー */}
      <Header left={""} right={""}/>
      <Container>
        <ReturnLink text={"戻る"} url={pathDashboard()} textWhite={false}/>

        <div className="mt-5">
          <Info text={"この内容は、相手には表示されません。"}/>
        </div>

        <ChatMetadataForms
          displayName={chat?.reader.displayName || ""}
          memo={chat?.reader.memo || ""}
        />

      </Container>
    </>
  )
}
