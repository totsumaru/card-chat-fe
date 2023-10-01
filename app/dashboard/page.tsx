import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React, { ReactNode } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Container from "@/components/container/Container";
import Avatar from "@/components/avatar/Avatar";
import { pathChat, pathDisplayNameEdit, pathProfile, pathProfileEdit } from "@/utils/path";
import Header from "@/components/header/Header";
import { Chat_x, Message_x } from "@/utils/sample/Chat_x";
import { User_x } from "@/utils/sample/User_x";
import { currentUserId, currentUserSession } from "@/utils/sample/Sample";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import GetChats from "@/utils/api/getChats";

export const dynamic = 'force-dynamic'

/**
 * ダッシュボードページです。
 */
export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  // 自分が管理する全てのチャットを取得します
  const chatsRes = await GetChats(currentUserSession)

  return (
    <div className="bg-gray-50 h-screen">
      {/* ヘッダー */}
      <Header left={""} right={""}/>

      <Container>
        <Profile host={chatsRes.host}/>
        <div className="mt-7">
          <Title text={"チャット一覧"}/>
        </div>
        <ul role="list"
            className="mt-3 divide-y divide-gray-100 overflow-hidden
             bg-white shadow ring-1 ring-gray-900/5 rounded sm:rounded-xl"
        >
          {chatsRes.chats && chatsRes.chats.map((chat) => {
            const latestMessage = chat.messages[chat.messages.length - 1]

            return (
              <div className="flex hover:bg-gray-100" key={chat.id}>
                <Link href={pathChat(chat.id)} className="flex-1">
                  <li key={chat.id} className="flex gap-x-4 p-5 w-full">
                    <Avatar unreadFlg={!chat.isRead}/>
                    <ChatListContent chat={chat} latestMessage={latestMessage}/>
                  </li>
                </Link>
                {/* 設定アイコン */}
                <ConfigIcon chatId={chat.id}/>
              </div>
            )
          })}
        </ul>
      </Container>
    </div>
  )
}

// 見出し
const Title = ({ text }: { text: string }) => {
  return (
    <h1 className="text-gray-900 font-bold text-lg">
      {text}
    </h1>
  )
}

// プロフィール
const Profile = ({ host }: { host: User_x | undefined }) => {
  return (
    <div className="px-5 border border-indigo-300 my-3 rounded sm:rounded-xl bg-indigo-50">
      <div key={1} className="flex items-center justify-between gap-x-6 py-3">
        {/* 左側 */}
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
               src={host?.avatarUrl} alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm line-clamp-1 font-semibold leading-6 text-gray-900">
              {host?.name}
            </p>
            <p className="mt-1 line-clamp-1 truncate text-xs leading-5 text-gray-500">
              {host?.company.name}
            </p>
          </div>
        </div>
        {/* 右側 */}
        <div className="flex flex-col gap-1.5 items-end flex-shrink-0">
          <ProfileLink
            text={"プロフィール"}
            href={pathProfile(currentUserId)}
          />
          <ProfileLink
            text={"編集"}
            href={pathProfileEdit(currentUserId)}
            icon={<PencilSquareIcon className="w-4 h-4 inline mr-1"/>}
          />
        </div>
      </div>
    </div>
  )
}

// リンクです
const ProfileLink = ({
  text, href, icon
}: {
  text: string, href: string, icon?: ReactNode
}) => {
  return (
    <div>
      <Link
        href={href}
        className="flex items-center rounded-full bg-white px-2.5 py-1.5
         text-xs text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300
         hover:bg-gray-50"
      >
        {icon}{text}
      </Link>
    </div>
  )
}

// チャット一覧の中身です
const ChatListContent = ({
  chat, latestMessage
}: {
  chat: Chat_x, latestMessage: Message_x
}) => {
  return (
    <div className="w-full">
      {/* 上側(表示名+時間) */}
      <div className="flex items-baseline justify-between gap-x-4">
        <p className="text-sm font-semibold leading-6 text-gray-900 line-clamp-1">
          {chat.guest.displayName || chat.id}
        </p>
        <p className="flex-none text-xs text-gray-600">{latestMessage.date}</p>
      </div>
      {/* 下側(コメント) */}
      <p className={`mt-1 line-clamp-1 text-sm leading-6
                       ${chat.isRead ? "text-gray-400" : "text-gray-600 font-bold"}`}
      >
        {latestMessage.content}
      </p>
    </div>
  )
}

// 歯車アイコンです
const ConfigIcon = ({ chatId }: { chatId: string }) => {
  return (
    <div className="flex items-center">
      <Link
        href={pathDisplayNameEdit(chatId)}
        type="button"
        className="p-2 text-gray-900 hover:text-blue-600"
      >
        <Cog6ToothIcon className="w-5 h-5"/>
      </Link>
    </div>
  )
}