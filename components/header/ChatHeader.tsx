import Avatar from "@/components/avatar/Avatar";
import React from "react";
import { pathDisplayNameEdit, pathProfile } from "@/utils/path";
import Header from "@/components/header/Header";
import NoticeModalOpenButton from "@/components/button/NoticeModalOpenButton";
import { Chat, Host } from "@/utils/api/res";

type Props = {
  isHost: boolean
  chat: Chat
  host: Host
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
    <a href={headerLink}>
      <div className="flex items-center flex-grow">
        <Avatar imageUrl={headerAvatarUrl}/>
        <p className="ml-2 line-clamp-1">{headerDisplayName}</p>
      </div>
    </a>
  )

  const right = (
    <NoticeModalOpenButton
      setModalOpen={setModalOpen}
      registeredEmail={chat?.guest.email}
    />
  )

  return (
    <Header left={left} right={right} isHost={isHost}/>
  )
}