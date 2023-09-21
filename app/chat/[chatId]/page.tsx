import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ChatArea from "./ChatArea";
import Link from "next/link";
import React from "react";
import Avatar from "@/components/avatar/Avatar";
import { currentUserId } from "@/utils/sample/Sample";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { cookies } from "next/headers";
import NoticeEmailModal from "@/components/modal/NoticeEmailModal";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import Header from "@/components/header/Header";
import { Chat } from "@/utils/sample/Chat";
import GetUserByID from "@/utils/api/getUserByID";

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
  const { data: { session } } = await supabase.auth.getSession()
  console.log("hello")
  console.log(session)

  const isHost = chatId === currentUserId

  let chat: Chat | undefined

  const host = await GetUserByID(chat?.hostId || "")

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
        isHost={currentUserId === chat?.hostId}
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