import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Container from "@/components/container/Container";
import Avatar from "@/components/avatar/Avatar";
import { pathChat, pathDisplayNameEdit, pathProfile, pathProfileEdit } from "@/utils/path";
import Header from "@/components/header/Header";
import { GetChats, GetLoginWriter } from "@/utils/sample/API";
import { Chat, Message } from "@/utils/sample/Chat";
import { Writer } from "@/utils/sample/Writer";
import { currentWriterId } from "@/utils/sample/Sample";

/**
 * `/writer/dashboard/[writer-id]`
 *
 * ダッシュボードページです。
 */
export default async function Index() {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  // 自分が管理する全てのチャットを取得します
  const chats = GetChats()
  const writer = GetLoginWriter()

  return (
    <div>
      {/* ヘッダー */}
      <Header left={""} right={""}/>

      <Container>
        {/* プロフィール */}
        <Profile writer={writer}/>

        <div className="mt-5">
          <Title text={"チャット一覧"}/>
        </div>

        {/* チャット一覧 */}
        <ul role="list" className="mt-5">
          {chats && chats.map((chat) => {
            const latestMessage = chat.messages[chat.messages.length - 1]

            return (
              <div className="flex hover:bg-gray-100 border-b border-b-gray-200">
                <Link href={pathChat(chat.id)} className="flex-1">
                  <li key={chat.id} className="flex gap-x-4 p-5 w-full">
                    {/* アバター */}
                    <Avatar unreadFlg={!latestMessage.isRead}/>
                    {/* 名前,コンテンツ */}
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
const Profile = ({ writer }: { writer: Writer | undefined }) => {
  return (
    <div className="px-5 border my-3 rounded-md">
      <li key={1} className="flex items-center justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          <img className="h-12 w-12 flex-none rounded-full bg-gray-50"
               src={writer?.avatarUrl} alt=""
          />
          <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {writer?.name}
            </p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
              {writer?.company.name}
            </p>
          </div>
        </div>
        <div>
          <ProfileLink text={"プロフィール"} href={pathProfile(currentWriterId)}/>
          <ProfileLink text={"編集"} href={pathProfileEdit(currentWriterId)}/>
        </div>
      </li>
    </div>
  )
}

// リンクです
const ProfileLink = ({ text, href }: { text: string, href: string }) => {
  return (
    <Link
      href={href}
      className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold
       text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {text}
    </Link>
  )
}

// チャット一覧の中身です
const ChatListContent = ({
  chat, latestMessage
}: {
  chat: Chat, latestMessage: Message
}) => {
  return (
    <div className="w-full">
      {/* 上側(表示名+時間) */}
      <div className="flex items-baseline justify-between gap-x-4">
        <p className="text-sm font-semibold leading-6 text-gray-900">
          {chat.reader.displayName || chat.id}
        </p>
        <p className="flex-none text-xs text-gray-600">{latestMessage.date}</p>
      </div>
      {/* 下側(コメント) */}
      <p className={`mt-1 line-clamp-1 text-sm leading-6
                       ${latestMessage.isRead ? "text-gray-400" : "text-gray-600 font-bold"}`}
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