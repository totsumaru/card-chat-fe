import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Chat from "@/components/chat/Chat";
import PasscodeModal from "@/components/modal/PasscodeModal";
import BaseHeader from "@/components/header/BaseHeader";
import Link from "next/link";
import React from "react";
import Avatar from "@/components/avatar/Avatar";
import { SampleAvatarUrl } from "@/utils/sample/Sample";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { cookies } from "next/headers";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";

const avatarUrl = SampleAvatarUrl
const registeredEmail = "techstart35@gmail.com"

/**
 * `/chat/[chatId]`
 *
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

  return (
    <div className="flex flex-col h-screen">
      {/* ヘッダー */}
      <BaseHeader
        left={(
          <Link href={`/writer/profile/w-123?message-id=${chatId}`}>
            <div className="flex items-center">
              <Avatar imageUrl={avatarUrl}/>
              <p className="ml-2">戸塚翔太</p>
            </div>
          </Link>
        )}
        right={<NoticeModalOpenButton registeredEmail={registeredEmail}/>}
      />

      <PasscodeModal/>
      <NoticeEmailModal registeredEmail={registeredEmail}/>
      <Chat chatId={chatId}/>
    </div>
  )
}