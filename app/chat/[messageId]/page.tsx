import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Chat from "@/components/chat/Chat";
import PasscodeModal from "@/components/modal/PasscodeModal";
import HeaderBase from "@/components/header/HeaderBase";
import Link from "next/link";
import React from "react";
import Avatar from "@/components/avatar/Avatar";
import { SampleAvatarUrl } from "@/utils/sample/Sample";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { cookies } from "next/headers";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";

const avatarUrl = SampleAvatarUrl
const registeredEmail = "techstart35@gmail.com"

// チャット画面です
export default async function Index({
  params: { messageId }
}: {
  params: { messageId: string }
}) {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <HeaderBase
        left={(
          <Link href={`/writer/profile/w-123?message-id=${messageId}`}>
            <div className="flex items-center">
              <Avatar imageUrl={avatarUrl}/>
              <p className="">戸塚翔太</p>
            </div>
          </Link>
        )}
        right={<NoticeModalOpenButton registeredEmail={registeredEmail}/>}
      />

      <PasscodeModal/>
      <NoticeEmailModal registeredEmail={registeredEmail}/>
      <Chat messageId={messageId}/>
    </div>
  )
}