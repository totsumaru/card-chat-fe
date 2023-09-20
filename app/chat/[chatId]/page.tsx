import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Chat from "./Chat";
import PasscodeModal from "@/components/modal/PasscodeModal";
import BaseHeader from "@/components/header/BaseHeader";
import Link from "next/link";
import React from "react";
import Avatar from "@/components/avatar/Avatar";
import { SampleAvatarUrl } from "@/utils/sample/Sample";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { cookies } from "next/headers";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import { pathProfile } from "@/utils/path";

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

  const writerId = "w-123"

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <BaseHeader
        left={(
          <Link href={pathProfile(writerId, chatId)}>
            <div className="flex items-center">
              <Avatar imageUrl={avatarUrl}/>
              <p className="ml-2">戸塚翔太</p>
            </div>
          </Link>
        )}
        right={<NoticeModalOpenButton registeredEmail={registeredEmail}/>}
      />

      {/* Modal */}
      <PasscodeModal/>
      <NoticeEmailModal registeredEmail={registeredEmail}/>

      {/* チャット */}
      <Chat
        chatId={chatId}
        isWriter={false}
        writer={{
          id: writerId,
          name: "taro",
          imageUrl: SampleAvatarUrl,
        }}
        reader={{
          displayName: "田中様"
        }}
      />
    </div>
  )
}