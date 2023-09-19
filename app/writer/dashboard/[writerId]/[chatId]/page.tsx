import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import React from "react";
import BaseHeader from "@/components/header/BaseHeader";
import Container from "@/components/container/Container";
import ReturnLink from "@/components/link/ReturnLink";
import Info from "@/components/alert/Info";
import Forms from "@/app/writer/dashboard/[writerId]/[chatId]/Forms";

const dashboardLink = "/writer/dashboard/w-123"

// チャットの登録情報を表示/編集する画面です
export default async function Index({
  params: { writerId, chatId }
}: {
  params: { writerId: string, chatId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {/* ヘッダー */}
      <BaseHeader left={""} right={""}/>
      <Container>
        <ReturnLink text={"戻る"} url={dashboardLink} textWhite={false}/>

        <div className="mt-5">
          <Info text={"この内容は、相手には表示されません。"}/>
        </div>

        <Forms/>

      </Container>
    </>
  )
}
