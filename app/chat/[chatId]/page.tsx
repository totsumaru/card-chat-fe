import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatArea from "./ChatArea";
import PasscodeModal from "@/components/modal/PasscodeModal";
import Link from "next/link";
import React from "react";
import Avatar from "@/components/avatar/Avatar";
import { currentHostId, passcode } from "@/utils/sample/Sample";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { cookies } from "next/headers";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import Header from "@/components/header/Header";
import { GetChatByPasscode, GetChatByHost, GetHost } from "@/utils/sample/API";
import { Chat } from "@/utils/sample/Chat";

const registeredEmail = "techstart35@gmail.com"

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

  let chat: Chat | undefined
  try {
    chat = GetChatByHost(chatId)
  } catch (e) {
    chat = GetChatByPasscode(chatId, passcode)
  }

  const host = GetHost(chat?.hostId || "")
  const isHost = chat?.hostId === currentHostId

  const headerLink = isHost
    ? pathDisplayNameEdit(chatId, true)
    : pathProfile(chat?.hostId || "", chatId)

  const headerAvatarUrl = isHost ? "" : host?.avatarUrl

  const headerDisplayName = isHost
    ? chat?.guest.displayName || chat?.id
    : host?.name

  const headerLeft = (
    <Link href={headerLink}>
      <div className="flex items-center">
        <Avatar imageUrl={headerAvatarUrl}/>
        <p className="ml-2">{headerDisplayName}</p>
      </div>
    </Link>
  )

  return (
    <div className="relative h-screen overflow-hidden">
      {/* ヘッダー */}
      <Header
        left={headerLeft}
        right={<NoticeModalOpenButton registeredEmail={registeredEmail}/>}
        isHost={isHost}
      />

      {/* Modal */}
      <NoticeEmailModal registeredEmail={registeredEmail}/>

      {/* チャット */}
      <ChatArea
        chatId={chatId}
        isHost={currentHostId === chat?.hostId}
        host={{
          id: chat?.hostId || "",
          imageUrl: host?.avatarUrl || "",
        }}
        guest={{
          displayName: chat?.guest.displayName || "",
        }}
      />
    </div>
  )
}