import Link from "next/link";
import Avatar from "@/components/avatar/Avatar";
import React from "react";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import { Chat_x } from "@/utils/sample/Chat_x";
import { User_x } from "@/utils/sample/User_x";
import Header from "@/components/header/Header";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";

type Props = {
  isHost: boolean
  chat: Chat_x | undefined
  host: User_x | undefined
  setModalOpen: (open: boolean) => void
}

/**
 * チャットのヘッダーです
 *
 * 自分がHostの場合、相手(Guest)の情報を表示、
 * 自分がGuestの場合、相手(Host)の情報を表示します。
 */
export default function ChatHeader({ isHost, chat, host, setModalOpen }: Props) {
  const chatId = chat?.id || ""
  const hostId = host?.id || ""

  // 左側のリンクです
  const headerLink = isHost
    ? pathDisplayNameEdit(chatId, true)
    : pathProfile(hostId, chatId)

  // アバターのURLです
  const headerAvatarUrl = isHost
    ? ""
    : host?.avatarUrl

  const headerDisplayName = isHost
    ? chat?.guest.displayName || chatId
    : host?.name

  const left = (
    <Link href={headerLink}>
      <div className="flex items-center flex-grow">
        <Avatar imageUrl={headerAvatarUrl}/>
        <p className="ml-2 line-clamp-1">{headerDisplayName}</p>
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