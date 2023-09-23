import Link from "next/link";
import Avatar from "@/components/avatar/Avatar";
import React from "react";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { Chat } from "@/utils/sample/Chat";
import { User } from "@/utils/sample/User";
import Header from "@/components/header/Header";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";

type Props = {
  isHost: boolean
  chat: Chat | undefined
  host: User | undefined
  setModalOpen: (open: boolean) => void
}

/**
 * チャットのヘッダーです
 */
export default function ChatHeader({ isHost, chat, host, setModalOpen }: Props) {
  const headerLink = isHost
    ? pathDisplayNameEdit(chat?.id || "", true)
    : pathProfile(host?.id || "", chat?.id || "")

  const headerAvatarUrl = isHost
    ? ""
    : host?.avatarUrl

  const headerDisplayName = isHost
    ? chat?.guest.displayName || chat?.id
    : host?.name

  const left = (
    <Link href={headerLink}>
      <div className="flex items-center">
        <Avatar imageUrl={headerAvatarUrl}/>
        <p className="ml-2">{headerDisplayName}</p>
      </div>
    </Link>
  )

  const right = (
    <NoticeModalOpenButton
      setModalOpen={setModalOpen}
      registeredEmail={chat?.guest.noticeEmail}
    />
  )

  return (
    <Header left={left} right={right} isHost={isHost}/>
  )
}